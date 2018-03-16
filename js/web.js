var sidebar;
var contentContainer;
var contentWrapper;
var sidebarLinks;

window.addEventListener('resize', function(){
    setContentSize();
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
    sidebar.classList.remove('hidden');
    document.getElementById('sidebarClose').classList.remove('hidden');
    document.getElementById('sidebarOpen').classList.add('hidden');
};

function closeNav(){
    sidebar.classList.add('hidden');
    contentContainer.classList.add('hidden');
    document.getElementById('sidebarClose').classList.add('hidden');
    document.getElementById('sidebarOpen').classList.remove('hidden');
};

function closeContent(){
    contentContainer.classList.add('hidden');
};

function showContent(target){

    for(let i = 0; i < sidebarLinks.length;i++){
        sidebarLinks[i].classList.remove('active');
    };

    setContentSize();

    // HIDE ALL CONTENT DIVS
    for(let i = 0; i < contentWrapper.children.length; i++){
        contentWrapper.children[i].classList.add('hidden');
    }

    // CREATE TARGET CONTENT NAME
    let contentDivName ='content' + target.getAttribute('value');
    let contentDiv = document.getElementById(contentDivName);

    // SHOW CONTENT
    contentContainer.classList.remove('hidden');
    contentDiv.classList.remove('hidden');
};

function setContentSize(){
    // GET OFFSET AND WIDTH FOR CONTENT CONTAINER
    let contentDivOffset = document.getElementById('sidebarContainer').offsetWidth;
    let contentDivWidth = window.innerWidth - contentDivOffset;

    // SET OFFSET AND WIDTH
    contentContainer.style.left = contentDivOffset + 'px';
    contentContainer.style.width = contentDivWidth + 'px';
}
