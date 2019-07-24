import {
    SPAWN_MARKER,
} from './constants';

// TODO move to consts
const TILESHEET_WIDTH = 1200;
const TILESHEET_COLS = 20;
const TILESHEET_SPRITE = TILESHEET_WIDTH / TILESHEET_COLS;

class LevelTextureManager {
    getTexture(type) {
        const adjustedType = type - 1;
        const sourceRow = Math.floor(adjustedType / TILESHEET_COLS);
        const sourceCol = adjustedType - sourceRow * TILESHEET_COLS;

        const textureCoordinates = {
            x: sourceCol * TILESHEET_SPRITE,
            y: sourceRow * TILESHEET_SPRITE,
        };
        
        if (type === SPAWN_MARKER) {
            return 0;
        }

        return textureCoordinates;
    }
}

export default LevelTextureManager;
