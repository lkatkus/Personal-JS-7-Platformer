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

    // CANVAS SETUP
    canvas.width = 500;
    canvas.height = 500;

    // INTERVAL HANDLING
    var myAnimationInterval;
    var myAnimationRequest;

    var mainArr = []; /* PLACEHOLDER ARRAY */

    // PLAYER OBJECT
    function PlayerObj(){
        // APPEARANCE
        this.width = 40;
        this.height = 40;

        // POSITION
        this.x = 10;
        this.y = canvas.height;

        // MOVEMENT SPEED
        this.speedX = 20;
        this.speedY = 20;
        this.jumpHeight = 200;

        // LEFT - RIGHT
        this.left = false;
        this.right = false;

        // JUMPING
        this.jumping = false;
        this.falling = false;
        this.grounded = true;

        this.playerImg = new Image();
    }

    PlayerObj.prototype.make = function(){
        ctx.fillStyle = 'firebrick';
        ctx.fillRect(0, 0, this.width, this.height);
        this.playerImg = ctx.getImageData(0, 0, this.width, this.height);
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // PLAYER OBJECT - MOVEMENT FUNCTION
    PlayerObj.prototype.move = function(){
        // MOVING LEFT
        if(this.left){
            if(this.x < 0){
                this.x = 0;
            }else{
                this.x -= this.speedX;
            }
        // MOVING RIGHT
        }else if(this.right){
            if(this.x + this.width > canvas.width){
                this.x = canvas.width - this.width;
            }else{
                this.x += this.speedX;
            }
        }

        // FOR JUMPING
        if(this.jumping){
            if(playerCurrentY - this.jumpHeight <= this.y && this.jumping && !this.falling){
                this.y -= this.speedY;
                // CHECK WHEN MAX JUMP HEIGHT IS REACHED
                if(playerCurrentY - this.jumpHeight == this.y){
                    this.falling = true;
                }
            }else{
                this.y += this.speedY;
                if(canvas.height == this.y){
                    this.jumping = false;
                    this.falling = false;
                }
            }
        }
    }

    // PLAYER OBJECT - DRAW
    PlayerObj.prototype.draw = function(x,y){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(this.playerImg, this.x, this.y-this.height);
    }

    // PLAYER OBJECT - !!! UPDATE FUNCTION !!!
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
        currentFrame++;
        frameIndicator.innerHTML = 'Frames since start ' + currentFrame;
        timeIndicator.innerHTML = 'Total time ' + Math.floor(currentFrame / FPS);

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
            if(!player.jumping){
                playerCurrentY = player.y;
                player.jumping = true;
                player.grounded = false;
                player.move();
                player.draw();
            }else{
                console.log('already jumping');
            }
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
