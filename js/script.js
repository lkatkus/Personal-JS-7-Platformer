// VARIABLES
// MAIN WORLD PARAMETERS
var WORLD_COLS;
var WORLD_ROWS;

var TILE_SIZE;
var TILES_PER_ROW = 10; /* CONTROLS NUMBER OF ROWS DISPLAYED ON SCREEN */

// MAIN PLAYER VARIABLES
var player;
var playerCurrentX;
var playerCurrentY;

var playerMaxSpeedX;
var playerMaxSpeedY;

// PLAYER SPRITE SHEET SETUP
var spriteSheetWidth = 900;
var spriteSheetHeight = 800;
var rows = 4;
var cols = 9;

// PLAYER SPRITE LAYOUT IN SPRITE SHEET
var trackRight = 0; /* FOR MOVING RIGHT ANIMATION */
var trackLeft = 1; /* FOR MOVING LEFT ANIMATION */
var trackIdleRight = 2; /* FOR IDLE RIGHT ANIMATION */
var trackIdleLeft = 3; /* FOR IDLE LEFT ANIMATION */

// PLAYER SPRITE
var spriteWidth = 100;
var spriteHeight = 200;

// var spriteWidth = Number(spriteWidth/cols);
// var spriteHeight = Number(spriteHeight/rows);

var curFrame = 0;
var frameCount = 8;

var srcX = 0;
var srcY = 0;

// INTERVAL HANDLING VARIABLES
var myAnimationInterval;
var myAnimationRequest;

// CAMERA CONTROL VARIABLES
var camPanX = 0;
var camPanY = 0;

var screen = {
    visibleRowTop:0,
    visibleRowBottom:0,
    visibleColLeft:0,
    visibleColRight:0
};

// HELPER VARIABLES
var tile = {
    row : 0,
    col : 0,
    type : 0
};

var informationDisplay = {
    intro : false,
    about : false,
    portfolio : false,
    git : false,
    other : false,
    clients : false,
    contact : false
};

var jokes = [
    'Why arent koalas actual bears?... They dont meet the koalafications.',
    'How do trees get online?... They just log in.',
    'Why did the computer show up at work late?... It had a hard drive.',
    'Why was the cell phone wearing glasses?... Because it lost its contacts.',
    'What do you call a cow with a twitch?... Beef jerky.',
    'What do you call an alligator with a vest?... An investigator.',
    'I tried to sue the airport for misplacing my luggage... I lost my case.',
    'A gird told me, that she wanted to see my python... I only knew javascript.',
    'What do you call a dog that does magic tricks?... A labracadabrador.',
    'Two windmills are standing in a field and one asks the other, “What kind of music do you like?” – The other says... “I’m a big metal fan.”',
    'My girlfriend and I often laugh about how competitive we are… But I laugh more.',
    'My friend asked me to help him round up his 37 sheep... I said "40".'
];

