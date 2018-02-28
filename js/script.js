// VARIABLES
// MAIN PLAYER VARIABLES
var player;
var playerCurrentX;
var playerCurrentY;

var playerMaxSpeedX = 10;
var playerMaxSpeedY = 20;

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

    const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 150;

    // LEVEL LAYOUT
    var levelLayout = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // WORLD SIZE PARAMETERS
    const TILE_SIZE = 40;
    const WORLD_COLS = levelLayout[0].length;
    const WORLD_ROWS = levelLayout.length;

    // CANVAS SETUP
    canvas.width = 800;
    canvas.height = 800;
    // canvas.width = TILE_SIZE * WORLD_COLS;
    // canvas.height = TILE_SIZE * WORLD_ROWS;

    function makeWorld(){
        ctx.fillStyle = "black";
        for(let i = screen.visibleRowTop; i < screen.visibleRowBottom; i++){
            for(let j = screen.visibleColLeft; j < screen.visibleColRight; j++){
                // GROUND
                if(levelLayout[i][j] == 1){
                    ctx.fillStyle = '#324D5C';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);

                }

                // PIPE
                if(levelLayout[i][j] == 2){
                    ctx.fillStyle = '#46B29D';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // BRICK BLOCK
                if(levelLayout[i][j] == 3){
                    // ctx.fillStyle = '#E37B40';
                    // ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);

                    let tile = new Image();
                    tile.src = 'img/test.png';
                    ctx.drawImage(tile, j*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }

                // ? BLOCK
                if(levelLayout[i][j] == 4){
                    ctx.fillStyle = '#F0CA4D';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }

                // CUBE FOR STRUCTURES
                if(levelLayout[i][j] == 5){
                    ctx.fillStyle = '#5886A1';
                    ctx.fillRect(j*TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
                }
            }
        }
    }

    function cameraFollow() {
        var cameraFocusCenterY = Math.floor(camPanY + canvas.height / 2);
        var playerDistFromCameraFocusY = Math.floor(player.y - cameraFocusCenterY);

        camPanX = player.x - canvas.width/2;

        if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y){
            camPanY += player.speedY;

        }else if(playerDistFromCameraFocusY < 0 - PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y){
            camPanY -= player.speedY;
        }else{
            camPanY = player.y - canvas.width/1.5;
        }
    }

function checkVisibleTiles() {

    var colsThatFitOnScreen = Math.floor(canvas.width / TILE_SIZE);
    var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_SIZE);

    var cameraLeftMostCol = Math.floor(camPanX / TILE_SIZE);
    if(cameraLeftMostCol < 0){
        cameraLeftMostCol = 0;
    }
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
    if(cameraRightMostCol > levelLayout[0].length){
        cameraRightMostCol = levelLayout[0].length;
    }

    var cameraTopMostRow = Math.floor(camPanY / TILE_SIZE);
    if(cameraTopMostRow < 0){
        cameraTopMostRow = 0;
    }

    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
    if(cameraBottomMostRow > levelLayout.length){
        cameraBottomMostRow = levelLayout.length;
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
        this.speedY = playerMaxSpeedY;
        this.jumpHeight = 200;

        // LEFT / RIGHT MOVEMENT
        this.left = false;
        this.right = false;
        this.previousDirection = 'right';

        // MOVEMENT STATUS
        this.grounded = true;

        this.jumping = false;
        this.falling = false;

        this.canClimb = false;
        this.climbUp = false;
        this.climbDown = false;

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

                        // CHECK IF ITS POSSIBLE TO CLIMB DOWN
                        if(levelLayout[this.playerRow + 1][this.playerCol] == 3){
                            this.canClimb = true;
                        }

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

                        // CHECK IF ITS POSSIBLE TO CLIMB DOWN
                        if(levelLayout[this.playerRow + 1][this.playerCol] == 3){
                            this.canClimb = true;
                        }

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

                this.y -= this.speedY;

                // ACCELERATION
                if(this.speedY > 1){
                    this.speedY--;
                }else{
                    this.speedY = 1;
                }

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

        // FOR CLIMBING
        if(this.canClimb && this.climbUp){
            this.y -= this.speedY;
        }
        if(this.canClimb && this.climbDown){
            this.y -= this.speedY;
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
                    this.speedY = playerMaxSpeedY;

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
    }

    // PLAYER OBJECT - GET PLAYER CURRENT POSITION
    PlayerObj.prototype.checkPosition = function (){
        this.playerCol = Math.floor(this.x / TILE_SIZE);
        this.playerRow = Math.floor((this.y - TILE_SIZE) / TILE_SIZE);

        this.tileCurrentPlayerPositionType = levelLayout[this.playerRow][this.playerCol];
        this.tileBelowPlayerPositionType = levelLayout[this.playerRow + 1][this.playerCol];

        // FOR CLIMBING MOVEMENT
        if(this.tileCurrentPlayerPositionType == 3 || this.tileBelowPlayerPositionType == 3){
            this.canClimb = true;
            this.jumping = false;
        }else{
            this.canClimb = false;
        }

        document.getElementById('playerCol').innerHTML = this.playerCol;
        document.getElementById('playerRow').innerHTML = this.playerRow;
    }

    // PLAYER OBJECT - DRAW
    PlayerObj.prototype.draw = function(){
        if(this.left){
            this.playerImg.src = 'img/player-left.png';
            ctx.drawImage(this.playerImg, canvas.width / 2, this.y-this.height * 2 - camPanY, TILE_SIZE, TILE_SIZE*2);
        }else if(this.right){
            this.playerImg.src = 'img/player-right.png';
            ctx.drawImage(this.playerImg, canvas.width / 2, this.y-this.height * 2 - camPanY, TILE_SIZE, TILE_SIZE*2);
        }else{
            this.playerImg.src = 'img/player-' + this.previousDirection + '.png';
            ctx.drawImage(this.playerImg, canvas.width / 2, this.y-this.height * 2 - camPanY, TILE_SIZE, TILE_SIZE*2);
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
        makeWorld();
        ctx.restore();
        player.draw();
    }

    function animate(){
        // myAnimationInterval = setTimeout(
        //     function(){
        //         myAnimationRequest = requestAnimationFrame(animate);
        //     },
        // 1000/FPS);

        setInterval(function() {
            mainMove();
            checkVisibleTiles();
            mainDraw();
        }, 1000/FPS);

        // TIME UTILITIES
        // currentFrame++;
        // frameIndicator.innerHTML = 'Frames since start ' + currentFrame;
        // timeIndicator.innerHTML = 'Total time ' + Math.floor(currentFrame / FPS);
    }

    player = new PlayerObj();
    calculateSpawnLocation();
    camPanY = player.y - canvas.width / 2;

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
            if(!player.jumping && player.grounded && !player.canClimb){
                playerCurrentY = player.y;
                player.jumping = true;
                player.grounded = false;
                console.log('jump if1');
            }
            if(player.canClimb){
                console.log('jump if2');
                player.climbUp = true;
                player.speedY = 5;
            }
        }
        if(event.key == 'ArrowDown'){
            if(player.canClimb){
                player.climbDown = true;
                player.speedY = -5;
            }else{
                console.log('cant climb down');
            }
        }
        if(event.key == 0){
            console.log(player);
            // checkVisibleTiles();
            // console.log(tile);
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
            player.climbUp = false;
            player.climbDown = false;
        }
        if(event.key == 'ArrowDown'){
            player.climbUp = false;
            player.climbDown = false;
        }
    });

    // HELPERS
    function calculateSpawnLocation(){
        for(let i = 0; i < levelLayout.length; i++){
            for(let j = 0; j < levelLayout[i].length; j++){
                if(levelLayout[i][j] == 9){
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
            tile.type = levelLayout[gridRow][gridCol];
        }

        // CHECK IF TILE IS FREE (false) OR TAKEN (true)
        if(levelLayout[gridRow][gridCol] != 1){
            return false;
        }else{
            return true;
        }
    }
}
