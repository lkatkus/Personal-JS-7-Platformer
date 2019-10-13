import LevelManager from './level-manager/level-manager';
import EventManager from './event-manager/event-manager';
import Camera from './camera';
import { Player, Npc } from './entity';

class Game {
    constructor(onLoadCallback) {
        this.mainDraw = this.mainDraw.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.setCanvas();

        this.level = new LevelManager(this.canvas, this.context, this.setPlayerPosition);
        this.eventManager = new EventManager();
        this.player = new Player(this.canvas, this.context, 'player', this.level.initialPlayerLocation);
        this.camera = new Camera(this.canvas, this.level, this.player);
        // TODO create npc manager
        this.npc = new Npc(this.canvas, this.context, 'npc', this.level.initialPlayerLocation);

        Promise.all([
            this.level.loadingHandler,
            this.player.loadingHandler
            // TODO npc loading handler
        ]).then(() => {
            this.startGame(onLoadCallback);
        });
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
        // TODO create npc manager
        this.npc.resetPosition(this.level.TILE_SIZE);
        this.camera.resetCameraOffset();

        window.requestAnimationFrame(this.mainDraw);
    }

    mainDraw() {
        this.camera.updateCameraOffset();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(this.camera.offsetX, this.camera.offsetY);

        this.level.draw(this.camera.offsetX, this.camera.offsetY);
        // TODO create npc manager
        this.npc.draw(this.level.TILE_SIZE);
        this.player.draw(this.level.TILE_SIZE);

        this.context.restore();

        this.drawInterval = window.requestAnimationFrame(this.mainDraw);
        this.eventManager.checkEvent(this.player.row, this.player.col);
    }

    startGame(onLoadCallback) {
        onLoadCallback();
        window.requestAnimationFrame(this.mainDraw);
    }
}

export default Game;
