var player;
var playerCurrentX;
var playerCurrentY;

function init(){
    // VARIABLES
    // SELECTORS
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var frameIndicator = document.getElementById('currentFrame');
    var timeIndicator = document.getElementById('currentTime');

    // GAME SETUP
    const FPS = 60;
    var currentFrame = 0;

    var actualInnerWidth = document.body.clientWidth;
    var actualInnerHeight = document.body.clientHeight;
    // var actualInnerWidth = document.body.scrollWidth;

    canvas.width = actualInnerWidth - 50;
    canvas.height = actualInnerHeight - 50;

    var myAnimationInterval;
    var myAnimationRequest;

    var mainArr = [];


    // PLAYER OBJECT
    function PlayerObj(){
        // APPEARANCE
        this.width = 40;
        this.height = 40;

        // POSITION
        this.x = 10;
        this.y = canvas.height;

        // MOVEMENT
        this.speedX = 20;
        this.speedY = 20;

        this.left = false;
        this.right = false;
        this.jumping = false;
        this.landing = true;

        this.jumpHeight = 100;

        this.playerImg = new Image();

    }

    PlayerObj.prototype.make = function(){
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, this.width, this.height);
        this.playerImg = ctx.getImageData(0, 0, this.width, this.height);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    PlayerObj.prototype.draw = function(x,y){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(this.playerImg, this.x, this.y-this.height);
    }

    PlayerObj.prototype.move = function(){

        if(this.right){
            this.x += this.speedX;
        }else if(this.left){
            this.x -= this.speedX;
        }
        if(this.jumping){
            if(playerCurrentY - this.jumpHeight <= this.y && this.landing){
                this.y -= this.speedY;
                if(playerCurrentY - this.jumpHeight == this.y){
                    this.landing = false;
                }
            }else{
                this.y += this.speedY;
                if(playerCurrentY == this.y){
                    this.jumping = false;
                    this.landing = true;
                }
            }
        }
    }

    PlayerObj.prototype.update = function(){
        player.move();
        player.draw();
    }

    player = new PlayerObj();

    player.make();


    function animate(){
        myAnimationInterval = setTimeout(
            function(){
                myAnimationRequest = requestAnimationFrame(animate);
            },
        1000/FPS);

        // TIME UTILITIES
        // currentFrame++;
        // frameIndicator.innerHTML = 'Frames since start ' + currentFrame;
        // timeIndicator.innerHTML = 'Total time ' + Math.floor(currentFrame / FPS);

        player.update();
    }

    // PLAYER CONTROLS
    document.addEventListener('keydown',function(event){
        if(event.key == 'ArrowRight'){
            player.right = true;
            player.move();
            player.draw();
        }

        if(event.key == 'ArrowLeft'){
            player.left = true;
            player.move();
            player.draw();
        }

        if(event.key == 'ArrowUp'){
            playerCurrentY = player.y;
            player.jumping = true;
            player.move();
            player.draw();
        }
        if(event.key == 'ArrowDown'){
            console.log('down');
        }

        if(event.key == 0){
            console.log('zero');
        }
    });



    document.addEventListener('keyup',function(event){
        if(event.key == 'ArrowRight'){
            player.right = false;

        }

        if(event.key == 'ArrowLeft'){
            player.left = false;

        }

    });







    animate();








}
