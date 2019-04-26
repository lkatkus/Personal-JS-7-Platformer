import {
    SPAWN_MARKER,
} from './constants';

class LevelTextureManager {
    constructor() {
        console.log('LevelTextureManager constructor');
    }

    getTexture(type) {
        if (type === SPAWN_MARKER) {
            return 0;
        }

        return type;
    }
}

export default LevelTextureManager;
