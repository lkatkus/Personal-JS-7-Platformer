function setCarousel(){

    var carousel2 = new Carousel('carousel2');

};

function Carousel(name){

    // CAROUSEL SELECTOR
    this.carousel = document.getElementById(name);
    this.carouselViewport = this.carousel.querySelector(".carousel-viewport");
    this.carouselContainer = this.carouselViewport.querySelector(".carousel-item-container");

    this.itemCurrentActive = 0;
    this.itemNextActive = 0;

    // SETUP BUTTONS
    // BUTTON SELECTORS
    this.btnPrevious = this.carousel.querySelector(".slider-previous");
    this.btnNext = this.carousel.querySelector(".slider-next");

    // BUTTON EVENT LISTENER
    this.btnPrevious.addEventListener("click", this.previous);
    this.btnNext.addEventListener("click", this.next);

    // GET ELEMENTS IN CONTAINER
    // this.carouselItems = carouselContainer.querySelectorAll(".carousel-item");
}

Carousel.prototype.previous = function(){

    console.log('previous');

    // FIND CURRENT ACTIVE
    for(var i = 0, j = this.carouselItems.length; i < j; i++){
        if(this.carouselItems[i] == this.carouselContainer.querySelector(".carousel-item.active")){
            this.itemCurrentActive = i;
            break;
        }
    }

    // FIND NEXT ACTIVE
    if(this.itemCurrentActive == 0){
        this.itemNextActive = this.carouselItems.length-1;
    }else{
        this.itemNextActive = this.itemCurrentActive - 1;
    }

    // APPLY CLASS
    this.carouselItems[this.itemCurrentActive].classList.remove("active");
    this.carouselItems[this.itemNextActive].classList.add("active");

    this.center(this.itemNextActive);
}

Carousel.prototype.next = function(){

    console.log('next');

    // FIND CURRENT ACTIVE
    for(var i = 0, j = this.carouselItems.length; i < j; i++){
        if(this.carouselItems[i] == this.carouselContainer.querySelector(".carousel-item.active")){
            this.itemCurrentActive = i;
            break;
        }
    }

    // FIND NEXT ACTIVE
    if(this.itemCurrentActive == this.carouselItems.length-1){
        this.itemNextActive = 0;
    }else{
        this.itemNextActive = this.itemCurrentActive + 1;
    }

    // APPLY CLASS
    this.carouselItems[this.itemCurrentActive].classList.remove("active");
    this.carouselItems[this.itemNextActive].classList.add("active");

    this.center(this.itemNextActive);
}


function startCarousel(){

    // CAROUSEL SELECTOR
    var carousel = document.getElementById("carousel");
    var carouselViewport = document.getElementById("carousel-viewport");
    var carouselContainer = document.getElementById("carousel-item-container");

    // BUTTON SELECTORS
    var btnPrevious = document.getElementById("slider-previous");
    var btnNext = document.getElementById("slider-next");

    var itemCurrentActive = 0;
    var itemNextActive = 0;

    // BUTTON EVENT LISTENER
    btnPrevious.addEventListener("click", previous);
    btnNext.addEventListener("click", next);

    function previous(){
        // GET ELEMENTS IN CONTAINER
        let carouselItems = carouselContainer.querySelectorAll(".carousel-item");

        // FIND CURRENT ACTIVE
        for(var i = 0, j = carouselItems.length; i < j; i++){
            if(carouselItems[i] == carouselContainer.querySelector(".carousel-item.active")){
                itemCurrentActive = i;
                break;
            }
        }

        // FIND NEXT ACTIVE
        if(itemCurrentActive == 0){
            itemNextActive = carouselItems.length-1;
        }else{
            itemNextActive = itemCurrentActive - 1;
        }

        // APPLY CLASS
        carouselItems[itemCurrentActive].classList.remove("active");
        carouselItems[itemNextActive].classList.add("active");
        checkAspectRation();

        center(itemNextActive);
    }

    function next(){
        // GET ELEMENTS IN CONTAINER
        let carouselItems = carouselContainer.querySelectorAll(".carousel-item");

        // FIND CURRENT ACTIVE
        for(var i = 0, j = carouselItems.length; i < j; i++){
            if(carouselItems[i] == carouselContainer.querySelector(".carousel-item.active")){
                itemCurrentActive = i;
                break;
            }
        }

        // FIND NEXT ACTIVE
        if(itemCurrentActive == carouselItems.length-1){
            itemNextActive = 0;
        }else{
            itemNextActive = itemCurrentActive + 1;
        }

        // APPLY CLASS
        carouselItems[itemCurrentActive].classList.remove("active");
        carouselItems[itemNextActive].classList.add("active");
        checkAspectRation();

        center(itemNextActive);
    }

    function center(active){
        // GET ELEMENTS IN CONTAINER
        let carouselItems = carouselContainer.querySelectorAll(".carousel-item");

        // FIND ACTIVE OFFSET
        let itemOffset = carouselItems[active].offsetLeft;

        // OFFSET ACTIVE
        carouselContainer.style.left = -itemOffset + "px";
    }

    function checkAspectRation(){
        // VIEWPORT ASPECT RATIO
        let viewportAspect = ((carouselContainer.getBoundingClientRect()).width) / ((carouselContainer.getBoundingClientRect()).height);

        // IMAGE ASPECT RATIO
            // GET ACTIVE IMAGE
            let activeImg = document.querySelector(".carousel-item.active > img");

            // GET IMAGE ASPECT RATIO
            let imgAspect = ((activeImg.getBoundingClientRect()).width) / ((activeImg.getBoundingClientRect()).height);

        // APPLY PORTRAIT OR LANDSCAPE MODE
        if(imgAspect > viewportAspect){
            activeImg.classList.remove("imgLandscape");
            activeImg.classList.add("imgPortrait");
        }else{
            activeImg.classList.remove("imgPortrait");
            activeImg.classList.add("imgLandscape");
        }

    }

    // GLOBAL LISTENER
    window.addEventListener('resize', function(){
        center(itemNextActive);
        checkAspectRation();
    });

    checkAspectRation();

}
