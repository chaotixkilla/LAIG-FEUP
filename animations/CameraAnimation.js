class CameraAnimation{
	constructor(scene, startingCamera, finishingCamera){
		this.scene = scene;
		this.startingCamera = startingCamera;
		this.finishingCamera = finishingCamera;

		this.animationTime = 4;
		this.iteration = 0.02;
		this.currentTime = 0;
		this.finished = false;

		this.startingCameraPosition = this.startingCamera.position;
		this.startingCameraTarget = this.startingCamera.target;

		this.deltaX = this.finishingCamera.position[0] - this.startingCameraPosition[0];
		this.deltaY = this.finishingCamera.position[1] - this.startingCameraPosition[1];
		this.deltaZ = this.finishingCamera.position[2] - this.startingCameraPosition[2];

		this.targetDeltaX = this.finishingCamera.target[0] - this.startingCameraTarget[0];
		this.targetDeltaY = this.finishingCamera.target[1] - this.startingCameraTarget[1];
		this.targetDeltaZ = this.finishingCamera.target[2] - this.startingCameraTarget[2];
	}

	apply(){
		console.log(this.finished);
		this.currentTime += this.iteration;

		var ratio = this.currentTime / this.animationTime;
		if(ratio >= 1){
			this.finished = true;
			return;
		}

		console.log(this.deltaX);
		console.log(this.deltaX * this.iteration);

		/*var deltaX = this.finishingCamera.position[0] - this.startingCameraPosition[0];
		var deltaY = this.finishingCamera.position[1] - this.startingCameraPosition[1];
		var deltaZ = this.finishingCamera.position[2] - this.startingCameraPosition[2];

		var targetDeltaX = this.finishingCamera.target[0] - this.startingCameraTarget[0];
		var targetDeltaY = this.finishingCamera.target[1] - this.startingCameraTarget[1];
		var targetDeltaZ = this.finishingCamera.target[2] - this.startingCameraTarget[2];*/

		this.startingCamera.position[0] += this.deltaX * this.iteration;
		this.startingCamera.position[1] += this.deltaY * this.iteration;
		this.startingCamera.position[2] += this.deltaZ * this.iteration;

		this.startingCamera.target[0] += this.targetDeltaX * this.iteration;
		this.startingCamera.target[1] += this.targetDeltaY * this.iteration;
		this.startingCamera.target[2] += this.targetDeltaZ * this.iteration;
	}


}