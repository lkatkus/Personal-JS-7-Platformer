class SiteManager {
    constructor() {
        this.sideBarWrapper = document.getElementById('sideBarWrapper');
        this.sideBarOpenButton = document.getElementById('sideBarOpenButton');
        this.sideBarCloseButton = document.getElementById('sideBarCloseButton');
        this.sideBarList = document.querySelectorAll('.sidebarLink');
        this.contentWrapper = document.getElementById('contentWrapper');
        
        this.sideBarOpen = false;
        this.contentWrapperOpen = false;
        this.contentWrapper.className = 'closed';
        this.currentContentTab = null;
        
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

        document.getElementById('contentButton').addEventListener('click', () => {
            this.closeContentWrapper();
        });
        
        // Array.from required for IE
        Array.from(this.sideBarList).forEach((element) => {
            element.addEventListener('click', () => {
                this.toggleContentWrapper(element.getAttribute('value'));
            });
        });

        document.getElementById('startGameButton').addEventListener('click', () => {
            alert('startGameButton')
        });
    }
}

export default SiteManager;