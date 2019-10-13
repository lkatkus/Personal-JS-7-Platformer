import Entity from './entity';
import PlayerTileSheet from './../../../assets/textures/player-tile-sheet.png';

class Npc extends Entity {
    constructor(canvas, canvasContext, name, initialPlayerLocation) {
        super(canvas, canvasContext, name, initialPlayerLocation, PlayerTileSheet);

        this.moveStart('right');
    }

    moveStart(direction) {
        this.isMoving = true;
        this.direction = direction;
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

        // TODO pass from config
        if (this.col >= 15 && this.direction === 'right') {
            this.moveEnd(this.direction);

            return setTimeout(() => {
                this.moveStart('left');
            }, 1500);
        }

        if (this.col <= 5 && this.direction === 'left') {
            this.moveEnd(this.direction);

            return setTimeout(() => {
                this.moveStart('right');
            }, 500);
        }
    }
}

export default Npc;
