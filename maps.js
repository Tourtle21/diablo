const homeSize = 400;
const outsideSize = 50000;
const insideOfHouse =`<div>
<div class='rug'><span id='rug-name'>Oliver's</span><span class='rug-house'>House</span></div>
<div class='desk'>
    <div class='classContainer'><div class='mage'></div></div>
    <div class='classContainer'><div class='berserker'></div></div>
    <div class='classContainer'><div class='rogue'></div></div>
</div>
<div class='door'></div>
<div class='bed'></div></div>`

let map = 'home';
const maps = {
    home: {
        width: homeSize,
        height: homeSize,
        left: window.innerWidth/2 - homeSize/2,
        top: window.innerHeight/2 - homeSize/2,
        spawnX: homeSize/2,
        spawnY: homeSize/2,
        contents:insideOfHouse,
        background: "red",
        original:[
           /*0*/ [/*0*/[[80, 200, 320, 40, 'obstacle', 'saddlebrown'], [240, 123, 10, 270, 'obstacle', 'url(images/bed.png)']]]
        ]
    },
    outside: {
        width: outsideSize,
        height: outsideSize,
        left: window.innerWidth/2 - outsideSize/2,
        top: window.innerHeight/2 - outsideSize/2,
        spawnX: outsideSize/2,
        spawnY: outsideSize/2,
        contents:"",
        background:"green",
        original:[[]]
    },
}

let drawMaps = () => {
    for (const key in maps) {
        let newMap = maps[key];
        let {height, width, background, left, top} = newMap;
        let drawMap = createDiv({height, width, left, top, background, display:"none"}, document.body);
        drawMap.innerHTML = newMap.contents
        drawMap.id = key;
        newMap.map = drawMap;
        newMap.key = [...newMap.original]
        for (const i in maps[key]['original']) {
            for (const j in maps[key]['original'][i]) {
                for (const h in maps[key]['original'][i][j]) {
                    let item = maps[key]['original'][i][j][h];
                    let newItem = createDiv({
                        width: item[0], 
                        height: item[1], 
                        left:item[2] + (newMap.width/maps[key]['original'].length*i) ,
                        top:item[3] + (newMap.height/maps[key]['original'][i].length*j),
                        background: item[5],
                        backgroundSize: "100%",
                    }, drawMap)
                    if (item[4] == "enemy") {
                        newItem.style.borderRadius = '50%';
                    }
                }
            }
        }
    }
    document.getElementById(map).style.display = 'block';
}

let resetMap = (resetMap) => {
    
}

let changeMap = (newMap) => {
    document.getElementById(map).style.display = "none";
    map = newMap;
    document.getElementById(map).style.display = "block";
    maps[map].left = window.innerWidth/2 - maps[map].spawnX;
    maps[map].top = window.innerHeight/2 - maps[map].spawnY;
    maps[map].map.style.left = maps[map].left + 'px';
    maps[map].map.style.top = maps[map].top + 'px';
    for (player in players) {
        p = players[player];
        p.x = maps[map].spawnX - playerSize/2;
        p.y = maps[map].spawnY - playerSize/2;
        p.player.style.left = p.x + 'px';
        p.player.style.top = p.y + 'px';
        p.player.parentElement.removeChild(p.player);
        maps[map].map.appendChild(p.player);
    }
}