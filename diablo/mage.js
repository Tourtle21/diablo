let petType;
const createMage = () => {
    healthbar = document.createElement('div');
    healthbar.className = 'healthbar';
    document.body.appendChild(healthbar);
    innerHealth = document.createElement('div');
    innerHealth.className = 'innerHealth';
    innerHealth.style.backgroundColor = 'purple';
    healthbar.appendChild(innerHealth);
    petType = document.createElement('div');
    petType.className = 'dragon';
    pet.appendChild(petType);
}
let fireballs = [];
let fireballSpeed = 4;
let shootSpeed = 0.5;
let manaRegen = 0.05;
let mana = 100;
let fireGrowing = false;
let fireSize = 0;
let fireDistance = 0;
let fireTime = 0;


document.addEventListener('click', function(e) {
    if (types === 2) {
        if (mana >= 33) {
            mana -= 33;
            let fireball = document.createElement('div');
            fireball.id = 'fireball';
            let distX = e.clientX - window.innerWidth / 2;
            let distY = e.clientY - window.innerHeight / 2;
            let dx = Math.cos(Math.atan(distY / distX));
            let dy = Math.sin(Math.atan(distY / distX));
            if (distX < 0) {dx = -dx; dy = -dy;}
            fireball.style.left = (x + playerRadius) + (dx * 40) + 'px';
            fireball.style.top = (y + playerRadius) + (dy * 40) + 'px';
            let newFireball = {x: (x + playerRadius) + (dx * 40), y: (y + playerRadius) + (dy * 40), dx, dy, growing:true, fireball:fireball, size: 0, hit:[]};
            fireballs.push(newFireball);
            gameBoard.appendChild(fireball);
        }
    }
})


setInterval(function() {
    if (types === 2) {
        for (var i = 0; i < fireballs.length; i++) {
            const {dx, dy, growing, fireball} = fireballs[i];
            if (growing) {
                stuck = true;
                fireballs[i].size += shootSpeed;
                fireball.style.height = fireballs[i].size + 'px';
                fireball.style.width = fireballs[i].size + 'px';
                fireballs[i].x -= shootSpeed/2;
                fireballs[i].y -= shootSpeed/2;
                if (fireballs[i].size > 30) {
                    stuck = false;
                    fireballs[i].growing = false;
                }
            } else {
                fireballs[i].x += dx * fireballSpeed;
                fireballs[i].y += dy * fireballSpeed;
                fireballs[i].size -= 0.2;
                if (fireballs[i].size <= 0) {
                    gameBoard.removeChild(fireball);
                    fireballs.splice(i, 1);
                    return
                }
            }
            fireball.style.left = fireballs[i].x + 'px';
            fireball.style.top = fireballs[i].y + 'px';
            for (var j = 0; j < followers.length; j++) {
                if (!fireballs[i].growing) {
                    const {x:eX, y:eY, radius, enemy} = followers[j];
                    const distX = (fireballs[i].x + 15) - (eX + radius);
                    const distY = (fireballs[i].y + 15) - (eY + radius);
                    if (distX ** 2 + distY ** 2 < (radius + 15) ** 2 && !fireballs[i].hit.includes(followers[j].enemy)) {
                        followers[j].health -= 10;
                        fireballs[i].hit.push(followers[j].enemy);
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
        if (mana <= 100) {
            mana += manaRegen;
            innerHealth.style.width = mana + '%';
        }
    }
    if (keys['Enter'] && types === 2) {dragonAttack(); fireGrowing = true;};
    if (fireGrowing) {
        fireTime += 1;
        if (fireTime % 1 == 0) {
            fireDistance += 8;
            fireSize += 8;
            let marker = document.createElement('marker');
            marker.style.backgroundColor = 'white';
            marker.style.height = fireSize + 'px';
            marker.style.width = fireSize + 'px';
            marker.style.borderRadius = '50%';
            marker.style.position = 'absolute';
            marker.style.left = petX + 25 + (Math.cos((petD+90) * (Math.PI / 180))*fireDistance) - fireSize/2 + 'px';
            marker.style.top = petY + 25 + (Math.sin((petD+90) * (Math.PI / 180))*fireDistance) - fireSize/2 + 'px';
            gameBoard.appendChild(marker);
            if (fireTime % 20 === 0) {
                console.log("HIT")
                fireDistance = 0;
                fireSize = 0;
                if (fireTime >= 60) {
                    fireGrowing = false;
                    fireTime = 0;
                }
            }
        }
    }
}, 10);

dragonAttack = () => {
}

deleteMage = () => {
    document.body.removeChild(healthbar);
    pet.removeChild(petType);
    for (var i = 0; i < fireballs.length; i++) {
        gameBoard.removeChild(fireballs[i].fireball);
    }
    fireballs = [];
    mana = 100;
}