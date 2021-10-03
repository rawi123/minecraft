function createElements() {
    startGame = document.querySelector("#start");
    loadGame = document.querySelector("#load");
    creator = document.querySelector("#creator");
    secondaryChoice = document.querySelector(".second-option");
    container = document.querySelector(".container");
    small = document.querySelector("#small");
    big = document.querySelector("#big");
    extra = document.querySelector("#extra")
    board = document.querySelector(".board")
    inventory = document.querySelector(".inventory")
    restart = document.querySelector(".restart")
    menu = document.querySelector(".menu")
    healthBar = document.querySelector(".health-bar")
    guide = document.querySelector("#guide")
    haveAccessBtn = document.querySelector("#have-access")
}
function assignEvenListeners() {//assign event for every button on the home screen
    let intervalIsGoingOn = false;
    startGame.addEventListener("click", e => {//open the game file 
        secondaryChoice.style.display = "flex"
        startGame.parentElement.style.display = "none"
        startGame.style.display = "none"
    })

    loadGame.addEventListener("click", e => {//print comming soon
        if (container.children[lastPlace] != undefined) {
            container.children[lastPlace].remove()
        }
        if (container.children[lastPlace] == undefined) {
            const h2 = document.createElement("h2")
            h2.innerText = "comming soon"
            h2.style.color = "green"
            h2.style.fontSize = "2.2rem"
            container.appendChild(h2)
        }
    })

    creator.addEventListener("click", e => {//open my personal protfolio
        window.open("https://rawi-protfolio.netlify.app/")
    })

    small.addEventListener("click", e => {
        gameSize = [13, 14]//first width then height
        boardSize = 50
        importBoard();
    })

    big.addEventListener("click", e => {
        gameSize = [22, 14]//first width then height
        boardSize = 100
        importBoard();
    })

    extra.addEventListener("click", e => {
        gameSize = [50, 15]//first width then height
        boardSize = 150
        importBoard();
    })

    guide.addEventListener("click", e => {
        if (container.children[lastPlace] != undefined) {
            container.children[lastPlace].remove()
        }
        let show = document.querySelector(".guideance")
        show.classList.toggle("display-none")
    })

    restart.addEventListener("click", e => {
        importBoard(true)
    })
    menu.addEventListener("click", e => {
        location.reload()
    })

    haveAccessBtn.addEventListener("click", e => {
        accsess = accsess ? false : true

        haveAccessBtn.value = accsess ? "D" : "A"
    })

    healthBar.addEventListener("mouseover", function () {
        healthBar.style.zIndex= "-1000";
    })

    healthBar.addEventListener("mouseout",function () {
        if (intervalIsGoingOn) return;
        intervalIsGoingOn = true;
        setTimeout(function () {
            healthBar.style.zIndex = "1";
            intervalIsGoingOn = false;
        }, 1000);
    });
}
function importBoard(flag = false) {//does all the job to start the game
    if ([...document.body.children].includes(container)) {
        container.remove()
        board.classList.toggle("display-none");
        board.style.width = boardSize + "vw"
        board.style.height = "100vh"
        let classForInv = boardSize >= 100 ? "inventory-big" : "inventory-small"
        inventory.classList.add(`${classForInv}`, "inventory")
        createInventory()
        board.style.gridTemplateColumns = `repeat(${gameSize[0]},1fr)`;
        board.style.gridTemplateRows = `repeat(${gameSize[1]},1fr)`;
        restart.classList.toggle("display-none")
        menu.classList.toggle("display-none")
        haveAccessBtn.classList.toggle("display-none")
    }
    if (!flag) {
        createBoard()
    }
    else {
        document.body.children[0].children[0].innerHTML = ""
        var interval_id = window.setInterval(() => { }, 99999);
        for (var i = 0; i < interval_id; i++)
            window.clearInterval(i);
        healthBar.innerHTML = ""
        createBoard()
    }
}
function createInventory() {//create inventory
    let temp = ["shovel", "axe", "pickaxe", "sword", "bucket"]
    for (let i = 0; i < invSpace; i++) {
        let div = document.createElement("div")
        div.classList.add("inv-item")
        if (temp[i]) {
            let item = document.createElement("div")
            inventoryArr.push(div)
            item.classList.add(`${temp[i]}`, "taken-inv-item")
            div.appendChild(item)
        }
        else {emptyInventory.set(div, 0)}
        choosen = inventoryArr[4]
        div.addEventListener("click", choose)
        inventory.append(div)
    }
}
function hpAdd() {
    for (let i = 0; i < 2; i++) {
        if (playerHealth < 10) {
            let heart = document.createElement("div")
            heart.classList.add("hearts")
            healthBar.appendChild(heart)
            playerHealth++;
            healthBar.style.transform = "scale(1.1)";
            setTimeout(() => {
                healthBar.style.transform = "scale(1)";
            }, 200);
        }
        
    }
}
function declareElementApplyAndOutLine(val){//set chosen outline and apply to val
    choosenElementOutLine = val;
    choosenElementToApply = val;
}
function choose() {//chose item from inventory and assign all the needed variables, if its meat add health and remove it if its weapon reomve out line if double click on the same item toogle outline and choosen
    if (this.hasChildNodes() && this.children[0] != choosen) {
        if ([...this.children[0].classList].includes("meat")) {
            declareElementApplyAndOutLine(this)
            applyElement(null, null, true)
            hpAdd()
        }
        else if (this === choosenElementToApply) {
            this.classList.toggle("outline");
            declareElementApplyAndOutLine(null)
            return
        }
        else if (inventoryArr.includes(this)) {
            if (choosen) {
                choosen.parentElement.style.background = "transparent"
            }
            if (choosenElementOutLine)
                choosenElementOutLine.classList.remove("outline")
            this.style.background = "darkcyan"
            choosen = this.children[0]
            choosenClass = choosen.classList[0]
            declareElementApplyAndOutLine(null)
        }
        else {
            if (choosen) {
                choosen.parentElement.style.background = "transparent"
            }
            if (choosenElementOutLine)
                choosenElementOutLine.classList.remove("outline")
            declareElementApplyAndOutLine(this)
            this.classList.add("outline")
            choosen = null; choosenClass = null;
        }
    }
}
function createBoard() {//create board adding the needed even listeners and applying zombie on/off
    mainArr.length = 0
    playerHealth = 10;
    dirt.length = 0;
    for (let i = 0; i < gameSize[1]; i++) {//add sky
        let temp = []
        for (let j = 0; j < gameSize[0]; j++) {
            const sky = document.createElement("div")
            board.append(sky)
            sky.classList.add("sky")
            reAddEvent(sky,true)
            temp[j] = sky
        }
        mainArr.unshift(temp)
    }
    createObjects()
    setHealth()
    setTimeout(() => {
        addZombie()
        zombieOnScreen = true;
    }, 4000);
    setInterval(() => {
        if (!zombieOnScreen) {
            addZombie();
        }
    }, 30000);
}
function setHealth() {//create health bar
    for (let i = 0; i < playerHealth; i++) {
        let heart = document.createElement("div")
        heart.classList.add("hearts")
        healthBar.appendChild(heart)
    }
}
function addZombie() {//add zombie with health 4 on an avilable place if there are no places avilable dont add
    zombieleath = 4;
    let genarr = []//j width i height
    for (let i = 0; i < mainArr.length; i++) {
        for (let j = 0; j < mainArr[i].length; j++) {
            let classes = mainArr[i][j].getAttribute("class")
            if ((classes.includes("grass") || classes.includes("dirt") || classes.includes("stone") || classes.includes("leaves") || classes.includes("log"))
                &&(mainArr[i + 1][j] && mainArr[i + 2][j])
                &&(mainArr[i + 1][j].getAttribute("class").includes("sky") && mainArr[i + 2][j].getAttribute("class").includes("sky"))) {
                        genarr.push([i + 1, j])
            }
        }
    }
    if (genarr.length > 0) {
        let place = genarr[Math.floor(Math.random() * genarr.length)]
        zombiePlace = place
        let legs = removeAllListeners(mainArr[place[0]][place[1]])
        let head = removeAllListeners(mainArr[place[0] + 1][place[1]])
        legs.setAttribute("class", "zombie-body")
        head.setAttribute("class", "zombie-head")
        legs.addEventListener("click", damage)
        head.addEventListener("click", damage)
        zombieSound[Math.floor(Math.random() * 3)].play()
        soundPlaying = setInterval(() => {
            zombieSound[Math.floor(Math.random() * 3)].play()
        }, 5000);
        zombieDammaging = setInterval(() => {
            playerGettingHit()
        }, 2000);
    }
}
function playerGettingHit() {//hit player apply healthbar animation and remove health if the player is dead alert and restart game
    healthBar.style.transform = "scale(1.1)";
    setTimeout(() => {
        healthBar.style.transform = "scale(1)";
    }, 200);
    zombieHitting.play();
    playerHealth--;
    healthBar.lastChild.remove()
    if (playerHealth === 0) {
        window.alert("you lost!")
        location.reload()
    }
}
function killZombieAndPlaceMeat(){//as the function name says :) - zombie have a place saved in zombiePlace array
    let legs = removeAllListeners(mainArr[zombiePlace[0]][zombiePlace[1]])
    let head = removeAllListeners(mainArr[zombiePlace[0] + 1][zombiePlace[1]])
    legs.setAttribute("class", "meat")
    head.setAttribute("class", "sky")
    reAddEvent(head,true)
    reAddEvent(legs)
}
function damage() {//damage zombie and check if he is dead if so apply killzombie and place meat
    if (choosenClass == "sword") {
        zombieHit[Math.floor(Math.random() * 3)].play()
        zombieleath--;
        if (zombieleath === 0) {
            zombieOnScreen = false
            clearZombieSounds()
            killZombieAndPlaceMeat()
        }
    }
    else if (choosenElementToApply) {
        if ([...choosenElementToApply.children[0].classList].includes("lava")) {
            zombieOnScreen = false
            zombieHit[Math.floor(Math.random() * 3)].play()
            mainArr[zombiePlace[0]][zombiePlace[1]].setAttribute("class", "on-fire")
            clearZombieSounds()
            setTimeout(() => {
                killZombieAndPlaceMeat()
            }, 1000);
        }
    }
}
function createObjects() {//create all objects on board-random
    let dirtRows = Math.floor((Math.random() * (boardSize / 30) + 2))//number of dirt rows
    let tree = generateTree(dirtRows)//generate a tree
    createDirt(dirtRows)
    createTree(dirtRows, tree);//i send dirt rows because the main arr starts from 0 so no need to add 1
    createStones(dirtRows);
    createWater(dirtRows)
    createStonesInDirt();
}
function createDirt(dirtRows){//create dirt while reciving how many rows of it and push every dirt applyed to arr so we can place water lava and stone
    for (let i = 0; i < dirtRows; i++) {//create dirt
        mainArr[i].map(val => {
            val.setAttribute("class", "dirt")
            dirt.push(val)
            reAddEvent(val)
        })
    }
    mainArr[dirtRows].map(val => {
        val.setAttribute("class", "grass")
        grass.push(val)
        reAddEvent(val)
    })
}
function createStonesInDirt() {//create random number of stones in dirt//after createing water and lava -whats left
    let stones = Math.floor(Math.random() * (dirt.length))
    if (dirt.length > 0) {
        for (let i = 0; i < stones; i++) {
            let randomPosition = Math.floor(Math.random() * dirt.length)
            let newStone = dirt[randomPosition]
            dirt.splice(dirt.indexOf(newStone), 1)
            newStone=removeAllListeners(newStone)
            newStone.setAttribute("class", "stone")
            reAddEvent(newStone)
        }
    }
}
function generateTree(dirtRows) {//tree templates
    let tree1 = [["leaves", "leaves", "leaves", "leaves"],
    ["leaves", "leaves", "leaves", "leaves"],
    ["leaves", "log", "leaves", "leaves"],
    ["sky", "log", "log", "sky"],
    ["sky", "log", "log", "sky"],
    ["sky", "log", "log", "sky"]]
    let tree2 = [["leaves", "leaves", "leaves"],
    ["leaves", "leaves", "leaves"],
    ["leaves", "log", "leaves"],
    ["sky", "log", "sky"],
    ["sky", "log", "sky"]]
    let tree3 = [["leaves", "leaves", "leaves"],
    ["leaves", "leaves", "leaves"],
    ["leaves", "leaves", "leaves"],
    ["sky", "log", "sky"],
    ["sky", "log", "sky"],
    ["sky", "log", "sky"]]
    let tree4 = [["sky", "leaves", "sky"],
    ["leaves", "leaves", "leaves"],
    ["leaves", "leaves", "leaves"],
    ["sky", "log", "sky"],
    ["sky", "log", "sky"],
    ["sky", "log", "sky"]]
    let tree5;
    if (boardSize >= 100) {
        tree5 = [["leaves", "leaves", "leaves", "leaves", "leaves", "leaves"],
        ["leaves", "leaves", "leaves", "leaves", "leaves", "leaves"],
        ["leaves", "leaves", "leaves", "leaves", "leaves", "leaves"],
        ["leaves", "leaves", "log", "leaves", "leaves", "leaves"],
        ["leaves", "leaves", "log", "log", "leaves", "leaves"],
        ["sky", "sky", "log", "log", "sky", "sky"],
        ["sky", "sky", "log", "log", "sky", "sky"],
        ["sky", "sky", "log", "log", "sky", "sky"],
        ["sky", "sky", "log", "log", "sky", "sky"]]
        if (dirtRows + tree5.length > 12) {
            tree5.pop()
            tree5.pop()
        }
        if (dirtRows + tree5.length === 12)
            tree5.pop();
        random = Math.floor(Math.random() * 5 + 1);
    }
    else {
        random = Math.floor(Math.random() * 4 + 1);
    }
    switch (random) {
        case 1: return tree1
        case 2: return tree2
        case 3: return tree3
        case 4: return tree4
        case 5: return tree5
    }
}
function createTree(dirtRows, tree, flag = false) {//draw any tree from tree templates
    let row = Math.floor(Math.random() * mainArr[0].length);
    if (boardSize >= 100 && !flag) {
        if (Math.floor(Math.random() * 1 + 1) === 1) {
            let tree2 = generateTree(dirtRows)
            createTree(dirtRows, tree2, true)
        }
    }
    if (row > mainArr[0].length - tree[0].length) {
        row = mainArr[0].length - tree[0].length
    }
    let height = tree.length;//height of the tree we want to start from this number above ground
    let start = height + dirtRows
    let temp = row
    for (let i = 0; i < tree.length; i++) {
        for (let j = 0; j < tree[i].length; j++) {
            mainArr[start][row].setAttribute("class", `${tree[i][j]}`)
            if (![...mainArr[start][row].classList].includes("sky")) {
                reAddEvent(mainArr[start][row])
            }
            row++;
        }
        row = temp
        start--;
    }
}
function createStones(dirtRows) {//create stones above grass
    let saveDirtRow = dirtRows;
    let temp = 0;
    let stonesNumber = Math.floor(Math.random() * boardSize / 10 + 1)//stone numbers
    let num = parseInt(Math.max(stonesNumber / 2, stonesNumber % 3, 2));//number of stones in every row
    let randomRow = Math.floor(Math.random() * (mainArr[0].length - num - 1))//row starting 
    let trees = findEmptySpaceFromEnd(dirtRows, randomRow)
    if (randomRow + trees > mainArr[0].length)
        randomRow -= trees
    let saveRow = randomRow;
    while (stonesNumber > 0) {
        let toUse = mainArr[saveDirtRow + 1][randomRow]
        if ([...toUse.classList].includes("sky")) {
            toUse.setAttribute("class", "stone")
            stonesNumber--;
            temp++
            stones.push(toUse)
            reAddEvent(toUse)
        }
        randomRow++;
        if (temp === num) {
            saveDirtRow++
            randomRow = saveRow
            temp = 0;
        }
    }

}
function createWater(dirtRows) {//create random water in dirt and remove it from dirt array
    let waterPosition = Math.floor(Math.random() * (gameSize[1] - boardSize / 25) + boardSize / 10)
    for (let i = 0; i < waterPosition; i++) {
        let newLava = dirt[Math.floor(Math.random() * dirt.length)]
        createWaterOrLava(newLava, "water")
        dirt.splice(dirt.indexOf(newLava), 1)
    }
    // creeateLava(dirtRows, waterPosition);//remove this comment if you want the water to be in one stright line and comment above
    // let waterPosition = Math.floor(Math.random() * dirtRows)
    // mainArr[waterPosition].map(val => {
    //     createWaterOrLava(val, "water")
    //     dirt.splice(dirt.indexOf(val),1)
    // })
    creeateLava(dirtRows, waterPosition);
}
function creeateLava(dirtRows, waterPosition) {//create random lava in dirt but it depends on water number-so the max is not excceding and remove it from dirt array
    let lavaPosition = Math.min(dirt.length,Math.floor(Math.random() * (gameSize[1] - boardSize / 25) + boardSize / 10))
    for (let i = 0; i < lavaPosition; i++) {
        let newLava = dirt[Math.floor(Math.random() * dirt.length)]
        createWaterOrLava(newLava, "lava")
        dirt.splice(dirt.indexOf(newLava), 1)
    }
    // while (lavaPosition === waterPosition)//remove this comment if you want the lava to be in one stright line and comment above
    //     lavaPosition = Math.floor(Math.random() * dirtRows)
    // mainArr[lavaPosition].map(val => {
    //     createWaterOrLava(val, "lava")
    //     dirt.splice(dirt.indexOf(val),1)
    // })
}
function createWaterOrLava(val, type) {//creaate water or lava in an elemnt
    let new_element = removeAllListeners(val)
    new_element.setAttribute("class", type)
    reAddEvent(new_element)
}
function removeAllListeners(val) {//clone and add to mainarr instead of the element that was there
    let temp = mainArr.find(value => value.includes(val))//temp will be the line that includes val
    var new_element = val.cloneNode(true);//clone val
    mainArr[mainArr.indexOf(temp)][temp.indexOf(val)] = new_element//push it ti main arr by using temp cordinations
    val.parentNode.replaceChild(new_element, val);//replace it in html
    return new_element//return new element
}
function findEmptySpaceFromEnd(dirtRows, randomRow) {//return trees or stones in the way
    let temp = 0;
    for (let i = randomRow; i < mainArr[0].length; i++) {

        if (![...mainArr[dirtRows + 1][i].classList].includes("sky")) {
            temp++;
        }
    }
    return temp;
}
function highLight(item,value){//highlight an item on hover if the choosen class is right
    if(choosenClass===item){
        value.style.border = "3px solid black"
    }
}
function highlightTree() {//send to highlight with the item that highlight tree
    highLight("axe",this)
}
function highlightDirt() {//send to highlight with the item that highlight dirt
    highLight("shovel",this)
}
function highlightStone() {//send to highlight with the item that highlight stone
    highLight("pickaxe",this)
}
function highlightWater() {//send to highlight with the item that highlight water
    highLight("bucket",this)
}
function removeHighlight(e = false) { (this || e).style.border = "none" }//remove highlight -used on all elemnts on mouse out
function cutTree() {//remov element and add to inv if it is possible using add to inv - sending the right class the player should picked - choosen
    addToInv(this, "axe")
}
function removeDirt() {//remov element and add to inv if it is possible using add to inv - sending the right class the player should picked - choosen
    addToInv(this, "shovel")
}
function removeStone() {//remov element and add to inv if it is possible using add to inv - sending the right class the player should picked - choosen
    addToInv(this, "pickaxe")
}
function removeWater() {//water lava or meat //remov element and add to inv if it is possible using add to inv - sending the right class the player should picked - choosen
    addToInv(this, "bucket")
}
function addToInv(element, item) {
    if (choosenClass === item) {
        let y = mainArr.find(val => val.includes(element))
        let x = y.indexOf(element)
        y = mainArr.indexOf(y)//y height x width
        if (!accsess || (y<mainArr.length-1&&mainArr[y + 1][x].getAttribute("class").includes("sky")) || (y>0&&mainArr[y - 1][x].getAttribute("class").includes("sky")) || (x<mainArr[0].length-1&&mainArr[y][x + 1].getAttribute("class").includes("sky")) || (x>0&&mainArr[y][x - 1].getAttribute("class").includes("sky"))) {
            flag = false;
            let check = objectInInventory(element.classList[0]);
            if (check) {
                emptyInventory.set(check, emptyInventory.get(check) + 1)
                check.children[0].children[0].innerText = `${emptyInventory.get(check)}`
                flag = true
            }
            else if (findFirstEmptyInventory()) {
                let emptyKey = findFirstEmptyInventory()
                let div = document.createElement("div")
                div.classList.add(`${element.classList[0]}`, "taken-inv-item")
                emptyInventory.set(emptyKey, 1)
                emptyKey.append(div);
                div.innerHTML = `<p style="user-select: none;" class="number-of-elements">${emptyInventory.get(emptyKey)}</p>`
                flag = true
            }
            if (firstWater.includes(element)) {
                removeAllWaterOrLava(element, element.classList[0]);
            }
            if (flag) {
                element.style.border = "none"
                element.setAttribute("class", "sky")
                let new_element = removeAllListeners(element)
                reAddEvent(new_element,true)
            }
        }

    }
}
function removeAllWaterOrLava(element, type) {
    let cordonations = mainArr.find(val => {
        return val.indexOf(element) > -1
    })
    let x = mainArr.indexOf(cordonations)
    if (cordonations) {
        firstWater.push(element)
        let y = cordonations.indexOf(element)
        if (x > 0) {
            let toUse = mainArr[x - 1][y]
            while ([...toUse.classList].includes(type)) {
                toUse.setAttribute("class", "sky")
                let new_element = removeAllListeners(toUse)
                reAddEvent(new_element,true)
                x--;
                toUse = mainArr[x - 1][y]
            }
        }
    }
}
function objectInInventory(classCheck) {
    for (let [key, value] of emptyInventory) {
        if (key.children[0])
            if ([...key.children[0].classList].includes(classCheck)) {
                return key
            }
    }
    return 0;

}
function findFirstEmptyInventory() {
    let toReturn = false;
    for (let [key, val] of emptyInventory) {
        if (key.children.length === 0)
            toReturn = key
    }
    return toReturn
}
function findFirstTakenInventory() {
    let toReturn = false;
    for (let [key, val] of emptyInventory) {
        if (key.children.length > 0){
            if(!(key.children[0].getAttribute("class").includes("meat"))){
                toReturn = key  
            }
        }
    }
    return toReturn
}
function apply() {
    if (choosenElementToApply) {
        if ([...this.classList].includes("sky")) {
            applyElement(this, choosenElementToApply.children[0].classList[0])
            if ([...this.classList].includes("water")) applyWaterOrLava(this, "water", "lava")
            else if ([...this.classList].includes("lava")) applyWaterOrLava(this, "lava", "water")
            reAddEvent(this)
        }
        else if ([...this.classList].includes("water") || [...this.classList].includes("lava")) {
            checkObsidian(this)
        }
    }
}
function applyElement(element, classToAdd, flag = false) {
    if (!flag)
        element.setAttribute("class", `${classToAdd}`)
    let newAmmout = emptyInventory.get(choosenElementToApply) - 1;
    if (newAmmout === 0) {
        choosenElementToApply.children[0].setAttribute("class", "sky taken-inv-item")
        choosenElementToApply.children[0].remove();
        emptyInventory.set(choosenElementToApply, 0)
        if (choosenElementOutLine)
            choosenElementOutLine.classList.remove("outline")
        choosenElementToApply = null
        let temp = findFirstTakenInventory()
        if (temp) {
            declareElementApplyAndOutLine(temp)
            temp.classList.add("outline")
        }
    }
    else {
        choosenElementToApply.children[0].children[0].innerText = `${newAmmout}`
        emptyInventory.set(choosenElementToApply, newAmmout)
    }
}
function checkObsidian(waterOrLava) {//check for obsidian and apply it on clicking right on lava with water or the other way round
    switch (waterOrLava.classList[0]) {
        case "water": {
            if (choosenElementToApply.children[0].classList[0] == "lava") {
                let new_element = removeAllListeners(waterOrLava)
                applyElement(new_element, "obsidian")
            }
            break;
        }
        case "lava": {
            if (choosenElementToApply.children[0].classList[0] == "water") {
                let new_element = removeAllListeners(waterOrLava)
                applyElement(new_element, "obsidian")
            }
            break;
        }
    }
}
function applyWaterOrLava(element, type, oppositeType) {
    let cordonations = mainArr.find(val => {
        return val.indexOf(element) > -1
    })
    let x = mainArr.indexOf(cordonations)
    if (cordonations) {
        firstWater.push(element)
        let y = cordonations.indexOf(element)
        if (x > 0) {
            let toUse = mainArr[x - 1][y]
            let tempSec = 100;
            while ([...toUse.classList].includes("sky") || [...toUse.classList].includes(`${type}`) || [...toUse.classList].includes(`zombie-head`)) {
                if ([...toUse.classList].includes(`zombie-head`)) {
                    zombieOnScreen = false
                    killZombie(tempSec)
                    break;
                }
                else {
                    func(toUse, tempSec)
                    tempSec += 120
                    x--;
                    toUse = mainArr[x - 1][y]
                }
            }
            function killZombie(secs) {
                setTimeout(() => {
                    zombieHit[Math.floor(Math.random() * 3)].play()
                    clearZombieSounds();
                    mainArr[x - 2][y].setAttribute("class", "on-fire")
                    mainArr[x - 1][y].setAttribute("class", "head-burn")
                    setTimeout(() => {
                        let legs = removeAllListeners(mainArr[x - 1][y])
                        legs.setAttribute("class", "lava")
                        console.log(legs,true);
                        reAddEvent(legs,true)
                        setTimeout(() => {
                            let head = removeAllListeners(mainArr[x - 2][y])
                            head.setAttribute("class", "lava")
                            reAddEvent(head,true)
                        }, 300);
                    }, secs);
                }, 300);
            }
            function func(elementToUse, secs) {
                setTimeout(() => {
                    elementToUse.setAttribute("class", `${type}`)
                    reAddEvent(elementToUse)
                }, secs);
            }
            setTimeout(() => {
                if ([...toUse.classList].includes(`${oppositeType}`)) {
                    let new_element = removeAllListeners(toUse)
                    new_element.setAttribute("class", `obsidian`)
                }
            }, tempSec);
        }
    }
}
function clearZombieSounds(){//clear intervals of zombie sound
    clearInterval(soundPlaying)
    clearInterval(zombieDammaging)
}
function reeAddEventToElement(val,onclick,mouseOver){//takes 3 elements val- elemnts to ad listeners to - onclick function and mouse over function and apply it while adding remove highlight for all elemtns
    val.addEventListener("click", onclick)
    val.addEventListener("mouseover", mouseOver)
    val.addEventListener("mouseout", removeHighlight)
}
function reAddEvent(val,flag=false) {//apply the right listeners for each of the classes with the help of reeAddEventToElement function if flag is true it will add apply
    switch (val.classList[0]) {
        case "leaves":
            reeAddEventToElement(val,cutTree,highlightTree);
            break;
        case "log":
            reeAddEventToElement(val,cutTree,highlightTree);
            break;
        case "dirt":
            reeAddEventToElement(val,removeDirt,highlightDirt)
            break;
        case "grass":
            reeAddEventToElement(val,removeDirt,highlightDirt)
            break;
        case "stone":
            reeAddEventToElement(val,removeStone,highlightStone)
            break;
        case "water":
            reeAddEventToElement(val,removeWater,highlightWater)
            break;
        case "lava":
            reeAddEventToElement(val,removeWater,highlightWater)
            break;
        case "meat":
            reeAddEventToElement(val,removeWater,highlightWater)
            break;
    }
    if(flag){
        val.addEventListener("click", apply)
    }
}
let startGame; let loadGame; let creator; let secondaryChoice; let container; let small; let big; let extra; let board; let inventory; let restart; let menu; let healthBar; let guide;//elemtns alreday on the screen(query selector)
let haveAccessBtn;
let accsess = false;//put false if you want to access everything from everywhere
let gameSize;//array of cols and rows
let mainArr = [];//array displaying board
let boardSize;//board size in vw
let grass = [];//grass blocks
let dirt = [];//dirt blocks
let stones = [];
let zombiePlace = [];
let waterNumber;
let lavaNumber;
let zombieHitting = new Audio('../images/zombie\ hitting.m4a')
let soundPlaying;
let playerHealth = 10;
let zombieHit = [new Audio('../images/zombie\ hit\ 1.m4a'), new Audio('../images/zombie\ hit\ 2.m4a'), new Audio('../images/zombie\ hit\ 3.m4a')];
let zombieSound = [new Audio('../images/zombie\ sound\ 1.m4a'), new Audio('../images/zombie\ sound\ 2.m4a'), new Audio('../images/zombie\ sound\ 3.m4a')]
let zombieOnScreen = false;
let inventoryArr = []; let emptyInventory = new Map();
let healthArr = []
let choosen;//choosen inventory item
let choosenElementToApply;//choosen element
let choosenClass; let choosenElementOutLine
let firstWater = [];//to pick up all the waters
const invSpace = 9;//inv size 9 is the max in one row how ever wont be able to put in the top part if less
createElements();
let lastPlace = container.children.length
assignEvenListeners()