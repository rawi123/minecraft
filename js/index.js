function createElements() {
    startGame = document.querySelector("#start");
    loadGame = document.querySelector("#load");
    creator = document.querySelector("#creator");
    secondaryChoice = document.querySelector(".second-option");
    container = document.querySelector(".container");
    small = document.querySelector("#small");
    big = document.querySelector("#big");
    board = document.querySelector(".board")
    inventory = document.querySelector(".inventory")
}
function assignEvenListeners() {//assign event for every button on the home screen
    startGame.addEventListener("click", e => {//open the game file 
        secondaryChoice.style.display = "flex"
        startGame.parentElement.style.display = "none"
        startGame.style.display = "none"
    })
    loadGame.addEventListener("click", e => {//pring comming soon
        container.innerHTML += "<h1 style='color: green;'>Comming Soon</h1>;";
    })
    creator.addEventListener("click", e => {//open my personal protfolio
        window.open("https://rawi-protfolio.netlify.app/")
    })
    small.addEventListener("click", e => {
        gameSize = [10, 12]//first width then height
        boardSize = 50
        importBoard();
    })
    big.addEventListener("click", e => {
        gameSize = [18, 14]//first width then height
        boardSize = 100
        importBoard();
    })
}
function importBoard() {//does all the job to start the game
    container.remove()
    board.classList.toggle("display-none");
    board.style.width = boardSize + "vw"
    board.style.gridTemplateColumns = `repeat(${gameSize[0]},1fr)`;
    board.style.gridTemplateRows = `repeat(${gameSize[1]},1fr)`;
    let classForInv = boardSize === 100 ? "inventory-big" : "inventory-small"
    inventory.classList.add(`${classForInv}`, "inventory")
    createBoard()
    createInventory()
}
function createInventory() {//create inventory
    let temp = ["shovel", "axe", "pickaxe", "sword"]
    for (let i = 0; i < invSpace; i++) {
        let div = document.createElement("div")
        div.classList.add("inv-item")
        if (temp[i]) {
            inventoryArr.push(div)
            let item = document.createElement("div")
            item.classList.add(`${temp[i]}`, "taken-inv-item")
            div.appendChild(item)
        }
        else { emptyInventory.set(div, 0) }
        choosen = inventoryArr[4]
        div.addEventListener("click", choose)
        inventory.append(div)
    }
}
function choose() {
    if (this.hasChildNodes() && this.children[0] != choosen) {
        console.log("enter");
        if (this === choosenElementOutLine) {
            this.classList.toggle("outline");
            choosenElementOutLine = null;
            choosenElementToApply = null;
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
            choosenElementOutLine=null;
            choosenElementToApply = null;
        }
        else {
            if (choosen) {
                choosen.parentElement.style.background = "transparent"
            }
            if (choosenElementOutLine)
                choosenElementOutLine.classList.remove("outline")
            choosenElementOutLine = this;
            this.classList.add("outline")
            choosen = null; choosenClass = null;
        }
    }
}
function createBoard() {
    for (let i = 0; i < gameSize[1]; i++) {//add sky
        let temp = []
        for (let j = 0; j < gameSize[0]; j++) {
            const sky = document.createElement("div")
            board.append(sky)
            sky.classList.add("sky")
            sky.addEventListener("click", apply)
            temp[j] = sky
        }
        mainArr.unshift(temp)
    }
    createObjects()

}
function createObjects() {
    let dirtRows = Math.floor((Math.random() * (boardSize / 25) + 1))//number of dirt rows
    for (let i = 0; i < dirtRows; i++) {//create dirt
        mainArr[i].map(val => {
            val.setAttribute("class", "dirt")
            dirt.push(val)
            val.addEventListener("click", removeDirt)
            val.addEventListener("mouseover", highlightDirt)
            val.addEventListener("mouseout", removeHighlight)
        })
    }
    mainArr[dirtRows].map(val => {
        val.setAttribute("class", "grass")
        grass.push(val)
        val.addEventListener("click", removeDirt)
        val.addEventListener("mouseover", highlightDirt)
        val.addEventListener("mouseout", removeHighlight)
    })
    tree = generateTree(dirtRows)
    createTree(dirtRows, tree);//i send dirt rows because the main arr starts from 0 so no need to add 1
    // createStones(dirtRows);
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
    if (boardSize === 100) {
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
function createTree(floor, tree) {//draw any tree from tree templates

    let row = Math.floor(Math.random() * mainArr[0].length);
    if (row > mainArr[0].length - tree[0].length) {
        row = mainArr[0].length - tree[0].length
    }
    let height = tree.length;//height of the tree we want to start from this number above ground
    let start = height + floor
    let temp = row
    for (let i = 0; i < tree.length; i++) {
        for (let j = 0; j < tree[i].length; j++) {
            mainArr[start][row].setAttribute("class", `${tree[i][j]}`)
            if (![...mainArr[start][row].classList].includes("sky")) {
                mainArr[start][row].addEventListener("click", cutTree)
                mainArr[start][row].addEventListener("mouseover", highlightTree)
                mainArr[start][row].addEventListener("mouseout", removeHighlight)
            }
            row++;
        }
        row = temp
        start--;
    }
}
function highlightTree() {
    if (choosenClass === "axe")
        this.style.border = "3px solid black"
}
function highlightDirt() {
    if (choosenClass === "shovel")
        this.style.border = "3px solid black"
}
function removeHighlight(e = false) { (this || e).style.border = "none" }
function cutTree() {
    addToInv(this, "axe")
}
function removeDirt() {
    addToInv(this, "shovel")
}
function addToInv(element, item) {
    if (choosenClass === item) {
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
            div.addEventListener("click", chooseElemnt)
            flag = true
        }
        if (flag) {
            element.style.border = "none"
            element.setAttribute("class", "sky")
            var new_element = element.cloneNode(true);
            new_element.addEventListener("click", apply)
            element.parentNode.replaceChild(new_element, element);
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
function chooseElemnt() {
    choosenElementToApply = this.parentElement
}
function apply() {
    console.log(this);
    if (choosenElementToApply) {
        if ([...this.classList].includes("sky")) {
            this.setAttribute("class", `${choosenElementToApply.children[0].classList[0]}`)
        }
        let newAmmout = emptyInventory.get(choosenElementToApply) - 1;
        if (newAmmout === 0) {
            choosenElementToApply.children[0].setAttribute("class", "sky taken-inv-item")
            choosenElementToApply.children[0].remove();
            // var new_element = element.cloneNode(true);
            // element.parentNode.replaceChild(new_element, element);
            emptyInventory.set(choosenElementToApply, 0)
        }
        else {
            choosenElementToApply.children[0].children[0].innerText = `${newAmmout}`
            emptyInventory.set(choosenElementToApply, newAmmout)
        }
        reAddEvent(this)
        if (choosenElementOutLine)
            choosenElementOutLine.classList.remove("outline")
        choosenElementToApply = null
    }
    console.log(this);
}
function reAddEvent(val) {
    switch (val.classList[0]) {
        case "leaves":
            val.addEventListener("click", cutTree)
            val.addEventListener("mouseover", highlightTree)
            val.addEventListener("mouseout", removeHighlight)
            break;
        case "log":
            val.addEventListener("click", cutTree)
            val.addEventListener("mouseover", highlightTree)
            val.addEventListener("mouseout", removeHighlight)
            break;
        case "dirt":
            val.addEventListener("click", removeDirt)
            val.addEventListener("mouseover", highlightDirt)
            val.addEventListener("mouseout", removeHighlight)
            break;
        case "grass":
            val.addEventListener("click", removeDirt)
            val.addEventListener("mouseover", highlightDirt)
            val.addEventListener("mouseout", removeHighlight)
            break;
    }
}
let startGame; let loadGame; let creator; let secondaryChoice; let container; let small; let big; let board; let inventory;//elemtns alreday on the screen(query selector)
let gameSize;//array of cols and rows
let mainArr = [];//array displaying board
let boardSize;//board size in vw
let grass = [];//grass blocks
let dirt = [];//dirt blocks
let inventoryArr = []; let emptyInventory = new Map();
let choosen;//choosen inventory item
let choosenElementToApply;//choosen element
let choosenClass; let choosenElementOutLine
const invSpace = 8;//inv size
createElements();
assignEvenListeners()

