var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};

    //ADDED for shaders. get system date to serve as seed for the vertex scaling and coloring
	var startDate = new Date();
	this.sceneStartingTime = startDate.getTime() / 1000;

	this.selectableNodes = "None";

    var date = new Date();
    this.sceneInitTime = date.getTime();
    this.currTime = 0;
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    //ADDED for shaders
    this.game = new GoRoGo(this);
    this.perspectiveIndex = 0;
    this.perspectives = [];
    this.shader = new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag");
    this.shader.setUniformsValues({red: 0.0, green: 1.0, blue: 0.0}); //sends rgb values to the shader, for it to calculate the object color (changes with time)

    this.initCameras();

    this.enableTextures(true);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    this.axis = new CGFaxis(this);

    this.setUpdatePeriod(16);
    this.lastUpdateTime = 0;

    this.setPickEnabled(true);

    this.gameAnimations = [];
}

XMLscene.prototype.updateTimeFactor = function(date){
	this.shader.setUniformsValues({timeFactor: date});
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.
    
    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];
            
            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);
            
            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
            this.lights[i].update();
            
            i++;
        }
    }
    
}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {

    //starting camera

    //this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(11.1825, 3.547, 4.94),vec3.fromValues(2.712, 2.694, 5.041));
    this.startCamera = new CGFcamera(0.4,0.1,500,vec3.fromValues(11.1825, 3.547, 4.94),vec3.fromValues(2.712, 2.694, 5.041));
    this.perspectives.push(this.startCamera);

    //camera for top view
    this.topCamera = new CGFcamera(0.4,0.1,500,vec3.fromValues(2.522, 6, 4.99),vec3.fromValues(2.707, 2.741, 4.99));
    this.perspectives.push(this.topCamera);

    //camera for player 1
    this.player1Camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(2.738, 3.316, 8.112),vec3.fromValues(2.715, 2.794, 6.33));
    this.perspectives.push(this.player1Camera);

    //camera for player 2
    this.player2Camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(2.74, 3.74, 2.25),vec3.fromValues(2.72, 1.417, 5.96));
    this.perspectives.push(this.player2Camera);

    //camera for scenery aesthetic contemplation
    this.sceneryCamera = new CGFcamera(0.4,0.1,500,vec3.fromValues(26.1825, 16.547, 4.94),vec3.fromValues(2.712, 2.694, 5.041));
    this.perspectives.push(this.sceneryCamera);

    this.camera = this.perspectives[this.perspectiveIndex];
}

/* Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() 
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);
    
    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1], 
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);
    
    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    
    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);

    this.interface.addSelectableNodes(this.graph.selectableNodes);

    this.game.addGameGUI();
}

/**
 * picking
 */
XMLscene.prototype.logPicking = function ()
{
    if(!this.game.started || this.game.paused) return;

    if (this.pickMode == false) {
        if (this.pickResults != null && this.pickResults.length > 0) {
            for (var i=0; i< this.pickResults.length; i++) {
                var obj = this.pickResults[i][0]; // o objeto seleccionado
                if (obj)
                {
                    var customId = this.pickResults[i][1]; // o ID do objeto seleccionado
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    this.game.pickTile(customId);
                }
            }
            this.pickResults.splice(0,this.pickResults.length);
        }
    }
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {

    if(this.game.started || !this.game.paused){
    this.logPicking();
    this.clearPickRegistration();
    }
    // ---- BEGIN Background, camera and axis setup
    
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();
    
    if (this.graph.loadedOk) 
    {        
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

//-------------------- Interface Time Counter --------
       if(!this.game.paused){

        if(this.currTime == 0){
            var newDate = new Date();
            this.currTime = newDate.getTime();
        }

        if(this.initialSceneTime == null){
            this.initialSceneTime = this.currTime;
        }

        if(this.game.started){
            var newDateElapsedTime = new Date();
            currTimeElapsed = newDateElapsedTime.getTime();

            if(this.sceneInitTimeElapsed == null){
                this.sceneInitTimeElapsed = currTimeElapsed;
            }
            time = (currTimeElapsed - this.sceneInitTimeElapsed)/1000;
            this.game.timeElapsed = Math.floor(time);
        }

        dT = (this.currTime - this.sceneInitTime)/1000;
        this.updateTimeFactor(dT);

        }
//-------------------- End of Interface Time Counter --------


        //ADDED for shaders
		var currDate = new Date();
		var currDateTime = currDate.getTime() / 1000;
		if(this.sceneStartingTime == null){
			this.sceneStartingTime = currDateTime;
		}
		var deltaTime = currDateTime - this.sceneStartingTime;
		this.updateTimeFactor(deltaTime);

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}
    
    this.popMatrix();

    //console.log(this.camera);
    
    // ---- END Background, camera and axis setup
}

XMLscene.prototype.update = function(currTime){
	var deltaTime = (currTime - this.lastUpdateTime) / 1000;
	this.lastUpdateTime = currTime;
	for(var node in this.graph.nodes){
		this.graph.nodes[node].updateAnimation(deltaTime);
	}


    //console.log(this.gameAnimations);


    for(var i = 0; i < this.gameAnimations.length; i++){
        this.gameAnimations[i].apply();
        if(this.gameAnimations[i].isComplete()){
            this.gameAnimations.splice(i, 1);
        }
    }

    this.perspectiveIndex = this.game.currCamera;
    this.camera = this.perspectives[this.perspectiveIndex];
    console.log("Perspective Index: " + this.perspectiveIndex);
    //this.game.updateScores();
    //this.camera.position = [this.camera.position[0]-0.01, this.camera.position[1], this.camera.position[2], 0];
}

XMLscene.prototype.changeGraph = function(filename){

    if(filename == "Traditional") filename = "game.xml"; 
    else if(filename == "Detroit")  filename = "game2.xml";
    else{
        filename = "game.xml";
        alert("Error loading scene");
    }

    this.graph = new MySceneGraph(filename, this);
}
