class Entity {
  constructor(canvas, canvasContext, name, initialLocation, tileSheet, level) {
    this.name = name;
    this.canvas = canvas;
    this.context = canvasContext;
    this.level = level;
    /** Position in the game world */
    this.row = initialLocation.row;
    this.col = initialLocation.col;
    this.x = initialLocation.spawnX;
    this.y = initialLocation.spawnY;
    /** Animation params */
    this.tileRowOffset = 2;
    this.tileColOffset = 0;
    /** Movement params */
    this.isMoving = false;
    this.direction = 'right';
    this.speedX = 8;
    this.speedY = 8;

    /** Used to handle player animations */
    this.colOffsetInterval = setInterval(() => {
      this.tileColOffset =
        this.tileColOffset < 8 ? (this.tileColOffset += 1) : 0;
    }, 100);

    this.loadingHandler = new Promise(resolve => {
      this.textureSheet = new Image();
      this.textureSheet.src = tileSheet;
      this.textureSheet.onload = () => resolve();
    });
  }

  resetPosition(tileSize) {
    this.x = Math.floor(this.col * tileSize);
    this.y = Math.floor(this.row * tileSize);
    this.speedX = Math.floor(tileSize / 12);
    this.speedY = Math.floor(tileSize / 12);
  }

  draw(tileSize) {
    this.isMoving && this.move(tileSize);
    this.isFalling && this.fall(tileSize);

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

export default Entity;
