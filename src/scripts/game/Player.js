class Player {
    constructor(spawnRow, spawnCol) {
        console.log(spawnRow, spawnCol);
    }

    move(direction) {
        console.log(`moving ${direction}`);
    }

    draw() {
        console.log('Player draw');
    }
}

export default Player;
