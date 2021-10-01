function createElements() {
    startGame = document.querySelector("#start");
    loadGame = document.querySelector("#load");
    creator = document.querySelector("#creator");
    secondaryChoice = document.querySelector(".second-option");
    container = document.querySelector(".container");
    small = document.querySelector("#small");
    big = document.querySelector("#big");
    board = document.querySelector(".board")
}
function assignEvenListeners() {
    startGame.addEventListener("click", e => {//open the game file 
        secondaryChoice.style.display = "flex"
        console.log(startGame.parentElement);
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
        gameSize = [10, 12]
        boardSize = 50
        importBoard();
    })
    big.addEventListener("click", e => {
        gameSize = [18, 14]
        boardSize = 100
        importBoard();
    })
}
function importBoard() {
    container.remove()
    board.classList.toggle("display-none");
    board.style.width = boardSize + "vw"
    board.style.gridTemplateColumns = `repeat(${gameSize[0]},1fr)`;
    board.style.gridTemplateRows = `repeat(${gameSize[1]},1fr)`;
    createBoard()
}
function createBoard() {
    for (let i = 0; i < gameSize[1]; i++) {//add sky
        let temp = []
        for (let j = 0; j < gameSize[0]; j++) {
            const sky = document.createElement("div")
            board.append(sky)
            sky.classList.add("sky")
            temp[j] = sky
        }
        mainArr.unshift(temp)
    }
    createDirtAndTree()

}
function createDirtAndTree() {
    let dirtRows = Math.floor((Math.random() * (boardSize / 25) + 1))//number of dirt rows
    for (let i = 0; i < dirtRows; i++) {//create dirt
        mainArr[i].map(val => val.setAttribute("class", "dirt"))
    }
    mainArr[dirtRows].map(val => val.setAttribute("class", "grass"))
    tree=generateTree()
    createTree(dirtRows,tree);//i send dirt rows because the main arr starts from 0 so no need to add 1
}
function generateTree() {
    let tree1 = [["grass", "grass", "grass", "grass"],
                ["grass", "grass", "grass", "grass"],
                ["grass", "log", "grass", "grass"],
                ["sky", "log", "log", "sky"],
                ["sky", "log", "log", "sky"]]
    let tree2 = [["grass", "grass", "grass"],
                ["grass", "grass", "grass"],
                ["grass", "log", "grass"],
                ["sky", "log", "sky"],
                ["sky", "log", "sky"]]
    let tree3 = [["grass", "grass", "grass"],
                ["grass", "grass", "grass"],
                ["grass", "grass", "grass"],
                ["sky", "log", "sky"],
                ["sky", "log", "sky"],
                ["sky", "log", "sky"]]
    let tree4=[["grass", "grass", "grass"],
                ["grass", "grass", "grass"],
                ["grass", "grass", "grass"],
                ["sky", "log", "sky"],
                ["sky", "log", "sky"],
                ["sky", "log", "sky"]]
    let random=Math.floor(Math.random()*4+1);
    switch (random){
        case 1:return tree1
        case 2:return tree2
        case 3:return tree3
        case 4:return tree4
    }
}
function createTree(floor,tree){
    let row=Math.floor(Math.random(mainArr.length));
    let height=tree.length;//height of the tree we want to start from this number above ground
    console.log(tree);
    let start=tree.length+floor
    console.log("start",start,);
    console.log(mainArr[2],height,"hi");
    for (let i=0;i<tree.length;i++){
        for (let j=0;j<tree[i].length;j++){
            console.log(mainArr[start][row],tree[i][j]);
            mainArr[start][row].setAttribute("class",tree[i][j])
        }
    }
    console.log(mainArr[start]);
}
let startGame; let loadGame; let creator; let secondaryChoice; let container; let small; let big; let board;//elemtns alreday on the screen(query selector)
let gameSize;//array of cols and rows
let mainArr = [];//array displaying board
let boardSize;//board size in vw
createElements();
assignEvenListeners()

