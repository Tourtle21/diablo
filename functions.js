const movePlayer = () => {
    if (!stuck) {
        let dx = 0;
        let dy = 0;
        if (keys['a']) dx = -1;
        else if (keys['d']) dx = 1;
        if (keys['w']) dy = -1;
        if (keys['s']) dy = 1;
        const collision = checkCollision(dx * playerSpeed, dy * playerSpeed);

        if (Math.sqrt(dx ** 2 + dy ** 2) > 1 && !collision) {
            let odx = dx;
            let ody = dy;
            dx = ((Math.PI/4) - 0.0783) * odx;
            dy = ((Math.PI/4) - 0.0783) * ody;
        }
        if (inHouse) checkWeapon();
        if (inHouse) {
            if (x + playerRadius*2+dx * playerSpeed < gameSize && x + dx * playerSpeed > 0 && collision !== 'dx') {
                x += dx * playerSpeed;
                boardX -= dx * playerSpeed;
            } if (y + playerRadius*2 + dy * playerSpeed < gameSize && y + dy * playerSpeed > 0 && collision !== 'dy') {
                y += dy * playerSpeed;
                boardY -= dy * playerSpeed;
            }
        } 
        else {
            let newBoxX = boxX * 2000;
            let newBoxY = boxY * 2000;
            if ((!wallCollision.right || x + playerRadius * 2 + dx * playerSpeed < newBoxX + 2000 - playerRadius) && (!wallCollision.left || x + dx * playerSpeed > newBoxX) && collision !== 'dx') {
                x += dx * playerSpeed;
                boardX -= dx * playerSpeed;
            } if ((!wallCollision.bottom || y + playerRadius * 2 + dy * playerSpeed < newBoxY + 2000 - playerRadius) && (!wallCollision.top || y + dy * playerSpeed > newBoxY) && collision!== 'dy') {
                y += dy * playerSpeed;
                boardY -= dy * playerSpeed;
            }
        }
        if (Math.floor(x / 2000) !== boxX || Math.floor(y / 2000) !== boxY) {
            boxX = Math.floor(x / 2000);
            boxY = Math.floor(y / 2000);
            if (boxX === 12 && boxY === 12) resetEnemies();
            enemies = actualEnemies[boxY][boxX];
            wallCollision.right = document.getElementById(`x:${boxX}y:${boxY}`).className.includes('wall-right')
            wallCollision.bottom = document.getElementById(`x:${boxX}y:${boxY}`).className.includes('wall-bottom');
            wallCollision.top = document.getElementById(`x:${boxX}y:${boxY-1}`).className.includes('wall-bottom');
            wallCollision.left = document.getElementById(`x:${boxX-1}y:${boxY}`).className.includes('wall-right');
        }
        player.style.left = x + 'px';
        gameBoard.style.left = boardX + 'px';
        player.style.top = y + 'px';
        gameBoard.style.top = boardY + 'px';
    }
}
const checkCollision = (dx, dy) => {
    if (inHouse) {
        for (var i = 0; i < houseCollision.length; i++) {
            const {x:iX, y:iY, width, height} = houseCollision[i];
            if (x + dx + playerRadius * 2 > iX && x + dx < iX + width && y + playerRadius * 2 > iY && y < iY + height) {
                return 'dx';
            } else if (x + playerRadius * 2 > iX && x < iX + width && y + dy + playerRadius * 2 > iY && y + dy < iY + height) {
                return 'dy';
            }
        }
    } else {
        // x: 25200, y:25002, height:400, width: 400
        if (x + playerRadius * 2 >= 25370 && x <= 25400 && y < 25002 && y > 24930) {
            if (keys[' ']){
                inHouse = true;
                gameSize = 400;
                keys[' '] = false;
                x = gameSize/2 - playerRadius;
                y = 0;
                petX = gameSize/2 - playerRadius;
                petY = 0;
                boardX = window.innerWidth/2 - gameSize/2;
                boardY = window.innerHeight/2 -gameSize/2 + 170;
                gameBoard.style.width = gameSize + 'px';
                gameBoard.style.height = gameSize + 'px';
                player.style.left = gameSize/2 - playerRadius + 'px';
                player.style.top = gameSize/2 - playerRadius + 'px';
                gameBoard.style.left = window.innerWidth/2 - gameSize/2 + 'px';
                gameBoard.style.top = window.innerHeight/2 - gameSize/2 + 'px';
                gameBoard.style.background = 'red';
                document.getElementById('outside').style.display = 'none'; 
                document.getElementById('house').style.display = 'block';
            }
            document.getElementsByClassName('outsideDoor')[0].style.backgroundColor = 'yellow';
        } else document.getElementsByClassName('outsideDoor')[0].style.backgroundColor = 'transparent';
        for (var i = 0; i < outSideCollision.length; i++) {
            const {x:iX, y:iY, width, height} = outSideCollision[i];
            collided = '';
            if (x + dx + playerRadius * 2 > iX && x + dx < iX + width && y + playerRadius * 2 > iY && y < iY + height) {
                collided += 'dx';
            } if (x + playerRadius * 2 > iX && x < iX + width && y + dy + playerRadius * 2 > iY && y + dy < iY + height) {
                collided += 'dy';
            }
            if (collided) return collided;
        }
    }
    return false;
}
const checkWeapon = (dx, dy) => {
if (x + playerRadius * 2 >= houseCollision[1].x - 10 && y > 20 && y < 200) {
        type = -1;
        if (y + playerRadius * 2 > 180) {
            type = 0;
            document.getElementsByClassName('classContainer')[2].style.border = '1px solid gold';
        } else {
            document.getElementsByClassName('classContainer')[2].style.border = 'none';
        }
        if (y + playerRadius * 2 > 120 && y + playerRadius * 2 < 180) {type=1;document.getElementsByClassName('classContainer')[1].style.border = '1px solid gold'}
        else document.getElementsByClassName('classContainer')[1].style.border = 'none';
        if (y + playerRadius * 2 > 70 && y + playerRadius * 2 < 120) {type=2;document.getElementsByClassName('classContainer')[0].style.border = '1px solid gold';}
        else document.getElementsByClassName('classContainer')[0].style.border = 'none';
        if (keys[' ']) {
            keys[' '] = false;
            if (types === 0) {deleteRogue(); document.getElementsByClassName('classContainer')[2].style.opacity = '1';}
            else if (types === 1) {deleteBerserker(); document.getElementsByClassName('classContainer')[1].style.opacity = '1';}
            else if (types === 2) {deleteMage(); document.getElementsByClassName('classContainer')[0].style.opacity = '1';};
                  
            types = type;
            if (type === 2) {
                createMage(); 
                document.getElementsByClassName('classContainer')[0].style.opacity = '0';
            };
            if (type === 1) {createBerserker(); document.getElementsByClassName('classContainer')[1].style.opacity = '0'};
            if (type === 0) {createRogue(); document.getElementsByClassName('classContainer')[2].style.opacity = '0';};
            
        }
    } else {
    document.getElementsByClassName('classContainer')[0].style.border = 'none'
    document.getElementsByClassName('classContainer')[1].style.border = 'none'
    document.getElementsByClassName('classContainer')[2].style.border = 'none'
}
if (x + playerRadius * 2 >= 170 && x <= 200 && y < 10) {
    console.log(keys)
    if (keys[' ']) {
        inHouse = false;
        gameSize = 50000;
        keys[' '] = false;
        x = gameSize/2 - playerRadius + 400;
        y = gameSize/2 - playerRadius - 25;
        petX = gameSize/2 - playerRadius + 400;
        petY = gameSize/2 - playerRadius - 25;
        boardX = window.innerWidth/2 - gameSize/2 - 400;
        boardY = window.innerHeight/2 -gameSize/2 + 25;
        gameBoard.style.width = gameSize + 'px';
        gameBoard.style.height = gameSize + 'px';
        player.style.left = gameSize/2 - playerRadius + + 'px';
        player.style.top = gameSize/2 - playerRadius + 'px';
        gameBoard.style.left = window.innerWidth/2 - gameSize/2 + 'px';
        gameBoard.style.top = window.innerHeight/2 - gameSize/2 + 'px'; 
        gameBoard.style.background = 'url(grass.png)';
        gameBoard.style.backgroundSize = '100px';
        document.getElementById('outside').style.display = 'block';
        document.getElementById('house').style.display = 'none';
    }
    document.getElementsByClassName('door')[0].style.backgroundColor = 'yellow';
} else {
    document.getElementsByClassName('door')[0].style.backgroundColor = 'transparent';
}
}
// const moveEnemies = () => {
//     for (var i = 0; i < enemies.length; i++) {
//         const {x:eX, y:eY, radius, speed, enemy} = enemies[i];
//         const distX = (x + playerRadius) - (eX + radius);
//         const distY = (y + playerRadius) - (eY + radius);
//         let dx = Math.cos(Math.atan(distY / distX));
//         let dy = Math.sin(Math.atan(distY / distX));
//         if (distX < 0) {dx = -dx; dy = -dy};
//         enemies[i].x += dx * speed;
//         enemies[i].y += dy * speed;
//         enemy.style.left = enemies[i].x + 'px';
//         enemy.style.top = enemies[i].y + 'px';
//     }
// }