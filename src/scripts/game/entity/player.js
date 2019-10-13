import Entity from './entity';
import PlayerTileSheet from './../../../assets/textures/player-tile-sheet.png';

import {
    MOVEMENT_KEYS,
    MOVEMENT_KEY_CODES,
} from './../constants';

class Player extends Entity {
    constructor(canvas, canvasContext, name, initialPlayerLocation) {
        super(canvas, canvasContext, name, initialPlayerLocation, PlayerTileSheet);

        this.setControls();
    }

    setControls() {
        document.addEventListener('keydown', (event) => {
            if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
                this.moveStart(MOVEMENT_KEYS[event.key]);
            }
        });

        document.addEventListener('keyup', (event) => {
            if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
                this.moveEnd(MOVEMENT_KEYS[event.key]);
            }
        });

        // TODO add touch event listeners
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
}

export default Player;
