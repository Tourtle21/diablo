const playerSize = 50;
const playerSpeed = 5;
const playerBackground = 'tan';

let players = [];
let playerKeys = {left1: "A", right1: "D", down1: "S", up1: "W"};
let keys = {};

let createPlayer = () => {
    let newPlayer = {
        r: playerSize/2,
        x: maps[map].spawnX - playerSize/2, 
        y:maps[map].spawnY - playerSize/2,
        speed: playerSpeed,
        background: playerBackground
    }
    let player = createDiv({height:playerSize, width: playerSize, borderRadius: "50%", left: newPlayer.x, top: newPlayer.y, background: playerBackground}, document.getElementById(map))
    newPlayer["player"] = player;
    players.push(newPlayer);
}