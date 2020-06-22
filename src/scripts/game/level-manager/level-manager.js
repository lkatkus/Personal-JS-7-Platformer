import LevelTextureManager from './level-texture-manager';
import LevelTile from './level-tile';

class LevelManager {
  constructor(canvas, canvasContext, config) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.spawnMarker = config.spawnMarker;
    this.levelLayout = config.layout;
    this.spriteSize = config.tileSheet.spriteSize;
    this.tilesPerRow = config.tileSheet.tilesPerRow;
    this.tileTypes = config.tileSheet.types;

    this.levelTextureManager = new LevelTextureManager({
      spawnMarker: this.spawnMarker,
      tileSheetCols: config.tileSheet.cols,
      spriteSize: this.spriteSize,
    });

    this.setTileSize();
    this.setTileContainer();

    this.loadingHandler = new Promise((resolve) => {
      this.textureSheet = new Image();
      this.textureSheet.src = config.tileSheet.src;
      this.textureSheet.onload = () => resolve();
    });
  }

  setTileSize() {
    // TODO add check to check if new TILE_SIZE !== CURRENT_TILE_SIZE
    if (this.canvas.width / this.canvas.height < 1) {
      this.TILE_SIZE = Math.ceil(this.canvas.width / this.tilesPerRow);
    } else {
      this.TILE_SIZE = Math.ceil(this.canvas.height / this.tilesPerRow);
    }

    this.colsOnScreen = Math.floor(this.canvas.width / this.TILE_SIZE);
    this.rowsOnScreen = Math.floor(this.canvas.height / this.TILE_SIZE);
  }

  resetTileSize() {
    if (this.canvas.width / this.canvas.height < 1) {
      this.TILE_SIZE = Math.ceil(this.canvas.width / this.tilesPerRow);
    } else {
      this.TILE_SIZE = Math.ceil(this.canvas.height / this.tilesPerRow);
    }

    this.colsOnScreen = Math.floor(this.canvas.width / this.TILE_SIZE);
    this.rowsOnScreen = Math.floor(this.canvas.height / this.TILE_SIZE);

    this.tileContainer.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        tile.updateTileSize(this.TILE_SIZE);
      });
    });
  }

  setTileContainer() {
    this.tileContainer = this.levelLayout.map((layoutRow, row) =>
      layoutRow.map((type, col) => {
        if (type === this.spawnMarker) {
          this.spawnX = col * this.TILE_SIZE;
          this.spawnY = row * this.TILE_SIZE;

          this.initialPlayerLocation = {
            col: col,
            row: row,
            x: col * this.TILE_SIZE,
            y: row * this.TILE_SIZE,
          };
        }

        return new LevelTile(
          row,
          col,
          this.TILE_SIZE,
          this.levelTextureManager.getTexture(type),
          type
        );
      })
    );
  }

  updateVisibleTiles() {
    let leftCol = Math.floor(this.cameraOffsetX / this.TILE_SIZE) - 2;
    if (leftCol < 0) {
      leftCol = 0;
    }

    let rightCol = leftCol + this.colsOnScreen + 4;
    // @todo define in constructor
    if (rightCol > this.levelLayout[0].length) {
      rightCol = this.levelLayout[0].length;
    }

    let topRow = Math.floor(this.cameraOffsetY / this.TILE_SIZE) - 2;
    if (topRow < 0) {
      topRow = 0;
    }

    let bottomRow = topRow + this.rowsOnScreen + 4;
    // @todo define in constructor
    if (bottomRow > this.levelLayout.length) {
      bottomRow = this.levelLayout.length;
    }

    this.visibleLeftCol = leftCol;
    this.visibleRightCol = rightCol;
    this.visibleTopRow = topRow;
    this.visibleBottomRow = bottomRow;
  }

  draw(newOffsetX, newOffsetY) {
    if (
      this.cameraOffsetX !== newOffsetX ||
      this.cameraOffsetY !== newOffsetY
    ) {
      this.cameraOffsetX = -newOffsetX;
      this.cameraOffsetY = -newOffsetY;

      this.updateVisibleTiles();
    }

    this.drawTiles();
  }

  drawTiles() {
    this.tileContainer.forEach((tileRow, rowIndex) => {
      if (rowIndex > this.visibleTopRow && rowIndex < this.visibleBottomRow) {
        tileRow.forEach((tile, colIndex) => {
          if (
            colIndex > this.visibleLeftCol &&
            colIndex < this.visibleRightCol
          ) {
            this.context.drawImage(
              this.textureSheet,
              tile.texture.x,
              tile.texture.y,
              this.spriteSize,
              this.spriteSize,
              tile.x,
              tile.y,
              tile.width,
              tile.height
            );
          }
        });
      }
    });
  }

  getTile(row, col) {
    if (
      row < 0 ||
      row > this.tileContainer.length - 1 ||
      col < 0 ||
      col > this.tileContainer[0].length - 1
    ) {
      return null;
    }

    return this.tileContainer[row][col];
  }

  canClimbTile(type) {
    return this.tileTypes.climbable.includes(type);
  }

  canWalkTile(type) {
    return this.tileTypes.solid.includes(type);
  }
}

export default LevelManager;
