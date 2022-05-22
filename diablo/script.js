const player = document.getElementById('player');
const gameBoard = document.getElementById('gameBoard');
const pet = document.getElementById('pet');
let gameSize = 400;
let playerRadius = 25;
let x = gameSize/2 - playerRadius;
let y = gameSize/2 - playerRadius;
let petX = 300;
let petY = 300;
let petD = 0;
let boardX = window.innerWidth/2 - gameSize/2;
let boardY = window.innerHeight/2 - gameSize/2;
let boxX = 0;
let boxY = 0;
let inHouse = true;
let hasPet = false;
let playerSpeed = 1.5;
let playerName = 'unkown';
let playerHealth = 100;
let stuck = false;
let wallCollision = {left: false, right: false, top: false, bottom: false}

//GAME SETUP

gameBoard.style.width = gameSize + 'px';
gameBoard.style.height = gameSize + 'px';
player.style.left = gameSize/2 - playerRadius + 'px';
player.style.top = gameSize/2 - playerRadius + 'px';
pet.style.left = petX + 'px';
pet.style.top = petY + 'px';
gameBoard.style.left = window.innerWidth/2 - gameSize/2 + 'px';
gameBoard.style.top = window.innerHeight/2 - gameSize/2 + 'px';


for (var i = 0; i < 25; i++) {
    for (var j = 0; j < 25; j++) {
        let grid = document.createElement('div');
        let newClass = 'grid';
        grid.style.left = i * 2000 +'px';
        grid.style.top = j * 2000 + 'px';
        grid.id = `x:${i}y:${j}`;
        document.getElementById('outside').appendChild(grid);
        if ((j === 9 && i !== 2 && i !== 22) || (j === 19 && i !== 7 && i !== 12 && i !== 17 && i !== 22) || j === 24) {
            newClass += ' wall-bottom';
        }
        if (j > 9 && j <= 24 && i === 19 && j !== 12 && j !== 17 && j !== 22) {
            newClass += ' wall-right';
        }
        if (j > 9 && j <= 24 && i === 4 && j !== 12 && j !== 17 && j !== 22) {
            newClass += ' wall-right';
        }
        if ((j === 14 && i >= 0 && i <= 4) || (j === 14 && i > 9 && i <= 14 && i !== 12) || (j === 14 && i > 19 && i <= 24)) {
            newClass += ' wall-bottom';
        }
        if ((i === 9 && j > 9 && j <= 14 && j !== 12) || (i === 14 && j > 9 && j <= 14 && j !== 12) || (i === 9 && j > 19 && j <= 24) || (i === 14 && j > 19 && j <= 24)) {
            newClass += ' wall-right';
        }
        grid.className = newClass;
    }
}

let classes = ['mage', 'berserker', 'rogue'];
let classColors = ['purple', 'orange', 'black'];

let keys = {};
let types = -1;
let playerClass = '';
let gameRunning = false;


let houseCollision = [{x: 10, y:270, height:123, width: 240}, {x: 320, y: 40, height: 200, width: 80}]
let outSideCollision = [{x: 25200, y:25002, height:400, width: 400}, {x:24100, y:25000, height:500, width:1000}]
//ENEMIES
let enemies = [];
// createEnemies();

document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// document.getElementById('mainMenu').style.display = 'none';
// gameBoard.style.display = 'block';
// gameRunning = true;
// createRogue();
// createBerserker();
// createMage();
document.getElementById('start').addEventListener('click', function() {
    // if (types !== -1) {
        const newName = document.getElementById('name').value;
        if (newName) playerName = newName;
        else newName = 'Bob';
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('rug-name').innerHTML = newName + "'s"
        gameBoard.style.display = 'block';
        gameRunning = true;
        // player.style.backgroundColor = classColors[types];
        // if (types === 2) {
        //     createRogue();
        // }
        // if (types === 1) {
        //     createBerserker();
        // }
        // if (types === 0) {
        //     createMage();
        // }
    // }
})

setInterval(function() {
    if (gameRunning) {
        movePlayer();
        movePet();
        checkEnemies();
        moveEnemies();
    } else {
        // if (document.getElementsByClassName('type')[0].matches(':focus')) types = 0;
        // else if (document.getElementsByClassName('type')[1].matches(':focus')) types = 1;
        // else if (document.getElementsByClassName('type')[2].matches(':focus')) types = 2;
    }
}, 10)