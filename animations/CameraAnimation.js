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
		this.currentTime += this.iteration;

		var ratio = this.currentTime / this.animationTime;
		if(ratio >= 1){
			this.finished = true;
			return;
		}

		this.startingCamera.position[0] += this.deltaX / (this.animationTime / this.iteration);
		this.startingCamera.position[1] += this.deltaY / (this.animationTime / this.iteration);
		this.startingCamera.position[2] += this.deltaZ / (this.animationTime / this.iteration);

		this.startingCamera.target[0] += this.targetDeltaX / (this.animationTime / this.iteration);
		this.startingCamera.target[1] += this.targetDeltaY / (this.animationTime / this.iteration);
		this.startingCamera.target[2] += this.targetDeltaZ / (this.animationTime / this.iteration);
	}


}