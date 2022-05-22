//KEYS
document.addEventListener('keydown', function(e) {
    keys[e] = true;
})
document.addEventListener('keyup', function(e) {
    keys[e] = false;
})

function createDiv(specs, parent) {
    let div = document.createElement('div');
    div.style.position = "absolute";
    for (const spec in specs){
        if (spec === "height" || spec === "width" || spec === "left" || spec === "top") {
            div.style[spec] = specs[spec] + 'px';
        } else {
            div.style[spec] = specs[spec];
        }
    }
    parent.appendChild(div);
    return div;
}