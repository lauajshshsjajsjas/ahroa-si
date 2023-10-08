let snake = [[2, 2]]
let apple = [0, 0]
let dx = 1
let dy = 0
let score = 0

function draw() {
    basic.clearScreen()
    for (let segment of snake) {
        led.plot(segment[0], segment[1])
    }
    led.plot(apple[0], apple[1])
}

function move() {
    let newHead = [snake[0][0] + dx, snake[0][1] + dy]
    snake.unshift(newHead)
    if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
        apple = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]
        score += 1
    } else {
        snake.pop()
    }
}

function checkCollision() {
    let head = snake[0]
    if (head[0] < 0 || head[0] >= 5 || head[1] < 0 || head[1] >= 5) {
        game.gameOver()
    }
    for (let i = 1; i < snake.length; i++) {
        if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
            game.gameOver()
        }
    }
}

input.onButtonPressed(Button.A, function () {
    if (dx === 0) {
        dx = -1
        dy = 0
    }
})

input.onButtonPressed(Button.B, function () {
    if (dx === 0) {
        dx = 1
        dy = 0
    }
})

basic.forever(function () {
    move()
    checkCollision()
    draw()
    basic.pause(400)  // Ajusta la velocidad del juego según tus preferencias
})
