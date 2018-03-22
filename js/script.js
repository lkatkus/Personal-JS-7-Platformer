// VARIABLES
// MAIN WORLD PARAMETERS
var WORLD_COLS;
var WORLD_ROWS;

var TILE_SIZE;
var TILES_PER_ROW = 11; /* CONTROLS NUMBER OF ROWS DISPLAYED ON SCREEN */

// GAME SETUP
const FPS = 60;

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
    crane : false,
    mario : false,
    cat : false,
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
    'A girl once told me that she wanted to see my python... I only knew javascript.',
    'What do you call a dog that does magic tricks?... A labracadabrador.',
    'Two windmills are standing in a field and one asks the other, “What kind of music do you like?”... The other says “I’m a big metal fan.”',
    'My girlfriend and I often laugh about how competitive we are… But I laugh more.',
    'My friend asked me to help him round up his 37 sheep... I said "40".'
];

// MAIN START FUNCTION
function init(){

    // SELECTORS
    var canvas = document.getElementById('sceneCanvas');
    var ctx = canvas.getContext('2d');

    // SCENE LAYOUT
    var sceneLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 5, 21, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 22, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 168, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 41, 41, 41, 41, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 47, 48, 49, 50, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 43, 44, 45, 46, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 168, 169, 170, 169, 170, 169, 170, 169, 170, 171, 169, 170, 172, 172, 0, 0, 95, 96, 112, 113, 97, 41, 41, 41, 41, 41, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 166, 0, 0, 0, 0, 0, 0, 170, 0, 0, 0, 0, 0, 0, 81, 82, 101, 102, 86, 41, 51, 52, 53, 54, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 167, 0, 0, 0, 0, 0, 0, 169, 0, 0, 0, 0, 0, 0, 83, 84, 103, 104, 86, 41, 55, 56, 57, 58, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 181, 182, 182, 182, 183, 0, 0, 0, 0, 170, 0, 0, 0, 0, 0, 0, 81, 82, 105, 106, 86, 41, 41, 41, 41, 41, 41, 142, 143, 143, 143, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169, 0, 0, 0, 0, 0, 0, 83, 84, 103, 104, 86, 41, 47, 48, 49, 50, 41, 121, 132, 133, 134, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 0, 0, 0, 0, 0, 0, 81, 82, 105, 106, 86, 41, 43, 44, 45, 46, 41, 121, 135, 136, 137, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 173, 175, 22, 179, 175, 175, 175, 175, 175, 175, 177, 161, 0, 0, 0, 173, 175, 175, 175, 175, 175, 177, 0, 83, 84, 103, 104, 86, 41, 41, 41, 41, 41, 41, 121, 138, 139, 140, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174, 176, 23, 180, 176, 176, 176, 176, 176, 176, 178, 162, 163, 164, 165, 174, 176, 176, 176, 176, 176, 178, 0, 81, 82, 105, 106, 86, 41, 51, 52, 53, 54, 41, 121, 142, 142, 142, 121, 0, 0, 0, 0, -1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 3, 3, 2, 2, 3, 2, 4, 4, 3, 2, 2, 3, 3, 4, 4, 3, 4, 2, 2, 3, 2, 4, 3, 2, 2, 4, 4, 3, 3, 2, 2, 2, 3, 4, 2, 4, 4, 5, 21, 1, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 9, 10, 9, 7, 6, 6, 8, 9, 9, 10, 10, 6, 6, 7, 6, 7, 7, 7, 9, 9, 10, 10, 10, 8, 6, 7, 9, 10, 10, 8, 8, 9, 8, 7, 7, 6, 7, 23, 24, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 11, 13, 15, 0, 0, 15, 14, 13, 13, 12, 11, 11, 12, 13, 15, 15, 14, 13, 15, 0, 14, 13, 13, 12, 12, 12, 15, 14, 13, 12, 14, 15, 11, 11, 12, 11, 128, 0, 23, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 11, 12, 0, 0, 0, 0, 0, 11, 12, 11, 11, 15, 14, 13, 12, 14, 15, 0, 0, 0, 0, 87, 14, 12, 11, 14, 15, 13, 12, 42, 42, 42, 128, 128, 128, 128, 128, 0, 22, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 27, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 13, 12, 11, 11, 12, 0, 0, 0, 0, 0, 0, 87, 88, 100, 14, 15, 13, 12, 42, 42, 41, 41, 121, 141, 141, 141, 121, 0, 23, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, -1, 0, 0, 29, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 14, 13, 0, 0, 0, 0, 0, 0, 0, 107, 83, 84, 98, 99, 85, 42, 61, 62, 53, 54, 41, 121, 132, 133, 134, 121, 0, 22, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 3, 2, 4, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 81, 82, 105, 106, 86, 41, 55, 56, 57, 58, 41, 121, 135, 136, 137, 121, 0, 22, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 8, 9, 9, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 83, 84, 103, 104, 86, 41, 64, 65, 66, 67, 41, 121, 138, 139, 140, 121, 0, 23, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 14, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 81, 82, 89, 90, 86, 41, 76, 77, 78, 79, 41, 121, 129, 130, 131, 121, 0, 22, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208, 209, 209, 209, 209, 209, 209, 209, 209, 209, 209, 209, 209, 210, 0, 0, 0, 0, 0, 0, 0, 0, 111, 83, 84, 91, 92, 86, 41, 72, 73, 74, 75, 41, 121, 122, 123, 126, 121, 0, 22, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 214, 0, 0, 0, -1, 0, 0, 0, 0, 0, 81, 82, 93, 94, 86, 41, 68, 69, 70, 71, 41, 121, 124, 125, 126, 121, 0, 23, 0, 0, 0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 211, 221, 222, 223, 224, 225, 211, 231, 232, 233, 211, 217, 218, 211, 0, 0, 0, 0, 1, 3, 5, 21, 1, 4, 3, 2, 2, 1, 4, 3, 3, 2, 3, 4, 4, 3, 2, 2, 4, 3, 2, 2, 3, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 211, 226, 227, 228, 229, 230, 211, 234, 235, 236, 211, 219, 220, 211, 0, 0, 0, 0, 0, 6, 7, 22, 24, 8, 9, 10, 6, 7, 8, 9, 10, 10, 6, 7, 7, 8, 7, 9, 10, 10, 7, 6, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 213, 214, 0, 0, 0, 0, 0, 0, 11, 23, 25, 15, 14, 13, 0, 11, 12, 15, 0, 13, 14, 0, 0, 12, 15, 14, 0, 0, 13, 11, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201, 237, 202, 203, 204, 205, 206, 237, 237, 237, 237, 237, 237, 237, 237, 237, 207, 0, 0, 0, 0, 0, 22, 26, 13, 11, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 211, 241, 242, 243, 244, 215, 217, 218, 215, 249, 250, 251, 252, 211, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, -1, 0, 'x', 0, 0, 0, 0, 0, 0, 0, 211, 245, 246, 247, 248, 216, 219, 220, 216, 253, 254, 255, 256, 211, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 3, 3, 4, 2, 3, 2, 4, 4, 2, 3, 4, 3, 3, 2, 4, 4, 2, 3, 3, 2, 2, 4, 4, 4, 3, 2, 4, 3, 3, 4, 4, 2, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 9, 8, 8, 7, 8, 7, 10, 6, 6, 7, 8, 10, 9, 6, 7, 9, 10, 9, 9, 10, 8, 7, 7, 6, 8, 6, 6, 8, 10, 10, 8, 9, 9, 10, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 11, 12, 15, 0, 0, 14, 13, 11, 15, 11, 12, 13, 14, 15, 0, 15, 12, 11, 13, 13, 0, 11, 15, 14, 13, 12, 12, 0, 15, 14, 11, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 14, 13, 0, 0, 0, 0, 11, 14, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, , 0, 0, 0]
    ];

    setWorldSize();

    var TILESHEET_WIDTH = 1200;
    var TILESHEET_HEIGHT = 1200;
    var TILESHEET_ROWS = 20;
    var TILESHEET_COLS = 20;
    var TILESHEET_SPRITE = TILESHEET_WIDTH / TILESHEET_COLS;

    // FIND LOCATION OF DESIRED SPRITE BY NUMBER ON TILESHEET
    function getTileSheetLocation(i, j, numb){
        numb--;
        let sourceRow = Math.floor(numb / TILESHEET_COLS);
        let sourceCol = numb - sourceRow * TILESHEET_COLS;

        let tile = new Image();
        tile.src = 'img/tilesheet-20180320.png';
        ctx.drawImage(tile, sourceCol * TILESHEET_SPRITE, sourceRow * TILESHEET_SPRITE, TILESHEET_SPRITE, TILESHEET_SPRITE, j*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };

    function drawScene(){
        for(let i = screen.visibleRowTop; i < screen.visibleRowBottom; i++){
            for(let j = screen.visibleColLeft; j < screen.visibleColRight; j++){
                if(sceneLayout[i][j] > 0){
                    getTileSheetLocation(i,j,sceneLayout[i][j]);
                }
            }
        }
    };

    function cameraFollow() {
        camPanX = player.x - canvas.width / 2;

        if(!player.jumping || !player.falling){
            camPanY = player.y - canvas.height / 5 * 4;
        }
    };

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
    };

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
        this.playerMaxSpeedX = Math.floor(TILE_SIZE / 12);
        this.playerMaxSpeedY = Math.floor(TILE_SIZE / 6);
        this.climbingSpeed = 0;


        // LEFT / RIGHT MOVEMENT
        this.left = false;
        this.right = false;
        this.previousDirection = 'right'; /* HELPER FOR IDLE ANIMATION DIRECTION */

        // MOVEMENT STATUS
        this.grounded = true;
        this.jumping = false;
        this.falling = false;
        this.climbingUp = false;
        this.climbingDown = false;
        this.canClimbUp = false;
        this.canClimbDown = false;

        this.playerImg = new Image();
    };

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
                if(this.speedX < this.playerMaxSpeedX){
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

            if(returnTileGridStatus(this.x,this.y - 1) || returnTileGridStatus(this.x + TILE_SIZE,this.y - TILE_SIZE)){
                this.x = nextX;
            }else{

                // ACCELERATION
                if(this.speedX < this.playerMaxSpeedX){
                    this.speedX++;
                }

                // CHECK BOTTOM TYLE
                if(!this.jumping){
                    if(returnTileGridStatus(this.x, this.y)){
                        this.falling = false;
                        this.grounded = true;
                    }else{
                        this.falling = true;
                    }
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
                if(this.speedY < this.playerMaxSpeedY){
                    this.speedY++;
                }else{
                    this.speedY = this.playerMaxSpeedY;
                }
            }
        }

        // CLIMBING
        // UP
        if(this.canClimbUp && this.climbingUp){
            let nextY = this.y;

            if(checkLadder(this.x + TILE_SIZE / 2, this.y - TILE_SIZE)){
                this.y += this.climbingSpeed;
            }else{
                this.y = nextY;
                this.y = (this.playerRow + 1) * TILE_SIZE;
            }

        // DOWN
        }else if(this.canClimbDown && this.climbingDown){
            let nextY = this.y;

            if(checkLadder(this.x + TILE_SIZE / 2, this.y + TILE_SIZE)){
                this.y += this.climbingSpeed;
            }else{
                this.y = nextY;
                this.y = (this.playerRow + 2) * TILE_SIZE;
            }

        // STOPPED CLIMBING
        }else{
            this.y = this.y;
            this.climbingSpeed = 0;
        }
    };

    // PLAYER OBJECT - GET PLAYER CURRENT POSITION
    PlayerObj.prototype.checkPosition = function (){
        this.playerCol = Math.floor((this.x + TILE_SIZE / 2) / TILE_SIZE);
        this.playerRow = Math.floor((this.y - TILE_SIZE) / TILE_SIZE);

        this.tileCurrentPlayerPositionType = sceneLayout[this.playerRow][this.playerCol];
        this.tileBelowPlayerPositionType = sceneLayout[this.playerRow + 1][this.playerCol];

        // INTERACTION BASED ON PLAYER LOCATION ON GRID
        if(this.playerCol >= 5 && this.playerCol < 9 && this.playerRow == 41){
            textPlaceholder = 'This place looks strange... ';
            displayText('intro');
        }else if(this.playerCol >= 14 && this.playerCol < 27 && this.playerRow == 41){
            textPlaceholder = 'I think that someone has told me that architects make great developers. I wonder if that is true.';
            displayText('about');
        }else if(this.playerCol >= 35 && this.playerCol < 39 && this.playerRow == 35){
            textPlaceholder = 'Hmmm... Not too bad! Still needs some variety, but it\'s a start. I think that I should come back later.';
            displayText('portfolio');
        }else if(this.playerCol >= 40 && this.playerCol < 45 && this.playerRow == 35){
            textPlaceholder = '"In case of fire - GIT commit, GIT push". Whatever that means...';
            displayText('git');
        }else if(this.playerCol >= 46 && this.playerCol < 50 && this.playerRow == 35){
            textPlaceholder = 'Autocad, Archicad, 3DS MAX, Photoshop, Illustrator, Nikon, Aperture, Bokeh and etc. Lots of fancy words, huh?';
            displayText('other');
        }else if(this.playerCol >= 21 && this.playerCol < 28 && this.playerRow == 24){
            textPlaceholder = 'Still under construction? I\'ll have to come back later!'
            displayText('clients');
        }else if(this.playerCol >= 36 && this.playerCol < 50 && this.playerRow == 24){
            displayText('jokes');
        }else if(this.playerCol >= 8 && this.playerCol <= 16 && this.playerRow == 6 || this.playerRow == 5){
            textPlaceholder = 'Whoever made this definitely deserves a cookie. I should give him a call.';
            displayText('contact');
        }else if(this.playerCol >= 17 && this.playerCol < 23 && this.playerRow == 19){
            textPlaceholder = 'Wow! I can see my house from here!';
            displayText('crane');
        }else if(this.playerCol >= 20 && this.playerCol < 25 && this.playerRow == 33){
            textPlaceholder = 'Meow! Meow!';
            document.getElementById('textBoxImgPortrait').classList.add('hidden');
            document.getElementById('textBoxImgCat').classList.remove('hidden');
            displayText('cat');
        }else if(this.playerCol >= 4 && this.playerCol < 10 && this.playerRow == 30){
            textPlaceholder = 'I think, that you need a plumber for that...';
            displayText('mario');
        }else{
            document.getElementById('textBoxImgCat').classList.add('hidden');
            document.getElementById('textBoxImgPortrait').classList.remove('hidden');

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
        if(sceneLayout[this.playerRow + 1][this.playerCol] == 21 || sceneLayout[this.playerRow][this.playerCol] == 21 ||sceneLayout[this.playerRow][this.playerCol] == 22 || sceneLayout[this.playerRow][this.playerCol] == 23){
            this.canClimbUp = true;
        }else{
            this.canClimbUp = false;
        }

        if(sceneLayout[this.playerRow + 1][this.playerCol] == 21 || sceneLayout[this.playerRow + 1][this.playerCol] == 22 || sceneLayout[this.playerRow + 1][this.playerCol] == 23){
            this.canClimbDown = true;
        }else{
            this.canClimbDown = false;
        }

        // DEBUGGING
        document.getElementById('playerCol').innerHTML = this.playerCol;
        document.getElementById('playerRow').innerHTML = this.playerRow;
        document.getElementById('climbup').innerHTML = this.canClimbUp;
        document.getElementById('climbdown').innerHTML = this.canClimbDown;
        document.getElementById('current').innerHTML = sceneLayout[this.playerRow][this.playerCol];
        document.getElementById('below').innerHTML = sceneLayout[this.playerRow + 1][this.playerCol];
    };

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
    };

    function mainMove(){
        player.checkPosition();
        player.move();
        cameraFollow();
    };

    function mainDraw(){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(-camPanX, -camPanY);
        drawScene();
        ctx.restore();
        player.draw();
    };

    function animate(){
        setInterval(function() {
            mainMove();
            checkVisibleTiles();
            mainDraw();
        }, 1000/FPS);

        setInterval(function(){
            curFrame = ++curFrame % frameCount;
        }, 100);
    };

    // CREATE NEW PLAYER OBJECT
    player = new PlayerObj();
    calculateSpawnLocation();

    // START ANIMATION
    animate();

    // PLAYER CONTROLS
    document.addEventListener('keydown',function(event){
        if(event.key == 'ArrowLeft' && !player.climbingDown){
            player.left = true;
        }
        if(event.key == 'ArrowRight' && !player.climbingDown){
            player.right = true;
        }
        if(event.key == 'ArrowUp'){
            if(player.canClimbUp){
                player.climbingUp = true;
                player.climbingSpeed = Math.floor(-TILE_SIZE / 8);
            }
        }
        if(event.key == 'ArrowDown'){
            if(player.canClimbDown){
                player.climbingDown = true;
                player.climbingSpeed = Math.floor(TILE_SIZE / 8);
            }
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
            player.climbingUp = false;
        }
        if(event.key == 'ArrowDown'){
            player.climbingDown = false;
        }
    });

    // HELPERS

    // WINDOW RESIZE LISTENER
    window.addEventListener('resize', function(){
        // setWorldSize();
        // cameraFollow();
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
    };

    // CALCULATE PLAYER START POSITION
    function calculateSpawnLocation(){
        for(let i = 0; i < sceneLayout.length; i++){
            for(let j = 0; j < sceneLayout[i].length; j++){
                if(sceneLayout[i][j] == 'x'){
                    player.y = (i + 1) * TILE_SIZE;
                    player.x = j * TILE_SIZE;
                    break;
                }
            }
        }
    };

    // FOR COLLISION DETECTION
    function returnTileGridStatus(x, y){
        // CONVERT TO GRID POSITION
        let gridRow = Math.floor(y / TILE_SIZE);
        let gridCol = Math.floor(x / TILE_SIZE);

        // CHECK IF TILE IS FREE (false) OR TAKEN (true)
        if(sceneLayout[gridRow][gridCol] == -1
            || sceneLayout[gridRow][gridCol] > 0 && sceneLayout[gridRow][gridCol] <= 5
            || sceneLayout[gridRow][gridCol] == 21
            || sceneLayout[gridRow][gridCol] >= 181 && sceneLayout[gridRow][gridCol] <= 183
            || sceneLayout[gridRow][gridCol] >= 208 && sceneLayout[gridRow][gridCol] <= 210){
            return true;
        }else{
            return false;
        }
    };

    // FOR CHECKING IF PLAYER IS ON A LADDER
    function checkLadder(x, y){
        // CONVERT TO GRID POSITION
        let gridRow = Math.floor(y / TILE_SIZE);
        let gridCol = Math.floor(x / TILE_SIZE);

        // CHECK IF TILE IS LADDER (true) OR NOT (false)
        if(sceneLayout[gridRow][gridCol] >= 21 && sceneLayout[gridRow][gridCol] <= 23){
            return true;
        }else{
            return false;
        }
    };

    // FOR TYPING TEXT IN TEXT BOX

    var textPlaceholder; /* TEXT PLACEHOLDER FOR TEXT BOX*/
    var displayedChar; /* DISPLAYED CHARACTER COUNTER FOR TYPING SIMULATION */

    function displayText(id){
        // DISPLAY TEXTBOX CONTAINER
        document.getElementById('textBoxContainer').classList.remove('hidden');

        // CHECK IF INFORMATION IS NOT ALREADY DISPLAYING
        if(!informationDisplay[id]){

            // CHECK IF PLAYER LOCATED AT RANDOM JOKES LOCATION AND SET RANDOM JOKE
            if(id == 'jokes'){
                let jokeNr = Math.floor(Math.random() * jokes.length);
                textPlaceholder = jokes[jokeNr];
            };

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
    };

    function typeText(){
        if(displayedChar < textPlaceholder.length){
            document.getElementById('textContainer').innerHTML += textPlaceholder.charAt(displayedChar);
            displayedChar++;
            setTimeout(typeText, 30);
        }
    };

}
