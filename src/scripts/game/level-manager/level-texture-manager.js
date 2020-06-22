class LevelTextureManager {
  constructor(config) {
    this.spawnMarker = config.spawnMarker;
    this.tileSheetCols = config.tileSheetCols;
    this.spriteSize = config.spriteSize;
  }

  getTexture(type) {
    const adjustedType = type - 1;
    const sourceRow = Math.floor(adjustedType / this.tileSheetCols);
    const sourceCol = adjustedType - sourceRow * this.tileSheetCols;

    const textureCoordinates = {
      x: sourceCol * this.spriteSize,
      y: sourceRow * this.spriteSize,
    };

    if (type === this.spawnMarker) {
      return 0;
    }

    return textureCoordinates;
  }
}

export default LevelTextureManager;
