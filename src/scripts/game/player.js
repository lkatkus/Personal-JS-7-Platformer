import PlayerTileSheet from './../../assets/textures/player-tile-sheet.png';

class Player {
    constructor(canvas, canvasContext, initialPlayerLocation) {
        this.canvas = canvas;
        this.context = canvasContext;
        /** Position in the game world */
        this.row = initialPlayerLocation.row;
        this.col = initialPlayerLocation.col;
        this.x = initialPlayerLocation.spawnX;
        this.y = initialPlayerLocation.spawnY;
        /** Animation params */
        this.tileRowOffset = 2;
        this.tileColOffset = 0;
        /** Movement params */
        this.isMoving = false;
        this.direction = 'right';
        this.speedX = 5;
        this.speedY = 5;

        /** Used to handle player animations */
        this.colOffsetInterval = setInterval(() => {
            this.tileColOffset = this.tileColOffset < 8
                ? this.tileColOffset += 1
                : 0;
        }, 100);

        this.loadingHandler = new Promise((resolve) => {
            this.textureSheet = new Image();
            this.textureSheet.src = PlayerTileSheet;
            this.textureSheet.onload = () => resolve();
        });
    }

    resetPosition(tileSize) {
        this.x = this.col * tileSize;
        this.y = this.row * tileSize;
    }

    moveStart(direction) {
        this.isMoving = true;
        this.direction = direction;
    }

    move(tileSize) {
        this.row = Math.floor(this.y / tileSize);
        this.col = Math.floor(this.x / tileSize);

        // TODO use consts for direction
        switch(this.direction){
            case('right'):
                this.tileRowOffset = 0;
                this.x = this.x + this.speedX;
                break;
            case('left'):
                this.tileRowOffset = 1;
                this.x = this.x - this.speedX;
                break;
            case('up'):
                this.y = this.y - this.speedY;
                break;
            case('down'):
                this.y = this.y + this.speedY;
                break;
        }
    }

    moveEnd(direction) {
        this.isMoving = false;

        switch(direction) {
            case('right'):
                this.tileRowOffset = 2;
                break;
            case('left'):
                this.tileRowOffset = 3;
                break;
            // TODO
            case('up'):
                break;
            case('down'):
                break;
        }
    }

    draw(tileSize) {
        this.isMoving && this.move(tileSize);
        this.context.drawImage(
            this.textureSheet,
            100 * this.tileColOffset,
            200 * this.tileRowOffset,
            100,
            200,
            this.x,
            this.y - tileSize,
            tileSize,
            tileSize * 2
        );
    }
}

export default Player;
