class PieceAnimation{
	constructor(piece, start, destination){
		this.piece = piece;
		this.start = start;
		this.destination = destination;

		this.piece.animation = this;

		this.timeSpan = 4;
		this.waitTime = 1;

		this.animationTime = 0;
		this.iteration = 0.02;

		this.startTime = this.piece.scene.sceneStartingTime;

		//this.matrix = mat4.create();

		//this.xStart = this.start.x;
		//this.yStart = this.start.y;
		this.xStart = - (this.start.realX - this.destination.realX);
		this.yStart = - (this.start.realY - this.destination.realY);

		/*this.xFinish = this.destination.x;
		this.yFinish = this.destination.y;*/

		this.xFinish = 0;
		this.yFinish = 0;

		this.radius = Math.sqrt(Math.pow((this.xFinish - this.xStart), 2) + Math.pow((this.yFinish - this.yStart), 2));
	}

	isComplete(currTime){
		return this.animationTime > (this.timeSpan - this.waitTime);
	}

	/*update(currTime){
		this.animationTime += currTime;
		//console.log(this.animationTime);
		if(elapsedTime < this.waitTime){
			return;
		}

		this.matrix = mat4.create();

		if(elapsedTime >= this.timeSpan){
			return;
		}

		var ratio = this.animationTime/(this.timeSpan - this.waitTime);
		if(ratio >= 1){
			this.piece.moving = false;
			return;
		}
		//console.log(ratio);

		var moveX = (this.xFinish - this.xStart) * ratio;
		var moveY = 0;
		var moveZ = (this.yFinish - this.yStart) * ratio;

		console.log("moveX = " + moveX);
		console.log("moveY = " + moveY);
		console.log("moveZ = " + moveZ);

		mat4.translate(this.matrix, this.matrix, [moveX, moveY, moveZ]);
		//console.log(this.matrix);
	}*/

	apply(){
		this.animationTime += this.iteration;

		//console.log(this.animationTime);

		var ratio = this.animationTime/(this.timeSpan - this.waitTime);
		if(ratio >= 1){
			this.piece.moving = false;
			/*this.scene.game.unbindPieceToTile(this.start, piece);
 			this.scene.game.bindPieceToTile(this.destination, piece);*/
			return;
		}
		//var moveX = (this.xFinish - this.xStart) * ratio;
		var moveX = (this.xStart - this.xFinish) * ratio;
		var moveY = this.radius * 0.25 * Math.sin(Math.PI * (1 - ratio));
		var moveZ = (this.yStart - this.yFinish) * ratio;
		//var moveZ = (this.yFinish - this.yStart) * ratio;

		/*console.log("moveX = " + moveX);
		console.log("moveY = " + moveY);
		console.log("moveZ = " + moveZ);*/

		//this.piece.scene.pushMatrix();
		this.piece.scene.translate(-this.xStart, moveY, -this.yStart);
		this.piece.scene.translate(moveX, moveY, moveZ);
		this.piece.scene.rotate(Math.PI/16, 1, 0, 0);
		//this.piece.scene.popMatrix();
	}
}