import { TILE_SIZE } from './constants';

class LevelTile {
  constructor(row, col, TILE_SIZE, texture, type) {
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE;
    this.row = row;
    this.col = col;
    this.type = type;
    this.texture = texture;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
  }

  updateTileSize(TILE_SIZE) {
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
  }
}

export default LevelTile;
