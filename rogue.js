let healthbar;
let innerHealth;
let bow;
let fixedArrow;

const createRogue = () => {
    healthbar = document.createElement('div');
    healthbar.className = 'healthbar';
    document.body.appendChild(healthbar);
    innerHealth = document.createElement('div');
    innerHealth.className = 'innerHealth';
    healthbar.appendChild(innerHealth);
    bow = document.createElement('div');
    bow.id = 'bow';
    player.appendChild(bow);
    fixedArrow = document.createElement('div');
    fixedArrow.id = 'arrow';
    bow.appendChild(fixedArrow);
    petType = document.createElement('div');
    petType.className = 'wolf';
    pet.appendChild(petType);
}

let arrows = [];
let loaded = 0;
let pulledBack = -20;
let mousedown = false;
let degrees;

document.addEventListener('mousedown', function() {
    if (types === 0) {
        playerSpeed /= 4;
    }
    mousedown = true;
})

document.addEventListener('mouseup', function() {
    if (types === 0) {
        playerSpeed *= 4;
        let newDegrees = (degrees - 90) * (Math.PI/180); 
        let dx = Math.cos(newDegrees);
        let dy = Math.sin(newDegrees);
        let newArrow = {x: x + playerRadius - 2.5 + (dx * 50), y: y + playerRadius - 20 + (dy * 50), dx, dy, speed: loaded/4}
        let arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.style.transform = `rotate(${degrees}deg)`;
        arrow.style.left = newArrow.x +'px';
        arrow.style.top = newArrow.y + 'px';
        newArrow.arrow = arrow;
        arrows.push(newArrow);
        gameBoard.appendChild(arrow);
        loaded = 0;
        pulledBack = -20;
    }
    mousedown = false;
})

document.addEventListener('mousemove', function(e) {
    if (types === 0) {
        let distX = e.clientX - window.innerWidth / 2;
        let distY = e.clientY - window.innerHeight / 2
        degrees = Math.atan(distY / distX) * (180 / Math.PI) - 90
        if (degrees === -180) degrees = 0;
        else if (degrees === 0) degrees = -180;
        if (distX > 0) degrees = Math.atan(distY / distX) * (180/Math.PI) + 90;
        bow.style.transform = `rotate(${degrees}deg)`;
    }
})

setInterval(function() {
    if (types === 0) {
        if (mousedown && loaded < 100) {
            loaded += 0.5;
            pulledBack += 0.1;
        }
        document.getElementById('arrow').style.top = pulledBack + 'px';
        innerHealth.style.width = loaded + '%';
        for (var i = 0; i < arrows.length; i++) {
            const {dx, dy, speed, arrow} = arrows[i];
            if (speed <= 2) {
                gameBoard.removeChild(arrow);
                arrows.splice(i, 1);
            } else {
                arrows[i].x += dx * speed;
                arrows[i].y += dy * speed;
                arrows[i].speed /= 1.04;
                arrow.style.left = arrows[i].x + 'px';
                arrow.style.top = arrows[i].y + 'px';
                // let marker = document.createElement('marker');
                //     marker.style.backgroundColor = 'white';
                //     marker.style.height = '5px';
                //     marker.style.width = '5px';
                //     marker.style.borderRadius = '50%';
                //     marker.style.position = 'absolute';
                //     console.log(dx * 20);
                //     marker.style.left = arrows[i].x + Math.abs(15  * dx) + 'px';
                //     marker.style.top = arrows[i].y + Math.abs(15 * dx) + 'px';
                //     gameBoard.appendChild(marker);
                for (var j = 0; j < followers.length; j++) {
                    const {x:eX, y:eY, radius, enemy} = followers[j];
                    const distX = arrows[i].x + Math.abs(15  * dx) - (eX + radius);
                    const distY = arrows[i].y + Math.abs(15 * dx) - (eY + radius);
                    if (distX ** 2 + distY ** 2 < (radius) ** 2) {
                        followers[j].health -= 10;
                        gameBoard.removeChild(arrows[i].arrow);
                        arrows.splice(i, 1);
                        i--;
                        if (followers[j].health <= 0) {
                            enemy.style.opacity = 0;
                            followers[j].alive = false;
                            followers.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        }
    }
}, 10)


deleteRogue = () => {
    document.body.removeChild(healthbar);
    player.removeChild(bow);
    pet.removeChild(petType);
    for (var i = 0; i < arrows.length; i++) {
        gameBoard.removeChild(arrows[i].arrow);
    }
    arrows = [];
}