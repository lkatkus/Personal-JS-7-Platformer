import LevelTextureManager from './level-texture-manager';
import LevelTile from './level-tile';

import {
    SPAWN_MARKER,
    LEVEL_LAYOUT,
    TILES_PER_ROW,
    TILESHEET_SPRITE_SIZE,
} from './constants';

import LevelTileSheet from './../../../assets/textures/level-tile-sheet.png'

class LevelManager {
    constructor(canvas, canvasContext, setPlayerPosition) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        this.levelTextureManager = new LevelTextureManager();
        
        this.setTileSize();
        this.setTileContainer(setPlayerPosition);
        
        this.loadingHandler = new Promise((resolve) => {
            this.textureSheet = new Image();
            this.textureSheet.src = LevelTileSheet;
            this.textureSheet.onload = () => resolve()
        })
    }

    setTileSize() {
        // TODO add check to check if new TILE_SIZE !== CURRENT_TILE_SIZE
        if (this.canvas.width / this.canvas.height < 1) {
            this.TILE_SIZE = Math.ceil(this.canvas.width / TILES_PER_ROW);
        } else {
            this.TILE_SIZE = Math.ceil(this.canvas.height / TILES_PER_ROW);
        }
    }

    resetTileSize() {
        if (this.canvas.width / this.canvas.height < 1) {
            this.TILE_SIZE = Math.ceil(this.canvas.width / TILES_PER_ROW);
        } else {
            this.TILE_SIZE = Math.ceil(this.canvas.height / TILES_PER_ROW);
        }

        this.tileContainer.forEach((tileRow) => {
            tileRow.forEach((tile) => {
                tile.updateTileSize(this.TILE_SIZE);
            });
        });
    }

    setTileContainer() {
        this.tileContainer = LEVEL_LAYOUT.map((layoutRow, row) => (
            layoutRow.map((type, col) => {
                if (type === SPAWN_MARKER) {
                    this.spawnX = col * this.TILE_SIZE;
                    this.spawnY = row * this.TILE_SIZE;

                    this.initialPlayerLocation = {
                        col: col,
                        row: row,
                        spawnX: col * this.TILE_SIZE,
                        spawnY: row * this.TILE_SIZE,
                    }
                }

                return new LevelTile(
                    row,
                    col,
                    this.TILE_SIZE,
                    this.levelTextureManager.getTexture(type),
                );
            })
        ));
    }

    draw() {       
        this.drawTiles();
    }

    drawTiles() {
        this.tileContainer.map((tileRow) => {
            tileRow.map((tile) => {
                this.ctx.drawImage(
                    this.textureSheet,
                    tile.texture.x,
                    tile.texture.y,
                    TILESHEET_SPRITE_SIZE,
                    TILESHEET_SPRITE_SIZE,
                    tile.x,
                    tile.y,
                    tile.width,
                    tile.height
                );
            })
        });
    }
}

export default LevelManager;
