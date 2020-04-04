import Entity from './entity';

class Npc extends Entity {
  constructor(canvasContext, level, config) {
    super(
      canvasContext,
      level,
      level.getTile(config.min.row, config.min.col),
      config
    );

    this.config = config;

    this.moveStart('right');
  }

  moveStart(direction) {
    this.isMoving = true;
    this.direction = direction;
  }

  moveEnd(direction) {
    this.isMoving = false;

    switch (direction) {
      case 'right':
        this.tileRowOffset = 0;
        break;
      case 'left':
        this.tileRowOffset = 1;
        break;
      // TODO
      case 'up':
        break;
      case 'down':
        break;
    }
  }

  move(tileSize) {
    this.row = Math.floor(this.y / tileSize);
    this.col = Math.floor(this.x / tileSize);

    // TODO use consts for direction
    switch (this.direction) {
      case 'right':
        this.tileRowOffset = 0;
        this.x = this.x + this.speedX;
        break;
      case 'left':
        this.tileRowOffset = 1;
        this.x = this.x - this.speedX;
        break;
      case 'up':
        this.y = this.y - this.speedY;
        break;
      case 'down':
        this.y = this.y + this.speedY;
        break;
    }

    if (this.col >= this.config.max.col && this.direction === 'right') {
      this.moveEnd(this.direction);

      return setTimeout(() => {
        this.moveStart('left');
      }, 1500);
    }

    if (this.col <= this.config.min.col && this.direction === 'left') {
      this.moveEnd(this.direction);

      return setTimeout(() => {
        this.moveStart('right');
      }, 500);
    }
  }
}

export default Npc;
