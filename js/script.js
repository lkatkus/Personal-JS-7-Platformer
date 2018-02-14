var player;

function init(){
    // VARIABLES
    // SELECTORS
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var frameIndicator = document.getElementById('currentFrame');
    var timeIndicator = document.getElementById('currentTime');

    // GAME SETUP
    const FPS = 30;
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
        this.speedX = 5;
        this.speedY = 5;

        this.left = false;
        this.right = false;
        this.jumping = false;

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
            console.log('right');
            this.x += this.speedX;
            this.right = false;
        }else if(this.left){
            console.log('left');
            this.x -= this.speedX;
            this.left = false;
        }
        if(this.jumping){
            console.log('jump');
            this.jumping = false;
        }
    }

    PlayerObj.prototype.jump = function(){

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
            player.left = false;
            player.move();
            player.draw();
        }

        if(event.key == 'ArrowLeft'){
            player.right = false;
            player.left = true;
            player.move();
            player.draw();
        }

        if(event.key == 'ArrowUp'){
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







    animate();








}
