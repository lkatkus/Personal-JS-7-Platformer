class Camera {
    constructor(canvas, level, player) {
        this.canvas = canvas;
        this.level = level;
        this.player = player;

        this.setInitialCamera();
    }

    setInitialCamera() {
        this.offsetX = -this.level.spawnX + this.canvas.width / 2;
        this.offsetY = -(this.level.spawnY - this.canvas.height / 2);
    }

    resetCameraOffset() {
        this.offsetX = -this.player.x + this.canvas.width / 2;
        this.offsetY = -(this.player.y - this.canvas.height / 2);
    }

    updateCameraOffset() {
        if (this.player.x + this.offsetX > this.canvas.width / 10 * 8) {
            this.offsetX = this.offsetX - this.player.speedX;
        } else if (this.player.x + this.offsetX < this.canvas.width / 10 * 2) {
            this.offsetX = this.offsetX + this.player.speedX;
        }

        if (this.player.y + this.offsetY < this.canvas.height / 10 * 2) {
            this.offsetY = this.offsetY + this.player.speedY;
        } else if (this.player.y + this.offsetY > this.canvas.height / 10 * 8) {
            this.offsetY = this.offsetY - this.player.speedY;
        }
    }
}

export default Camera;
