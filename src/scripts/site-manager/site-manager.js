import { Game } from 'laikajs';

import { GAME_CONFIG } from './game.config';
import { LEVEL_CONFIG } from './level.config';
import { prepareEvents } from './events.config';

class SiteManager {
  constructor() {
    this.onLoadGame = this.onLoadGame.bind(this);

    // TODO create set method
    this.sideBarWrapper = document.getElementById('sideBarWrapper');
    this.contentWrapper = document.getElementById('contentWrapper');
    this.titleWrapper = document.getElementById('titleWrapper');
    this.canvasWrapper = document.getElementById('canvasWrapper');

    this.sideBarOpenButton = document.getElementById('sideBarOpenButton');
    this.sideBarCloseButton = document.getElementById('sideBarCloseButton');
    this.sideBarList = document.querySelectorAll('.sidebarLink');
    this.contentCloseButton = document.getElementById('contentCloseButton');
    this.startGameButton = document.getElementById('startGameButton');

    this.sideBarOpen = false;
    this.contentWrapperOpen = false;
    this.contentWrapper.className = 'closed';
    this.contentWrapper.style.animationDuration = '0.2s';
    this.sideBarWrapper.style.animationDuration = '0.2s';

    this.currentContentTab = null;
    this.game = null;

    this.setListeners();
  }

  openSideBar() {
    this.sideBarWrapper.className = 'opening';

    setTimeout(() => {
      this.sideBarWrapper.className = 'open';
    }, 200);
  }

  closeSideBar() {
    this.sideBarWrapper.className = 'closing';

    setTimeout(() => {
      this.sideBarWrapper.className = 'closed';
    }, 200);
  }

  toggleContentWrapper(nextTab, shouldOpenSideBar) {
    if (shouldOpenSideBar) {
      this.openSideBar();
    }

    if (!this.contentWrapperOpen && !this.currentContentTab) {
      this.currentContentTab = nextTab;
      this.contentWrapper.className = 'opening';
      document.getElementById(nextTab).className = 'open';

      setTimeout(() => {
        this.contentWrapper.className = 'open';
        this.contentWrapperOpen = !this.contentWrapperOpen;
      }, 200);
    } else if (this.contentWrapperOpen) {
      if (this.currentContentTab !== nextTab) {
        document.getElementById(this.currentContentTab).className = 'closed';
        document.getElementById(nextTab).className = 'open';

        this.currentContentTab = nextTab;
      }
    }
  }

  closeContentWrapper() {
    document.getElementById(this.currentContentTab).className = 'closed';
    this.contentWrapper.className = 'closing';

    setTimeout(() => {
      this.contentWrapper.className = 'closed';
      this.contentWrapperOpen = false;
      this.currentContentTab = null;
    }, 200);
  }

  startGame() {
    if (!this.game) {
      this.game = new Game(
        {
          ...GAME_CONFIG,
          level: LEVEL_CONFIG,
          events: prepareEvents.call(this),
          canvas: document.getElementById('sceneCanvas'),
        },
        {
          onLoadGame: this.onLoadGame,
          onDraw: function () {
            const debugContainer = document.getElementById('debugContainer');
            debugContainer.innerText = `
              x ${this.player.x}
              y ${this.player.y}
              row ${this.player.row}
              col ${this.player.col}
              speedX ${this.player.speedX}
              speedY ${this.player.speedY}
              isFalling ${this.player.isFalling}
              canFly ${this.player.canFly}
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
          },
        }
      );
      this.startGameButton.innerHTML = 'Loading...';
    }
  }

  onLoadGame() {
    this.titleWrapper.className = 'hidden';
    this.canvasWrapper.className = null;
  }

  setListeners() {
    this.sideBarOpenButton.addEventListener('click', () => {
      this.openSideBar();
    });

    this.sideBarCloseButton.addEventListener('click', () => {
      this.closeSideBar();

      if (this.contentWrapperOpen) {
        this.closeContentWrapper();
      }
    });

    this.contentCloseButton.addEventListener('click', () => {
      this.closeContentWrapper();
    });

    // Array.from required for IE
    Array.from(this.sideBarList).forEach((element) => {
      element.addEventListener('click', () => {
        this.toggleContentWrapper(element.getAttribute('value'));
      });
    });

    this.startGameButton.addEventListener('click', () => {
      this.startGame();
    });
  }
}

export default SiteManager;
