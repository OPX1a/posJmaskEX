const player = document.getElementById('player');
const ghost = document.getElementById('ghost');
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');

let playerX = 200;
let playerY = 200;

let ghostX = 0;
let ghostY = 0;
player.style.left = playerX + 'px';
player.style.top = playerY + 'px';


function movePlayer(){
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}
function moveTop() {
    playerY -= 10;
    movePlayer();
}
function moveDown() {
    playerY += 10;
    movePlayer();
}
function moveLeft() {
    playerX -= 10;
    movePlayer();
}
function moveRight() {
    playerX += 10;
    movePlayer();
}


function moveTop() {
    if (playerY >= 400) {
        return;
    }
    playerY -= 10;
    movePlayer();
}
function moveDown() {
    if (playerY >= 400) {
        return;
    }
    playerY += 10;
    movePlayer();
}
function moveLeft() {
    if (playerX >= 400) {
        return;
    }
    playerX -= 10;
    movePlayer();
}
function moveRight() {
    if (playerX >= 400) {
        return;
    }
    playerX += 10;
    movePlayer();
}