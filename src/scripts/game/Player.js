class Player {
    constructor(canvas, canvasContext, initialPlayerLocation) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        this.row = initialPlayerLocation.row;
        this.col = initialPlayerLocation.col;
        this.x = initialPlayerLocation.spawnX;
        this.y = initialPlayerLocation.spawnY;

        this.speedX = 10;
        this.speedY = 10;
    }

    resetPosition(TILE_SIZE) {
        this.x = this.col * TILE_SIZE;
        this.y = this.row * TILE_SIZE;
    }

    move(direction, TILE_SIZE) {
        // TODO use consts
        // TODO update row and col
        if (direction === 'right') {
            this.x = this.x + this.speedX;
            this.col = Math.floor(this.x / TILE_SIZE);
        } else if (direction === 'left') {
            this.x = this.x - this.speedX;
            this.col = Math.floor(this.x / TILE_SIZE);
        } else if (direction === 'up') {
            this.y = this.y - this.speedY;
            this.row = Math.floor(this.y / TILE_SIZE);
        } else if (direction === 'down') {
            this.y = this.y + this.speedY;
            this.row = Math.floor(this.y / TILE_SIZE);
        }
    }
    
    draw(TILE_SIZE) {       
        this.ctx.fillRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
}

export default Player;
