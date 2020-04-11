class Entity {
  constructor(contextRef, levelRef, initialLocation, config) {
    this.name = config.name;
    this.context = contextRef;
    this.level = levelRef;
    /** Position in the game world */
    this.row = initialLocation.row;
    this.col = initialLocation.col;
    this.x = initialLocation.x;
    this.y = initialLocation.y;
    /** Animation params */
    this.tileRowOffset = 2;
    this.tileColOffset = 0;
    this.drawOffset = config.texture.drawOffset;
    this.drawHeightOffset = config.texture.drawHeightOffset;
    this.tileCols = config.texture.tileCols;
    this.textureWidth = config.texture.width;
    this.textureHeight = config.texture.height;
    /** Movement params */
    this.isMoving = false;
    this.direction = 'right';
    this.speedX = config.movement.speedX;
    this.speedY = config.movement.speedY;

    /** Used to handle player animations */
    this.colOffsetInterval = setInterval(() => {
      this.tileColOffset =
        this.tileColOffset < this.tileCols ? (this.tileColOffset += 1) : 0;
    }, 100);

    this.loadingHandler = new Promise(resolve => {
      this.textureSheet = new Image();
      this.textureSheet.src = config.texture.source;
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
      this.textureWidth * this.tileColOffset,
      this.textureHeight * this.tileRowOffset,
      this.textureWidth,
      this.textureHeight,
      this.x,
      this.y - tileSize * this.drawOffset,
      tileSize,
      tileSize * this.drawHeightOffset
    );
  }
}

export default Entity;
