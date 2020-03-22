import Entity from './entity';
import PlayerTileSheet from './../../../assets/textures/player-tile-sheet.png';

import {
  MOVEMENT_KEYS,
  MOVEMENT_KEY_CODES,
  MOVEMENT_DIRECTION
} from './../constants';

const CAN_BE_CLIMBED = [21, 22, 23];

class Player extends Entity {
  constructor(canvas, canvasContext, name, initialPlayerLocation, level) {
    super(
      canvas,
      canvasContext,
      name,
      initialPlayerLocation,
      PlayerTileSheet,
      level
    );

    this.setControls();
  }

  setControls() {
    document.addEventListener('keydown', event => {
      if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
        this.moveStart(MOVEMENT_KEYS[event.key]);
      }
    });

    document.addEventListener('keyup', event => {
      if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
        this.moveEnd(MOVEMENT_KEYS[event.key]);
      }
    });

    // TODO add touch event listeners
  }

  updateAnchor(tileSize) {
    this.anchorX = this.x + tileSize / 2;
    this.anchorY = this.y + tileSize;
  }

  move(tileSize) {
    let nextRow;
    let nextCol;
    let nextTile;

    switch (this.direction) {
      case MOVEMENT_DIRECTION.right:
        nextRow = Math.floor(this.y / tileSize);
        nextCol = Math.floor((this.x + tileSize + this.speedX) / tileSize);
        break;
      case MOVEMENT_DIRECTION.left:
        nextRow = Math.floor(this.y / tileSize);
        nextCol = Math.floor((this.x - this.speedX) / tileSize);
        break;
      case MOVEMENT_DIRECTION.up:
        nextRow = Math.floor((this.y + tileSize - this.speedY) / tileSize);
        nextCol = Math.floor((this.x + tileSize / 2) / tileSize);
        break;
      case MOVEMENT_DIRECTION.down:
        nextRow = Math.floor((this.y + tileSize + this.speedY) / tileSize);
        nextCol = Math.floor((this.x + tileSize / 2) / tileSize);
        break;
    }

    nextTile = this.level.getTile(nextRow, nextCol);

    switch (this.direction) {
      case MOVEMENT_DIRECTION.right:
        if (nextTile.type !== -1) {
          this.tileRowOffset = 0;
          this.col = nextTile.col;
          this.x = this.x + this.speedX;
        }

        break;
      case MOVEMENT_DIRECTION.left:
        if (nextTile.type !== -1) {
          this.tileRowOffset = 1;
          this.col = nextTile.col;
          this.x = this.x - this.speedX;
        }

        break;
      case MOVEMENT_DIRECTION.up:
        if (CAN_BE_CLIMBED.includes(nextTile.type)) {
          this.row = nextTile.row;
          this.y = this.y - this.speedY;
        } else if (!CAN_BE_CLIMBED.includes(nextTile.type)) {
          this.row = nextTile.row;
          this.y = nextTile.y;
        }

        break;
      case MOVEMENT_DIRECTION.down:
        if (CAN_BE_CLIMBED.includes(nextTile.type)) {
          this.row = nextTile.row - 1;
          this.y = this.y + this.speedY;
        } else if (!CAN_BE_CLIMBED.includes(nextTile.type)) {
          this.row = nextTile.row - 1;
          this.y = nextTile.y - nextTile.height;
        }

        break;
    }

    this.updateAnchor(tileSize);
  }

  moveStart(direction) {
    this.isMoving = true;
    this.direction = direction;
  }

  moveEnd(direction) {
    this.isMoving = false;

    switch (direction) {
      case 'right':
        this.tileRowOffset = 2;
        break;
      case 'left':
        this.tileRowOffset = 3;
        break;
      // TODO
      case 'up':
        break;
      case 'down':
        break;
    }
  }
}

export default Player;
