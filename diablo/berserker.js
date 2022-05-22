let sword;
const createBerserker = () => {
    sword = document.createElement('div');
    sword.id = 'sword';
    player.appendChild(sword);
    petType = document.createElement('div');
    petType.className = 'porcupine';
    pet.appendChild(petType);
}
let swinging = false;
let swingSpeed = 5;
let swingDirection = -1;
let swingTime = 0;
let shooting = false;
let spike;
let direction = 0;
let distance = 0;
let bulletX = 0;
let bulletY = 0;
document.addEventListener('mousemove', function(e) {
    if (types === 1) {
        let distX = e.clientX - window.innerWidth / 2;
        let distY = e.clientY - window.innerHeight / 2
        degrees = Math.atan(distY / distX) * (180 / Math.PI) - 90
        if (degrees === -180) degrees = 0;
        else if (degrees === 0) degrees = -180;
        if (distX > 0) degrees = Math.atan(distY / distX) * (180/Math.PI) + 90;
        degrees += 20 + swingTime;
        document.getElementById('sword').style.transform = `rotate(${degrees}deg)`;
    }
})

setInterval(function() {
    if (types === 1) {
        if (mousedown && !swinging) swinging = true;
        if (swinging) {
            if (swingTime <= -180) swingDirection *= -1;
            if (swingTime > 0) {
                swingDirection *= -1;
                swingTime = 0;
                swinging = false;
                for (var i = 0; i < followers.length; i++) {
                    followers[i].hit = false;
                }
            }
            swingTime += (swingDirection * swingSpeed);
            degrees += swingDirection * swingSpeed;
            if (swingDirection < 0 && swingTime % 25 === 0) {
                const dx = Math.cos((degrees - 45) * (Math.PI / 180));
                const dy = Math.sin((degrees - 45) * (Math.PI / 180));
                // let marker = document.createElement('marker');
                //     marker.style.backgroundColor = 'white';
                //     marker.style.height = '50px';
                //     marker.style.width = '50px';
                //     marker.style.borderRadius = '50%';
                //     marker.style.position = 'absolute';
                //     console.log(dx * 20);
                //     marker.style.left = (x + playerRadius - 25 + dx * 65) + 'px';
                //     marker.style.top = (y + playerRadius - 25 + dy * 65) + 'px';
                //     gameBoard.appendChild(marker);
                for (let j = 0; j < followers.length; j++) {
                    const {x:eX, y:eY, radius, enemy} = followers[j];
                    const distX = (x + playerRadius - 25 + dx * 60) - (eX + radius);
                    const distY = (y + playerRadius - 25 + dy * 60) - (eY + radius);
                    if (distX ** 2 + distY ** 2 < (radius + 25) ** 2 && !followers[j].hit) {
                        followers[j].health -= 10;
                        followers[j].hit = true;
                        console.log("HIT YOU BOYYY")
                        if (followers[j].health <= 0) {
                            enemy.style.opacity = 0;
                            followers[j].alive = false;
                            // gameBoard.removeChild(enemy);
                            followers.splice(j, 1);
                            return
                        }
                    }
                }
            }
            document.getElementById('sword').style.transform = `rotate(${degrees}deg)`;
        }
    }
    if (keys['Enter'] && types === 1 && !shooting) {
        direction = petD;
        bulletX = petX;
        bulletY = petY;
        shooting = true;
    }
    if (shooting) {
        distance += 8;
        let marker = document.createElement('marker');
        marker.style.backgroundColor = 'white';
        marker.style.height = 5 + 'px';
        marker.style.width = 5 + 'px';
        marker.style.borderRadius = '50%';
        marker.style.position = 'absolute';
        marker.style.left = bulletX + 25 + (Math.cos((direction+90) * (Math.PI / 180))) * distance + 'px';
        marker.style.top = bulletY + 25 + (Math.sin((direction+90) * (Math.PI / 180))) * distance + 'px';
        gameBoard.appendChild(marker);
        if (distance > 300) {
            shooting = false;
            distance = 0;
        }
    }
}, 10)

deleteBerserker = () => {
    pet.removeChild(petType);
    player.removeChild(sword);
};