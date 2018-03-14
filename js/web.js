window.addEventListener('load', function(){
    // GET ALL SIDEBAR LINKS
    var sidebarLinks = document.getElementsByClassName('sidebarLink');
    // ADD EVENT LISTENERS TO BUTTONS
    for(let i = 0; i < sidebarLinks.length;i++){
        sidebarLinks[i].addEventListener('click', function(){
            showContent(this);
        })
    };
});

function openNav(){
    document.getElementById('sidebar').classList.remove('hidden');
    document.getElementById('sidebarClose').classList.remove('hidden');
    document.getElementById('sidebarOpen').classList.add('hidden');
};

function closeNav(){
    document.getElementById('sidebar').classList.add('hidden');
    document.getElementById('sidebarClose').classList.add('hidden');
    document.getElementById('sidebarOpen').classList.remove('hidden');
};

function showContent(target){
    console.log(target.innerHTML);
};
