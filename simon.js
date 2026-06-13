let highest_scr = 0;
let userSeq = [];
let gameSeq = [];
let colors = ["red","yellow","green","purple"];
let scr = document.querySelector("#score");

let started = false;
let level = 0;

document.addEventListener("keypress",function(){
    if(event.code == "KeyS" && started == false){
        console.log("Game Started");
        started = true; 
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },350);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },350);
}

let h2 = document.querySelector("h2");

function levelUp(){
    level++;
    //select a random button 
    let ran = Math.floor(Math.random() * 4);
    let btn = document.querySelector(`.${colors[ran]}`);
    gameSeq.push(colors[ran]);
    console.log(gameSeq);
    gameFlash(btn);
    h2.innerText = `Level ${level}`;
    userSeq = [];
}


function outOfGame(){
    if(highest_scr < level - 1){
        highest_scr = level - 1;
        let h3 = document.querySelector("h3");
        h3.innerText = `Highest Score ${highest_scr}`;
        h2.innerHTML = `GAME OVER!Congrats, You Achieved Highest Score ${highest_scr}.<br> Press key "S" to Start`;
    }
    else {
        h2.innerHTML = `GAME OVER!Your Score is ${level - 1}.<br> Press key "S" to Start`;
    }
    
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
    document.querySelector("body").style.backgroundColor = "";
    },300);
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function checkAns(cnt){
    if(userSeq[cnt] == gameSeq[cnt]){
        if(cnt == level - 1){
            setTimeout(levelUp,1000);
        }
    }
    else {
        outOfGame();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(ele of allBtns){
    ele.addEventListener("click",btnPress);
}

let quit = document.querySelector("button");
quit.addEventListener("click",outOfGame);
