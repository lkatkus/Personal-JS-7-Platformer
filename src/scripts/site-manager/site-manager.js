import Game from './../game/Game';

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
        this.currentContentTab = null;
        this.game = null;
        
        this.setListeners();
    }

    openSideBar() {
        this.sideBarWrapper.className = 'open';
    }

    closeSideBar() {
        this.sideBarWrapper.className = 'closed';
    }

    toggleContentWrapper(nextTab) {
        if (!this.contentWrapperOpen && !this.currentContentTab) {
            this.currentContentTab = nextTab;
            this.contentWrapper.className = 'open';
            document.getElementById(nextTab).className = 'open';

            this.contentWrapperOpen = !this.contentWrapperOpen;
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
        this.contentWrapper.className = 'closed';
        this.contentWrapperOpen = false;
        this.currentContentTab = null;
    }

    startGame() {
        if (!this.game) {
            this.game = new Game(this.onLoadGame);
            this.startGameButton.innerHTML = 'Loading...'
        }
    }
    
    onLoadGame() {
        console.log('GAME LOADED!');
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