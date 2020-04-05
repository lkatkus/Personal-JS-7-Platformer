import LevelManager from './level-manager/level-manager';
import EventManager from './event-manager/event-manager';
import Camera from './camera';
import { Player, Npc } from './entity';

import NpcCatTexture from './../../assets/textures/npc-cat-tileSheet.png';
import PlayerTexture from './../../assets/textures/player-tile-sheet.png';

class Game {
  constructor(onLoadCallback, siteActions) {
    this.mainDraw = this.mainDraw.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.setCanvas();

    this.level = new LevelManager(
      this.canvas,
      this.context,
      this.setPlayerPosition
    );
    this.eventManager = new EventManager(siteActions);
    this.player = new Player(this.context, this.level, {
      name: 'player',
      movement: {
        speedX: 8,
        speedY: 8,
      },
      texture: {
        source: PlayerTexture,
        height: 200,
        width: 100,
        tileCols: 8,
        drawOffset: 1,
        drawHeightOffset: 2
      }
    });
    // TODO create npc manager
    this.npc = new Npc(this.context, this.level, {
      name: 'cat',
      movement: {
        speedX: 10,
        speedY: 8,
      },
      texture: {
        source: NpcCatTexture,
        height: 64,
        width: 64,
        tileCols: 3,
        drawOffset: 0,
        drawHeightOffset: 1
      },
      min: {
        row: 33,
        col: 12
      },
      max: {
        row: 33,
        col: 24
      }
    });

    this.camera = new Camera(this.canvas, this.level, this.player);

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

  debug() {
    const debugContainer = document.getElementById('debugContainer');
    debugContainer.innerText = `
      x ${this.player.x}
      y ${this.player.y}
      row ${this.player.row}
      col ${this.player.col}
      speedX ${this.player.speedX}
      speedY ${this.player.speedY}
      isFalling ${this.player.isFalling}
    `;

    this.context.fillStyle = 'red';
    this.context.beginPath();
    this.context.arc(this.player.x, this.player.y, 5, 0, 2 * Math.PI);
    this.context.arc(
      this.player.anchorX,
      this.player.anchorY,
      5,
      0,
      2 * Math.PI
    );
    this.context.fill();
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
    this.debug();
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
