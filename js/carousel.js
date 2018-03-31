
var carousel1;
var carousel2;

function setCarousel(){
    carousel1 = new Carousel('carousel1');
    carousel2 = new Carousel('carousel2');
};

function Carousel(name){

    var that = this;
    this.name = name;

    // CAROUSEL SELECTOR
    this.carousel = document.getElementById(this.name);
    this.carouselViewport = this.carousel.querySelector(".carousel-viewport");
    this.carouselContainer = this.carouselViewport.querySelector(".carousel-item-container");

    this.itemCurrentActive = 0;
    this.itemNextActive = 0;

    // SETUP BUTTONS
    // BUTTON SELECTORS
    this.btnPrevious = this.carousel.querySelector(".slider-previous");
    this.btnNext = this.carousel.querySelector(".slider-next");

    // BUTTON EVENT LISTENER
    this.btnPrevious.addEventListener("click", previous);
    this.btnNext.addEventListener("click", next);

    // GET ELEMENTS IN CONTAINER
    this.carouselItems = this.carouselContainer.querySelectorAll(".carousel-item");

    function previous(){
        // FIND CURRENT ACTIVE
        for(var i = 0, j = that.carouselItems.length; i < j; i++){
            if(that.carouselItems[i] == that.carouselContainer.querySelector(".carousel-item.active")){
                that.itemCurrentActive = i;
                break;
            }
        }

        // FIND NEXT ACTIVE
        if(that.itemCurrentActive == 0){
            that.itemNextActive = that.carouselItems.length - 1;
        }else{
            that.itemNextActive = that.itemCurrentActive - 1;
        }

        // APPLY CLASS
        that.carouselItems[that.itemCurrentActive].classList.remove("active");
        that.carouselItems[that.itemNextActive].classList.add("active");

        center(that.itemNextActive);
    }

    function next(){

        // FIND CURRENT ACTIVE
        for(var i = 0, j = that.carouselItems.length; i < j; i++){
            if(that.carouselItems[i] == that.carouselContainer.querySelector(".carousel-item.active")){
                that.itemCurrentActive = i;
                break;
            }
        }

        // FIND NEXT ACTIVE
        if(that.itemCurrentActive == that.carouselItems.length-1){
            that.itemNextActive = 0;
        }else{
            that.itemNextActive = that.itemCurrentActive + 1;
        }

        // APPLY CLASS
        that.carouselItems[that.itemCurrentActive].classList.remove("active");
        that.carouselItems[that.itemNextActive].classList.add("active");

        center(that.itemNextActive);
    }

    function center(active){
        // FIND ACTIVE OFFSET
        let itemOffset = that.carouselItems[active].offsetLeft;

        // OFFSET ACTIVE
        that.carouselContainer.style.left = -itemOffset + "px";
    }

};
