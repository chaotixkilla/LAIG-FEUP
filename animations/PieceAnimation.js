class PieceAnimation{
	constructor(piece, start, destination){
		this.piece = piece;
		this.start = start;
		this.destination = destination;

		this.timeSpan = 5;
		this.waitTime = 1;

		this.animationTime = 0;

		this.startTime = this.piece.scene.sceneStartingTime;

		this.matrix = mat4.create();

		this.xStart = this.start.x;
		this.yStart = this.start.y;

		this.xFinish = this.destination.x;
		this.yFinish = this.destination.y;
	}

	isComplete(currTime){
		return this.animationTime > (this.timeSpan - this.waitTime);
	}

	update(currTime){
		this.animationTime += currTime;
		//console.log(this.animationTime);
		/*if(elapsedTime < this.waitTime){
			return;
		}*/

		this.matrix = mat4.create();

		/*if(elapsedTime >= this.timeSpan){
			return;
		}*/

		var ratio = this.animationTime/(this.timeSpan - this.waitTime);
		if(ratio >= 1){
			return;
		}
		//console.log(ratio);

		var moveX = (this.xFinish - this.xStart) * ratio;
		var moveY = 0;
		var moveZ = (this.yFinish - this.yStart) * ratio;

		/*console.log("moveX = " + moveX);
		console.log("moveY = " + moveY);
		console.log("moveZ = " + moveZ);*/

		mat4.translate(this.matrix, this.matrix, [moveX, moveY, moveZ]);
		//console.log(this.matrix);
	}

	apply(){
		this.piece.scene.multMatrix(this.matrix);
	}
}