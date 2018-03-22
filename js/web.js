var sidebar;
var contentContainer;
var contentWrapper;
var sidebarLinks;
var sidebarVisible = false;
var contentVisible = false;

window.addEventListener('resize', function(){
    if(contentVisible || sidebarVisible){
        setContentSize();
    };
});

window.addEventListener('load', function(){

    sidebar = document.getElementById('sidebar');
    contentContainer = document.getElementById('contentContainer');
    contentWrapper = document.getElementById('contentWrapper');

    // GET ALL SIDEBAR LINKS
    sidebarLinks = document.getElementsByClassName('sidebarLink');
    // ADD EVENT LISTENERS TO BUTTONS
    for(let i = 0; i < sidebarLinks.length;i++){
        sidebarLinks[i].addEventListener('click', function(){
            showContent(this);
            this.classList.add('active');
        })
    };

    // GET ALL TEXTBOX LINKS
    var textboxLinks = document.getElementsByClassName('textboxLink');
    // ADD EVENT LISTENERS TO BUTTONS
    for(let i = 0; i < textboxLinks.length;i++){
        textboxLinks[i].addEventListener('click', function(){
            openNav();
            showContent(this);
        })
    };
});

function openNav(){
    // sidebar.classList.remove('hidden');
    sidebar.style.left = 0;
    // document.getElementById('sidebarClose').classList.remove('hidden');
    document.getElementById('sidebarOpen').classList.add('hidden');
};

function closeNav(){
    sidebar.style.left = -sidebar.offsetWidth + 'px';
    closeContent();
    // sidebar.classList.add('hidden');
    // document.getElementById('sidebarClose').classList.add('hidden');
    document.getElementById('sidebarOpen').classList.remove('hidden');
};


function showContent(target){

    contentVisible = true;

    for(let i = 0; i < sidebarLinks.length;i++){
        sidebarLinks[i].classList.remove('active');
    };

    contentContainer.classList.remove('hidden');

    setContentSize();

    // HIDE ALL CONTENT DIVS
    for(let i = 0; i < contentWrapper.children.length; i++){
        contentWrapper.children[i].classList.add('hidden');
    }

    // CREATE TARGET CONTENT NAME
    let contentDivName ='content' + target.getAttribute('value');
    let contentDiv = document.getElementById(contentDivName);

    // SHOW CONTENT
    contentDiv.classList.remove('hidden');
};

function closeContent(){
    contentContainer.style.left = '100%';
    contentVisible = false;
};

function setContentSize(){
    // GET OFFSET AND WIDTH FOR CONTENT CONTAINER
    let contentDivOffset = sidebar.offsetWidth;
    let contentDivWidth = window.innerWidth - contentDivOffset;

    // SET OFFSET AND WIDTH
    contentContainer.style.left = contentDivOffset + 'px';
    contentContainer.style.width = contentDivWidth + 'px';
}

// function getScrollbarWidth() {
//   const outer = document.createElement('div');
//   const inner = document.createElement('div');
//
//   outer.style.visibility = 'hidden';
//   outer.style.width = '100px';
//
//   inner.style.width = '100%';
//
//
//   outer.appendChild(inner);
//   document.body.appendChild(outer);
//
//
//   const widthWithoutScrollbar = outer.offsetWidth;
//
//   outer.style.overflow = 'scroll';
//
//   const widthWithScrollbar = inner.offsetWidth;
//
//
//   document.body.removeChild(outer);
//
//
//   return (widthWithoutScrollbar - widthWithScrollbar);
// }
