import LevelTextureManager from './level-texture-manager';
import LevelTile from './level-tile';

import {
    SPAWN_MARKER,
    LEVEL_LAYOUT,
} from './constants';

class Level {
    constructor(canvas, canvasContext, setSpawnMarker) {
        this.canvas = canvas;
        this.ctx = canvasContext;
        this.levelTextureManager = new LevelTextureManager();

        this.tileContainer = LEVEL_LAYOUT.map((layoutRow, row) => (
            layoutRow.map((type, col) => {
                if (type === SPAWN_MARKER) {
                    setSpawnMarker(row, col);
                }

                return new LevelTile(
                    row,
                    col,
                    this.levelTextureManager.getTexture(type),
                );
            })
        ));
    }

    draw() {
        console.log('Level draw');
    }
}

export default Level;