// MAIN START FUNCTION
function init(){

    // SELECTORS
    var canvas = document.getElementById('sceneCanvas');
    var ctx = canvas.getContext('2d');

    var frameIndicator = document.getElementById('currentFrame');
    var timeIndicator = document.getElementById('currentTime');

    // GAME SETUP
    const FPS = 30;
    var currentFrame = 0;

    // SCENE LAYOUT
    var sceneLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 'f', 'f', 0, 0, 0, 0, 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 'f', 'f', 'f', 'f', 0, 0, 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 4, 4, 0, 0, 'a', 'a', 'a', 'a', 'a', 4, 4, 4, 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 'c', 0, 'f', 'f', 'f', 'f', 0, 'a', 'a', 5, 5, 'a', 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 'f', 'f', 'f', 'f', 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'c', 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'b', 3, 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 4, 0, 0, 0, 'b', 'b', 'b', 'b', 'b', 'b', 'b', 0, 'a', 'a', 5, 5, 'a', 4, 4, 4, 4, 4, 4, 7, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'b', 3, 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 4, 0, 0, 0, 'b', 'b', 'b', 'b', 'b', 'b', 'b', 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 'a', 'a', 2, 2, 2, 2, 2, 2, 5, 5, 4, 7, 5, 5, 5, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 2, 2, 2, 2, 4, 4, 4, 4, 7, 7, 7, 7, 7, 0, 3, 0, 0, 0, 'f', 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 5, 7, 0, 3, 0, 0, 'f', 'f', 'f', 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 5, 7, 0, 3, 0, 'f', 'f', 'f', 'f', 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 4, 4, 4, 4, 4, 7, 5, 5, 5, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 7, 7, 7, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 7, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 'a', 5, 5, 'a', 4, 5, 5, 5, 5, 4, 7, 5, 5, 7, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 8, 8, 4, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 8, 8, 0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 4, 4, 6, 4, 4, 4, 4, 6, 6, 6, 4, 6, 6, 6, 4, 4, 8, 0, 0, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 0, 0, 2, 3, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 8, 8, 4, 5, 4, 4, 4, 4, 5, 5, 5, 4, 5, 5, 5, 4, 8, 8, 8, 0, 0, 0, 3, 8, 2, 2, 8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 8, 4, 4, 6, 4, 4, 7, 4, 6, 6, 6, 4, 6, 6, 6, 4, 4, 8, 8, 8, 0, 8, 3, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 9, 7, 7, 7, 7, 7, 8, 8, 4, 4, 4, 4, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 3, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 'f', 'f', 'f', 'f', 'f', 0, 0, 'f', 'f', 'f', 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 00]
    ];

    setWorldSize();

    var playerMaxSpeedX = Math.floor(TILE_SIZE / 7);
    var playerMaxSpeedY = Math.floor(TILE_SIZE / 2);

    function drawScene(){
        ctx.fillStyle = "black";
        for(let i = screen.visibleRowTop; i < screen.visibleRowBottom; i++){
            for(let j = screen.visibleColLeft; j < screen.visibleColRight; j++){
                // PATH
                if(sceneLayout[i][j] == 1){
                    ctx.fillStyle = '#324D5C';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // GROUND
                if(sceneLayout[i][j] == 2){
                    ctx.fillStyle = '#846749';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // LADDERS
                if(sceneLayout[i][j] == 3){
                    ctx.fillStyle = '#c9805c';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);

                    // let tile = new Image();
                    // tile.src = 'img/test.png';
                    // ctx.drawImage(tile, j*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }

                // HOUSE
                if(sceneLayout[i][j] == 4){
                    ctx.fillStyle = '#b4b8b8';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // WINDOWS
                if(sceneLayout[i][j] == 5){
                    ctx.fillStyle = '#506673';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // BALCONY
                if(sceneLayout[i][j] == 6){
                    ctx.fillStyle = '#6f6a6a';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // RED
                if(sceneLayout[i][j] == 7){
                    ctx.fillStyle = '#b3534e';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // GREEN
                if(sceneLayout[i][j] == 8){
                    ctx.fillStyle = '#72af61';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // LIGHT GREY
                if(sceneLayout[i][j] == 'a'){
                    ctx.fillStyle = '#cecbce';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // BLUE
                if(sceneLayout[i][j] == 'b'){
                    ctx.fillStyle = '#1a40a1';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // YELLOW
                if(sceneLayout[i][j] == 'c'){
                    ctx.fillStyle = '#fde352';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // WHITE
                if(sceneLayout[i][j] == 'f'){
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }
            }
        }
    }

    function cameraFollow() {
        camPanX = player.x - canvas.width / 2;

        if(!player.jumping || !player.falling){
            camPanY = player.y - canvas.height / 5 * 4;
        }

        var cameraFocusCenterY = Math.floor(camPanY + canvas.height / 4 * 3);
        var playerDistFromCameraFocusY = Math.floor(player.y - cameraFocusCenterY);

        // console.log(cameraFocusCenterY + ' ' + playerDistFromCameraFocusY + ' ' + player.y);
        //
        // if(playerDistFromCameraFocusY > 100){
        //     camPanY += player.speedY;
        //     console.log('1');
        // }else if(playerDistFromCameraFocusY < 0){
        //     camPanY -= player.speedY;
        //     console.log('2');
        // }else if(playerDistFromCameraFocusY == 0){
        //     camPanY = player.y;
        // }
    }

    function checkVisibleTiles() {

        var colsThatFitOnScreen = Math.floor(canvas.width / TILE_SIZE);
        var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_SIZE);

        var cameraLeftMostCol = Math.floor(camPanX / TILE_SIZE);
        if(cameraLeftMostCol < 0){
            cameraLeftMostCol = 0;
        }
        var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
        if(cameraRightMostCol > sceneLayout[0].length){
            cameraRightMostCol = sceneLayout[0].length;
        }

        var cameraTopMostRow = Math.floor(camPanY / TILE_SIZE);
        if(cameraTopMostRow < 0){
            cameraTopMostRow = 0;
        }

        var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 2;
        if(cameraBottomMostRow > sceneLayout.length){
            cameraBottomMostRow = sceneLayout.length;
        }

        screen.visibleColLeft = cameraLeftMostCol;
        screen.visibleColRight = cameraRightMostCol;

        screen.visibleRowTop = cameraTopMostRow;
        screen.visibleRowBottom = cameraBottomMostRow;
    }

    // PLAYER OBJECT
    function PlayerObj(){
        // APPEARANCE
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;

        // POSITION
        this.x = 0;
        this.y = 0;

        // GRID COORDINATES
        this.playerCol;
        this.playerRow;

        // PLACEHOLDERS FOR CHECKING TILE TYPES AROUND PLAYER
        this.tileCurrentPlayerPositionType;
        this.tileBelowPlayerPositionType;

        // MOVEMENT SPEED
        this.speedX = 1;
        this.speedY = 10;
        this.jumpHeight = TILE_SIZE * 3;

        // LEFT / RIGHT MOVEMENT
        this.left = false;
        this.right = false;
        this.previousDirection = 'right'; /* HELPER FOR IDLE ANIMATION DIRECTION */

        // MOVEMENT STATUS
        this.grounded = true;
        this.jumping = false;
        this.falling = false;
        this.climbing = false;

        this.canClimbUp = false;
        this.canClimbDown = false;

        this.playerImg = new Image();
    }

    // PLAYER OBJECT - MOVEMENT FUNCTION
    PlayerObj.prototype.move = function(){

        // MOVING LEFT
        if(this.left){
            let nextX = this.x;
            this.x -= this.speedX;

            if(returnTileGridStatus(this.x - 1, this.y - 1) || returnTileGridStatus(this.x - 1,this.y - TILE_SIZE)){
                this.x = nextX;
            }else{

                // ACCELERATION
                if(this.speedX < playerMaxSpeedX){
                    this.speedX++;
                }

                // CHECK BOTTOM TYLE
                if(!this.jumping){
                    if(returnTileGridStatus(this.x,this.y) || returnTileGridStatus(this.x + TILE_SIZE, this.y)){
                        this.falling = false;
                        this.grounded = true;
                    }else{
                        this.falling = true;
                    }
                }
            }

        // MOVING RIGHT
        }else if(this.right){
            let nextX = this.x;
            this.x += this.speedX;

            if(returnTileGridStatus(this.x + this.width,this.y - 1) || returnTileGridStatus(this.x + this.width,this.y - TILE_SIZE)){
                this.x = nextX;
            }else{

                // ACCELERATION
                if(this.speedX < playerMaxSpeedX){
                    this.speedX++;
                }

                // CHECK BOTTOM TYLE
                if(!this.jumping){
                    if(returnTileGridStatus(this.x, this.y) || returnTileGridStatus(this.x + TILE_SIZE, this.y)){
                        this.falling = false;
                        this.grounded = true;
                    }else{
                        this.falling = true;
                    }
                }
            }
        }

        // FOR JUMPING
        if(this.jumping && !this.grounded && !this.canClimb){

            // INITIAL JUMP
            if(playerCurrentY - this.jumpHeight <= this.y && this.jumping && !this.falling){

                // ACCELERATION
                if(this.speedY > 1){
                    this.speedY--;
                }else{
                    this.speedY = 1;
                }
                this.y -= this.speedY;

                // CHECKING TILE ABOVE PLAYER IS EMPTY
                if(returnTileGridStatus(this.x,this.y-this.height) || returnTileGridStatus(this.x + this.width - 1,this.y - this.height)){
                        this.falling = true;
                        this.jumping = false;
                        this.y = this.y;
                }

                // CHECK IF MAX JUMP HEIGHT IS REACHED
                if(playerCurrentY - this.jumpHeight >= this.y){
                    this.falling = true;
                    this.jumping = false;
                }
            }
        }

        // WHEN PLAYER IS FALLING
        if(this.falling){
            let nextY = this.y;
            this.y += this.speedY;

            // CHECK TILE BELOW PLAYER
            if(returnTileGridStatus(this.x,this.y) || returnTileGridStatus(this.x + TILE_SIZE - 1,this.y)){
                    this.jumping = false;
                    this.falling = false;
                    this.grounded = true;
                    this.speedY = 10;

                    // IF NEXT POSITION IS TAKEN. SET PLAYER POSITION TO PREVIOUS
                    this.y = (this.playerRow + 2) * TILE_SIZE;

            }else{
                // ACCELERATION
                if(this.speedY < playerMaxSpeedY){
                    this.speedY++;
                }else{
                    this.speedY = playerMaxSpeedY;
                }
            }
        }

        // FOR CLIMBING
        if(this.climbing && this.canClimbUp){
            this.y -= this.speedY;
        }
        if(this.climbing && this.canClimbDown){
            this.y -= this.speedY;
        }else{
            this.y = this.y;
        }
    }

    // PLAYER OBJECT - GET PLAYER CURRENT POSITION
    PlayerObj.prototype.checkPosition = function (){
        this.playerCol = Math.floor(this.x / TILE_SIZE);
        this.playerRow = Math.floor((this.y - TILE_SIZE) / TILE_SIZE);

        this.tileCurrentPlayerPositionType = sceneLayout[this.playerRow][this.playerCol];
        this.tileBelowPlayerPositionType = sceneLayout[this.playerRow + 1][this.playerCol];

        // INTERACTION BASED ON PLAYER LOCATION ON GRID
        if(this.playerCol >= 7 && this.playerCol < 12 && this.playerRow == 41){
            textPlaceholder = 'This place looks strange... ';
            displayText('intro');
        }else if(this.playerCol >= 14 && this.playerCol < 27 && this.playerRow == 41){
            textPlaceholder = 'About Leaffish alfonsino mahseer brook trout Colorado squawfish yellowfin croaker bonefish American sole silver driftfish pike eel. Greenling giant wels crocodile shark, temperate ocean-bass yellowbanded perch buffalofish North American freshwater catfish. Yellowfin grouper, deep sea bonefish blue whiting, pilot fish convict cichlid bluntnose minnow.';
            displayText('about');
        }else if(this.playerCol >= 35 && this.playerCol < 39 && this.playerRow == 35){
            textPlaceholder = 'Portfolio Leaffish alfonsino mahseer brook trout Colorado squawfish yellowfin croaker bonefish American sole silver driftfish pike eel. Greenling giant wels crocodile shark, temperate ocean-bass yellowbanded perch buffalofish North American freshwater catfish. Yellowfin grouper, deep sea bonefish blue whiting, pilot fish convict cichlid bluntnose minnow.';
            displayText('portfolio');
        }else if(this.playerCol >= 40 && this.playerCol < 44 && this.playerRow == 35){
            textPlaceholder = 'Git Leaffish alfonsino mahseer brook trout Colorado squawfish yellowfin croaker bonefish American sole silver driftfish pike eel. Greenling giant wels crocodile shark, temperate ocean-bass yellowbanded perch buffalofish North American freshwater catfish. Yellowfin grouper, deep sea bonefish blue whiting, pilot fish convict cichlid bluntnose minnow.';
            displayText('git');
        }else if(this.playerCol >= 46 && this.playerCol < 50 && this.playerRow == 35){
            textPlaceholder = 'Other Leaffish alfonsino mahseer brook trout Colorado squawfish yellowfin croaker bonefish American sole silver driftfish pike eel. Greenling giant wels crocodile shark, temperate ocean-bass yellowbanded perch buffalofish North American freshwater catfish. Yellowfin grouper, deep sea bonefish blue whiting, pilot fish convict cichlid bluntnose minnow.';
            displayText('other');
        }else if(this.playerCol >= 21 && this.playerCol < 27 && this.playerRow == 24){
            textPlaceholder = 'Sorry. We are still under construction. Come back later!'
            displayText('clients');
        }else if(this.playerCol >= 36 && this.playerCol < 50 && this.playerRow == 24){
            displayText('stuff');
        }else if(this.playerCol >= 8 && this.playerCol < 15 && this.playerRow == 6){
            textPlaceholder = 'Leaffish alfonsino mahseer brook trout Colorado squawfish yellowfin croaker bonefish American sole silver driftfish pike eel. Greenling giant wels crocodile shark, temperate ocean-bass yellowbanded perch buffalofish North American freshwater catfish. Yellowfin grouper, deep sea bonefish blue whiting, pilot fish convict cichlid bluntnose minnow.';
            displayText('contact');
        }else{
            // HIDING TEXTBOX
            document.getElementById('textBoxContainer').classList.add('hidden');

            // RESETING VISIBILITY STATUS IF AWAY FROM INTERACTION POINT
            for(var section in informationDisplay){
                informationDisplay[section] = false;

                // HIDING TEXTBOX BUTTONS IF THEY EXIST FOR SECTION
                if(document.getElementById(section + 'Button')){
                    document.getElementById(section + 'Button').classList.add('hidden');
                };
            };
        }

        // FOR CLIMBING MOVEMENT
        if(sceneLayout[this.playerRow][this.playerCol] != 3 && sceneLayout[this.playerRow + 1][this.playerCol] == 3){
            this.canClimbDown = true;
        }else if(sceneLayout[this.playerRow][this.playerCol] == 3 && sceneLayout[this.playerRow + 1][this.playerCol] != 3){
            this.canClimbUp = true;
        }else if(sceneLayout[this.playerRow][this.playerCol] == 3 && sceneLayout[this.playerRow + 1][this.playerCol] == 3){
            this.canClimbDown = true;
            this.canClimbUp = true;
        }else{
            this.canClimbDown = false;
            this.canClimbUp = false;
        }

        // DEBUGGING
        // document.getElementById('playerCol').innerHTML = this.playerCol;
        // document.getElementById('playerRow').innerHTML = this.playerRow;
        // document.getElementById('climbing').innerHTML = this.climbing;
        // document.getElementById('climbup').innerHTML = this.canClimbUp;
        // document.getElementById('climbdown').innerHTML = this.canClimbDown;
        // document.getElementById('jumping').innerHTML = this.jumping;
        // document.getElementById('speedx').innerHTML = this.speedX;
        // document.getElementById('speedy').innerHTML = this.speedY;
        // document.getElementById('moveLeft').innerHTML = this.left;
        // document.getElementById('moveRight').innerHTML = this.right;
    }

    // PLAYER OBJECT - DRAW
    PlayerObj.prototype.draw = function(){
        this.playerImg.src = 'img/playerSpriteSheet.png';

        srcX = curFrame * spriteWidth;

        let x = canvas.width / 2;
        let y = this.y-this.height * 2 - camPanY;

        if(this.right){
            srcY = trackRight * spriteHeight;
            ctx.drawImage(this.playerImg,srcX,srcY,spriteWidth,spriteHeight,x,y,TILE_SIZE,TILE_SIZE * 2);
        }else if(this.left){
            srcY = trackLeft * spriteHeight;
            ctx.drawImage(this.playerImg,srcX,srcY,spriteWidth,spriteHeight,x,y,TILE_SIZE,TILE_SIZE * 2);
        }else{
            if(player.previousDirection == 'right'){
                srcY = trackIdleRight * spriteHeight;
                ctx.drawImage(this.playerImg,srcX,srcY,spriteWidth,spriteHeight,x,y,TILE_SIZE,TILE_SIZE * 2);
            }else{
                srcY = trackIdleLeft * spriteHeight;
                ctx.drawImage(this.playerImg,srcX,srcY,spriteWidth,spriteHeight,x,y,TILE_SIZE,TILE_SIZE * 2);
            }
        }
    }

    function mainMove(){
        player.checkPosition();
        player.move();
        cameraFollow();
    }

    function mainDraw(){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(-camPanX, -camPanY);
        drawScene();
        ctx.restore();
        player.draw();
    }

    function animate(){
        setInterval(function() {
            mainMove();
            checkVisibleTiles();
            mainDraw();
        }, 1000/FPS);

        setInterval(function(){
            curFrame = ++curFrame % frameCount;
        }, 100);
    }

    // CREATE NEW PLAYER OBJECT
    player = new PlayerObj();
    calculateSpawnLocation();
    camPanY = player.y - canvas.height / 2;

    // START ANIMATION
    animate();

    // PLAYER CONTROLS
    document.addEventListener('keydown',function(event){
        if(event.key == 'ArrowLeft'){
            player.left = true;
        }
        if(event.key == 'ArrowRight'){
            player.right = true;
        }
        if(event.key == 'ArrowUp'){
            if(!player.jumping && player.grounded && !player.canClimbUp){
                playerCurrentY = player.y;
                player.jumping = true;
                player.grounded = false;
                player.speedY = playerMaxSpeedY;
            }
            if(player.canClimbUp){
                player.climbing = true;
                player.speedY = Math.floor(TILE_SIZE / 10);
            }
        }
        if(event.key == 'ArrowDown'){
            if(player.canClimbDown){
                player.climbing = true;
                player.speedY = Math.floor(-TILE_SIZE / 10);
            }
        }
        if(event.key == 0){
            // console.log(player);
            // setGameSize();
            // checkVisibleTiles();
            // console.log(tile);
            // console.log(informationDisplay);
        }
    });

    document.addEventListener('keyup',function(event){
        if(event.key == 'ArrowLeft'){
            player.left = false;
            player.previousDirection = 'left';
            player.speedX = 1;
        }
        if(event.key == 'ArrowRight'){
            player.right = false;
            player.speedX = 1;
            player.previousDirection = 'right';
        }
        if(event.key == 'ArrowUp'){
            player.climbing = false;
        }
        if(event.key == 'ArrowDown'){
            player.climbing = false;
        }
    });

    // HELPERS

    window.addEventListener('resize', function(){
        // setWorldSize();
        console.log('resize');
    });

    // SETUP CANVAS SIZE
    function setWorldSize(){
        // WORLD SIZE PARAMETERS
        WORLD_COLS = sceneLayout[0].length;
        WORLD_ROWS = sceneLayout.length;

        // CANVAS SETUP
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if(canvas.width / canvas.height < 1){
            TILE_SIZE = Math.ceil(canvas.width / TILES_PER_ROW);
        }else{
            TILE_SIZE = Math.ceil(canvas.height / TILES_PER_ROW);
        }
    }

    // CALCULATE PLAYER START POSITION
    function calculateSpawnLocation(){
        for(let i = 0; i < sceneLayout.length; i++){
            for(let j = 0; j < sceneLayout[i].length; j++){
                if(sceneLayout[i][j] == 9){
                    player.y = (i + 1) * TILE_SIZE;
                    player.x = j * TILE_SIZE;
                    break;
                }
            }
        }
    }

    function returnTileGridStatus(x, y){
        // CONVERT TO GRID POSITION
        let gridRow = Math.floor(y / TILE_SIZE);
        let gridCol = Math.floor(x / TILE_SIZE);

        // SET TOUCHED INFO
        if(player.jumping){
            tile.row = gridRow;
            tile.col = gridCol;
            tile.type = sceneLayout[gridRow][gridCol];
        }

        // CHECK IF TILE IS FREE (false) OR TAKEN (true)
        if(sceneLayout[gridRow][gridCol] != 1){
            return false;
        }else{
            return true;
        }
    }

    // FOR TYPING TEXT IN TEXT BOX

    var textPlaceholder; /* TEXT PLACEHOLDER FOR TEXT BOX*/
    var displayedChar; /* DISPLAYED CHARACTER COUNTER FOR TYPING SIMULATION */

    function displayText(id){
        // DISPLAY TEXTBOX CONTAINER
        document.getElementById('textBoxContainer').classList.remove('hidden');

        // CHECK IF INFORMATION IS NOT ALREADY DISPLAYING
        if(!informationDisplay[id]){

            if(id == 'stuff'){
                let jokeNr = Math.floor(Math.random() * jokes.length);
                textPlaceholder = jokes[jokeNr];
            }

            // SET TRUE WHEN DISPLAYING
            informationDisplay[id] = true;

            // CLEAR TEXTBOX CONTAINER
            document.getElementById('textContainer').innerHTML = '';

            // RESET STARTING CHARACTER COUNTER
            displayedChar = 0;

            // DISPLAY BUTTON IF IT EXISTS FOR SECTION
            if(document.getElementById(id + 'Button')){
                document.getElementById(id + 'Button').classList.remove('hidden');
            };

            typeText();
        }
    }

    function typeText(){
        if(displayedChar < textPlaceholder.length){
            document.getElementById('textContainer').innerHTML += textPlaceholder.charAt(displayedChar);
            displayedChar++;
            setTimeout(typeText, 30);
        }
    }

}
