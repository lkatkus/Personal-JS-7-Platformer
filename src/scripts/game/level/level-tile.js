import {
    TILE_SIZE,
} from './constants';

class LevelTile {
    constructor(row, col, texture) {
        this.x = col * TILE_SIZE;
        this.y = row * TILE_SIZE;
        this.row = row;
        this.col = col;
        this.texture = texture;
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
    }
}

export default LevelTile;
