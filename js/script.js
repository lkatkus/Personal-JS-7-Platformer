var player;
var playerCurrentX;
var playerCurrentY;

var viewport = {
    offsetX : 0,
    offsetY : 0
};

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

    var camPanX = 0;
    var camPanY = 0;

    // const playerDistanceBeforePanX = 100;
    // const playerDistanceBeforePanY = 100;

    // LEVEL LAYOUT
    var levelLayout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // WORLD SIZE PARAMETERS
    const TILE_SIZE = 40;
    const WORLD_COLS = levelLayout[0].length;
    const WORLD_ROWS = levelLayout.length;

    // CANVAS SETUP
    canvas.width = 600;

    // canvas.width = TILE_SIZE * WORLD_COLS;
    canvas.height = TILE_SIZE * WORLD_ROWS;

    function makeWorld(){
        ctx.fillStyle = "black";
        for(let i = 0; i < levelLayout.length; i++){
            for(let j = 0; j < levelLayout[i].length; j++){
                if(levelLayout[i][j] == 1){
                    ctx.fillRect(j*TILE_SIZE - viewport.offsetX,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                    // if(i == 8 && j == 4){
                    //     console.log(j*TILE_SIZE - viewport.offsetX);
                    // }
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
        this.x = 40;
        this.y = 400;

        // GRID COORDINATES
        this.playerCol;
        this.playerRow;

        // MOVEMENT SPEED
        this.speedX = 40;
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
            if(returnTileGridStatus(this.x - 1, this.y - 1) || returnTileGridStatus(this.x - 1,this.y - TILE_SIZE)){
                this.x = this.x;
            }else{
                this.x -= this.speedX;
                viewport.offsetX -= this.speedX;

                // CHECK BOTTOM
                if(!this.jumping){
                    if(returnTileGridStatus(this.x,this.y)){
                        this.falling = false;
                        this.grounded = true;
                    }else{
                        this.falling = true;
                    }
                }
            }

        // MOVING RIGHT
        }else if(this.right){
            if(returnTileGridStatus(this.x + TILE_SIZE + 1,this.y - 1) || returnTileGridStatus(this.x + TILE_SIZE + 1,this.y - TILE_SIZE)){
                this.x = this.x;
            }else{
                // this.x += this.speedX;
                viewport.offsetX += this.speedX;

                // CHECK BOTTOM
                if(!this.jumping){
                    if(returnTileGridStatus(this.x,this.y)){
                        this.falling = false;
                        this.grounded = true;
                    }else{
                        this.falling = true;
                    }
                }
            }
        }

        // FOR JUMPING
        if(this.jumping && !this.grounded){

            // INITIAL JUMP
            if(playerCurrentY - this.jumpHeight <= this.y && this.jumping && !this.falling){
                this.y -= this.speedY;

                // CHECKING TILE ABOVE PLAYER
                if(returnTileGridStatus(this.x + viewport.offsetX,this.y-TILE_SIZE) || returnTileGridStatus(this.x + TILE_SIZE - 1,this.y - TILE_SIZE)){
                        this.falling = true;
                        this.jumping = false;
                }

                // CHECK WHEN MAX JUMP HEIGHT IS REACHED
                if(playerCurrentY - this.jumpHeight == this.y){
                    this.falling = true;
                    this.jumping = false;
                }
            }
        }

        if(this.falling){
            // CHECK TILE BELOW PLAYER
            if(returnTileGridStatus(this.x,this.y) || returnTileGridStatus(this.x + TILE_SIZE - 1,this.y)){
                    this.jumping = false;
                    this.falling = false;
                    this.grounded = true;
            }else{
                this.y += this.speedY;
            }
        }
    }

    function returnTileGridStatus(x, y){
        // CONVERT TO GRID POSITION
        let gridCol = Math.floor(x / TILE_SIZE);
        let gridRow = Math.floor(y / TILE_SIZE);

        // CHECK IF TILE IS FREE (false) OR TAKEN (true)
        if(levelLayout[gridRow][gridCol] == 0){
            return false;
        }else{
            return true;
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
        makeWorld();
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
        currentFrame++;
        frameIndicator.innerHTML = 'Frames since start ' + currentFrame;
        timeIndicator.innerHTML = 'Total time ' + Math.floor(currentFrame / FPS);

        player.update();
    }

    // PLAYER CONTROLS
    document.addEventListener('keyup',function(event){
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
            if(!player.jumping && player.grounded){
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
            console.log(player.x + ' ' + player.y);

            console.log(viewport);

            // console.log('grounded ' + player.grounded);
            // console.log('jumping ' + player.jumping);
            // console.log('falling ' + player.falling);
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
