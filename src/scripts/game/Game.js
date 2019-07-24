import LevelManager from './level-manager/level-manager';
import Camera from './camera';
import Player from './Player';

import {
    FPS,
    MOVEMENT_KEYS,
    MOVEMENT_KEY_CODES,
} from './constants';

class Game {
    constructor(onLoadCallback) {
        this.mainDraw = this.mainDraw.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.setCanvas();
        this.setControls();
        
        this.level = new LevelManager(this.canvas, this.context, this.setPlayerPosition);
        this.player = new Player(this.canvas, this.context, this.level.initialPlayerLocation);
        this.camera = new Camera(this.canvas, this.level, this.player);
        
        this.level.loadingHandler.then(() => {
            this.startGame(onLoadCallback);
        })
    }

    setCanvas() {
        this.canvas = document.getElementById('sceneCanvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', this.handleResize);
    }

    handleResize() {
        window.cancelAnimationFrame(this.drawInterval);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.level.resetTileSize();
        this.player.resetPosition(this.level.TILE_SIZE);
        this.camera.resetCameraOffset();

        this.drawInterval = requestAnimationFrame(this.mainDraw);
    }

    setControls() {
        document.addEventListener('keydown', (event) => {
            if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
                if (event.key.includes('Arrow')) {
                    return this.player.move(MOVEMENT_KEYS[event.key], this.level.TILE_SIZE);
                }
                
                this.player.move(MOVEMENT_KEYS[`Arrow${event.key}`]);
            }
        });

        // TODO add touch event listeners
    }

    mainDraw() {
        this.camera.updateCameraOffset();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(this.camera.offsetX, this.camera.offsetY);

        this.level.draw();
        this.player.draw(this.level.TILE_SIZE);

        this.context.restore();

        requestAnimationFrame(this.mainDraw)
    }

    startGame(onLoadCallback) {
        onLoadCallback();
        this.drawInterval = requestAnimationFrame(this.mainDraw);
    }
}

export default Game;
