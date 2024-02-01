// 遊戲變量
let canvas;
let context;
let box = 32;
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};

// 畫遊戲區域
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// 畫蛇
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// 畫食物
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// 控制蛇的移動
document.addEventListener('keydown', update);
function update(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') direction = 'LEFT';
    if (event.keyCode == 38 && direction != 'DOWN') direction = 'UP';
    if (event.keyCode == 39 && direction != 'LEFT') direction = 'RIGHT';
    if (event.keyCode == 40 && direction != 'UP') direction = 'DOWN';
}

// 開始遊戲
function startGame() {
    if (snake[0].x > 15 * box && direction == "RIGHT") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'LEFT') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'DOWN') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'UP') snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "RIGHT") snakeX += box;
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// 初始化遊戲
function init() {
    canvas = document.getElementById('snake-game');
    context = canvas.getContext('2d');
    game = setInterval(startGame, 100);
}

window.onload = init;