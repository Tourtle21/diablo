const movePet = () => {
    let petSpeed = 1.5;
    let dx = 0;
    let dy = 0;
    if (keys['ArrowUp']) {dy=-petSpeed;petD=180;};
    if (keys['ArrowDown']) {dy=petSpeed;petD=0};
    if (dy === 0) {
        if (keys['ArrowLeft']) {dx=-petSpeed;petD=90;};
        if (keys['ArrowRight']) {dx=petSpeed;petD=-90;};
    } else {
        if (keys['ArrowLeft']) {
            dy=(Math.PI/4) * (dy*(2/3));
            dx=-(Math.PI/4) * petSpeed;
            dy > 0 ? petD=45 : petD=135;
        };
        if (keys['ArrowRight']) {
            dy=(Math.PI/4) * (dy * (2/3));
            dx=(Math.PI/4) * petSpeed;
            dy > 0 ? petD=-45 : petD=-135
        };
            console.log(pet.style.transform)
    }
    petX += dx;
    petY += dy;
    pet.style.transform = `rotate(${petD}deg)`;
    pet.style.left = petX + 'px';
    pet.style.top = petY + 'px';
}