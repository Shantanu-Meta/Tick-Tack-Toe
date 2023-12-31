let container = document.querySelector(".container"); 
let wrapper = document.querySelector(".wrapper"); 

let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let p1, p2; 
let status = 0; 
//X ya fir O
let currPlayer = document.querySelector("[player-track]"); 
// your turn -X/O
let currPlayerDiv = document.querySelector(".player-show"); 
//x ya fir O
let wonPlayer = document.querySelector("[winner-track]"); 
// winner - x/O,
let wonPlayerDiv = document.querySelector(".Winner"); 

let drawDiv = document.querySelector(".draw"); 

// New game button. 
const newGame = document.querySelector('.btn'); 

// resatrt gaem
const restart = document.querySelector(".reload"); 

// buttons div
const btnDiv = document.querySelector(".buttons")

//Total grid access. 
let boxes = document.querySelectorAll('.box'); 

//internal logic
let gameGrid = ["","","","","","","","",""]; //innerLogic checks if still turn is there.

// position to check winner or draw. 
const winningPos = [
    [0,1,2],
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



function startGame(){
    if(player1.value!="" && player2.value!=""){
        console.log("first");
        p1 = player1.value; 
        p2 = player2.value; 
        initGame(); 
        container.classList.remove("active"); 
        wrapper.classList.add("active"); 
        return;
    }else{
        return; 
    }
}

//track curr player
let currentPlayer = "X"; 


// event Listner for every box.
boxes.forEach((box, index) => {
    box.addEventListener('click', ()=>{
        if(!status){
            mark(index); 
        }
    }); 
})


// EL for new game restart
newGame.addEventListener('click', initGame); 
restart.addEventListener('click', restartGame); 

// works on very begin AND click on "New GAme " button
function initGame(){  
    status = 0;
    currentPlayer = "X"; 
    wonPlayerDiv.classList.remove("activeBlock"); 
    btnDiv.classList.remove("active"); 
    drawDiv.classList.remove("activeBlock"); 
    changePlayer(); 
    currPlayerDiv.classList.add("activeBlock");

    gameGrid.forEach((value, index)=>{
        gameGrid[index] = ""; 
        boxes[index].innerText = ""; 
        if(boxes[index].classList.contains("bg-green")){
            boxes[index].classList.remove("bg-green"); 
        }
        boxes[index].style.cursor = "pointer"; 
    })
}

function restartGame(){
    initGame(); 
    location.reload(); 
}

// for mark X or O in box. 
function mark(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = `${currentPlayer}`; 
        gameGrid[index] = currentPlayer; 
        boxes[index].style.cursor = "auto"; 

        let status = checkWin(); 
        if(status === true){ // eaither won or draw. 
            return; 
        }
        if(currentPlayer === "X"){
            currentPlayer = "O"; 
        }else{
            currentPlayer = "X";  
        }
        setTimeout(()=>{
            changePlayer(); 
        },500);
    }else{
        alert("Box is full");
    }
}

// ya to jitega (true) ya fir draw (true) or can still continue
function checkWin(){
    let haveEmpty = false; 
    for(let triplate of winningPos){
        if(gameGrid[triplate[0]]!== "" && gameGrid[triplate[1]]!=="" && 
        gameGrid[triplate[2]]!==""){
            let mark1 = gameGrid[triplate[0]]; 
            let mark2 = gameGrid[triplate[1]]; 
            let mark3 = gameGrid[triplate[2]]; 
            if(mark1 === mark2 && mark2===mark3){
                boxes[triplate[0]].classList.add("bg-green");
                boxes[triplate[1]].classList.add("bg-green");
                boxes[triplate[2]].classList.add("bg-green");
                currPlayerDiv.classList.remove("activeBlock"); 
                changeWinner();
                wonPlayerDiv.classList.add("activeBlock");
                btnDiv.classList.add("active"); 
                // newGame.classList.add("active"); 
                status = 1; 
                start(); 
                stop(); 
                return true; 
            }
        }else{
            haveEmpty = true; 
        }
    }

    // draw
    if(haveEmpty===false){
        currPlayerDiv.classList.remove("activeBlock"); 
        drawDiv.classList.add("activeBlock"); 
        btnDiv.classList.add("active");
        // newGame.classList.add("active");
        status = 1; 
        return true; 
    } 

    // still can continue
    return false; 
    
}

function changePlayer(){
    if(currentPlayer === "X")
        currPlayer.innerText = `${p1}`;
    else
        currPlayer.innerText = `${p2}`;
}

function changeWinner(){
    if(currentPlayer === "X")
        wonPlayer.innerText = `${p1}`; 
    else
        wonPlayer.innerText = `${p2}`;
}

// confetti handle
function start(){
    confetti.start(); 
}

function stop(){
   setTimeout(()=>{
    confetti.stop(); 
   }, 3000)
}

