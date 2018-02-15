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

    // WORLD SIZE PARAMETERS
    const TILE_SIZE = 40;
    const WORLD_COLS = 17;
    const WORLD_ROWS = 10;

    // CANVAS SETUP
    canvas.width = TILE_SIZE * WORLD_COLS;
    canvas.height = TILE_SIZE * WORLD_ROWS;

    // LEVEL LAYOUT
    var levelLayout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function makeWorld(){
        ctx.fillStyle = "black";
        for(let i = 0; i < levelLayout.length; i++){
            for(let j = 0; j < levelLayout[i].length; j++){
                if(levelLayout[i][j] == 1){
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }
            }
        }
    }

    // INTERVAL HANDLING
    var myAnimationInterval;
    var myAnimationRequest;

    var mainArr = []; /* PLACEHOLDER ARRAY */

    // PLAYER OBJECT
    function PlayerObj(){
        // APPEARANCE
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;

        // POSITION
        // ACTUAL COORDINATES
        this.x = 100;
        this.y = 200;

        // GRID COORDINATES
        this.playerCol;
        this.playerRow;

        // MOVEMENT SPEED
        this.speedX = 10;
        this.speedY = 10;
        this.jumpHeight = 200;

        // LEFT - RIGHT
        this.left = false;
        this.right = false;

        // JUMPING
        this.jumping = false;
        this.falling = true;
        this.grounded = false;

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
            if(levelLayout[this.playerRow][this.playerCol] == 1){
                this.x = this.x;
            }else{
                this.x -= this.speedX;

                // CHECK BOTTOM
                if(!this.jumping){
                    if(levelLayout[this.playerRow+1][this.playerCol] == 1){
                        this.falling = false;
                    }else{
                        this.falling = true;
                    }
                }
            }

        // MOVING RIGHT
        }else if(this.right){

            if(levelLayout[this.playerRow][this.playerCol+1] == 1){
                this.x = this.x;
            }else{
                this.x += this.speedX;
                // CHECK BOTTOM
                if(!this.jumping){
                    if(levelLayout[this.playerRow][this.playerCol] == 1){
                        this.falling = false;
                    }else{
                        this.falling = true;
                    }
                }
            }

        }

        // FOR JUMPING
        if(this.jumping && !this.grounded){
            if(playerCurrentY - this.jumpHeight <= this.y && this.jumping && !this.falling){
                this.y -= this.speedY;
                // CHECK WHEN MAX JUMP HEIGHT IS REACHED
                if(playerCurrentY - this.jumpHeight == this.y){
                    this.falling = true;
                    this.jumping = false;
                }
            }
        }

        if(this.falling){
            if(levelLayout[this.playerRow+1][this.playerCol] == 1){
                this.jumping = false;
                this.falling = false;
                this.grounded = true;
                this.y = this.y;
                console.log('grounded');
                console.log('jumping ' + player.jumping);
                console.log('falling ' + player.falling);
                console.log('falling ' + player.grounded);
            }else{
                this.y += this.speedY;
            }
        }
    }

    // PLAYER OBJECT - CHECK CURRENT POSITION
    PlayerObj.prototype.checkPosition = function (){
        this.playerCol = Math.floor(this.x / TILE_SIZE);
        this.playerRow = Math.floor((this.y - TILE_SIZE) / TILE_SIZE);

        document.getElementById('playerCol').innerHTML = this.playerCol;
        document.getElementById('playerRow').innerHTML = this.playerRow;
    }

    // PLAYER OBJECT - DRAW
    PlayerObj.prototype.draw = function(x,y){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(this.playerImg, this.x, this.y-this.height);
    }

    // PLAYER OBJECT - !!! UPDATE FUNCTION !!!
    PlayerObj.prototype.update = function(){
        player.checkPosition();
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

        // // TIME UTILITIES
        // currentFrame++;
        // frameIndicator.innerHTML = 'Frames since start ' + currentFrame;
        // timeIndicator.innerHTML = 'Total time ' + Math.floor(currentFrame / FPS);

        player.update();
        makeWorld();

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
            console.log('jumping ' + player.jumping);
            console.log('falling ' + player.falling);
            console.log('falling ' + player.grounded);

            if(!player.jumping && player.grounded){
                console.log('JUMPING');
                playerCurrentY = player.y;
                player.jumping = true;
                player.grounded = false;
                player.move();
                player.draw();
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


    // UTILITIES
    // MOUSE INFORMATION
    canvas.addEventListener('mousemove', function(event){
        // CURRENT MOUSE POSITION ON CANVAS
        let mouseX = event.clientX - this.offsetLeft;
        let mouseY = event.clientY - this.offsetTop;

        // CURRENT MOUSE POSITION ON GRID LAYOUT
        let mouseCol = Math.floor(mouseX / TILE_SIZE);
        let mouseRow = Math.floor(mouseY / TILE_SIZE);

        document.getElementById('mouseCol').innerHTML = mouseCol;
        document.getElementById('mouseRow').innerHTML = mouseRow;
    })

    animate();



}
