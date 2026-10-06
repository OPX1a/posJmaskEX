const player = document.getElementById('player');
const ghost = document.getElementById('ghost');

const MIN_X = 0;
const MAX_X = 400;
const MIN_Y = 0;
const MAX_Y = 400;

const MOVE_SPEED = 50;
const GHOST_SPEED = 1.2;

const HIT_DISTANCE = 25; 

let playerX = 200;
let playerY = 200;
let playerZ = 0;  
let jumpVelocity = 0;
let isJumping = false;
let isGameOver = false;
const gravity = 1.2;

let ghostX = 0;
let ghostY = 0;

function updatePlayerPosition() {
    player.style.left = playerX + 'px';

    player.style.top = (playerY - playerZ) + 'px';
}

function updateGhostPosition() {
    ghost.style.left = ghostX + 'px';
    ghost.style.top = ghostY + 'px';
}

function moveTop() {
    if (isGameOver) return;
    playerY = Math.max(MIN_Y, playerY - MOVE_SPEED);
    updatePlayerPosition();
}

function moveDown() {
    if (isGameOver) return;
    playerY = Math.min(MAX_Y, playerY + MOVE_SPEED);
    updatePlayerPosition();
}

function moveLeft() {
    if (isGameOver) return;
    playerX = Math.max(MIN_X, playerX - MOVE_SPEED);
    updatePlayerPosition();
}

function moveRight() {
    if (isGameOver) return;
    playerX = Math.min(MAX_X, playerX + MOVE_SPEED);
    updatePlayerPosition();
}

function jump() {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        jumpVelocity = 18; 
    }
}


window.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const key = event.key.toLowerCase();
    
    if (key === 'w' || key === 'arrowup') moveTop();
    if (key === 's' || key === 'arrowdown') moveDown();
    if (key === 'a' || key === 'arrowleft') moveLeft();
    if (key === 'd' || key === 'arrowright') moveRight();
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
});


function gameLoop() {
    if (isGameOver) return;

    const dx = playerX - ghostX;
    const dy = playerY - ghostY;
    const distance = Math.hypot(dx, dy);

    if (distance < HIT_DISTANCE && playerZ < 20) {
        isGameOver = true;
        alert("GAME OVER! The ghost caught you! 👻");
        return;
    }

    if (distance > 1) {
        ghostX += (dx / distance) * GHOST_SPEED;
        ghostY += (dy / distance) * GHOST_SPEED;
        updateGhostPosition();
    }

    if (isJumping) {
        playerZ += jumpVelocity;
        jumpVelocity -= gravity; 

        if (playerZ <= 0) {
            playerZ = 0;
            isJumping = false;
            jumpVelocity = 0;
        }
        updatePlayerPosition();
    }

    requestAnimationFrame(gameLoop);
}

updatePlayerPosition();
updateGhostPosition();
gameLoop();