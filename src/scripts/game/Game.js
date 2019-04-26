import Level from './level/level';
import Player from './Player';

import {
    MOVEMENT_KEYS,
    MOVEMENT_KEY_CODES,
} from './constants';

class Game {
    constructor(onLoadCallback) {
        this.setSpawnMarker = this.setSpawnMarker.bind(this);
        this.mainDraw = this.mainDraw.bind(this);

        this.setCanvas();
        this.setControls();

        this.level = new Level(this.canvas, this.context, this.setSpawnMarker);
        this.player = new Player(this.spawnRow, this.spawnCol);

        this.startGame(onLoadCallback);
    }

    setSpawnMarker(row, col) {
        this.spawnRow = row;
        this.spawnCol = col;
    }

    setCanvas() {
        this.canvas = document.getElementById('sceneCanvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setControls() {
        document.addEventListener('keydown', (event) => {
            if (MOVEMENT_KEY_CODES.includes(event.keyCode)) {
                if (event.key.includes('Arrow')) {
                    return this.player.move(MOVEMENT_KEYS[event.key]);
                }
                
                this.player.move(MOVEMENT_KEYS[`Arrow${event.key}`]);
            }
        });

        // TODO add touch event listeners
    }

    mainDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level.draw();
        this.player.draw();
    }

    startGame(onLoadCallback) {
        onLoadCallback()
        this.mainDraw();
        // setInterval(this.mainDraw, 1000);
    }
}

export default Game;
