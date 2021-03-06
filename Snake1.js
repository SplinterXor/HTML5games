'use strict'
var SNAKE = SNAKE || {}

SNAKE = {

// Pulls in canvas element
  canvas: document.getElementById('canvas'),

  ctx: document.getElementById('canvas').getContext('2d'),

// Variable that keeps track of the grid.
  gridSystem: [],

// Create a gridSystem in order to keep control over the map.
// This function does also draw out the background to canvasBg.
  createGridSystem: function () {
    for (var y = 20; y < 680; y += 20) {
      for (var x = 20; x < 680; x += 20) {
        SNAKE.gridSystem.push([x, y])
      }
    }
  },
// Function that gives SNAKE.appleX and SNAKE.appleY cordinates and checks if there is a collision between apple and snake.
  rand: function () {
    var trueOrFalse = true
    var number
    while (trueOrFalse) {
      number = Math.floor(Math.random() * SNAKE.gridSystem.length)
      for (var i = 0; i < SNAKE.snakeList.length; i += 1) {
        if (SNAKE.gridSystem[number][0] === SNAKE.snakeList[i][0] && SNAKE.gridSystem[number][1] === SNAKE.snakeList[i][1]) {
          console.log('You have failed this city!')
          break
        }else if (SNAKE.snakeList.length === i + 1) {
          SNAKE.appleX = SNAKE.gridSystem[number][0]
          SNAKE.appleY = SNAKE.gridSystem[number][1]
          trueOrFalse = false
        }
      }
    }
    trueOrFalse = true
  },

// creating the apple image.
  initAppleImage: function () {
    SNAKE.appleImage = document.createElement('img')
    SNAKE.appleImage.src = 'images/red-apple20x20.png'
  },

// Function that stops the loop and then displays "GAME OVER" and the gameScore.
  gameOverScreen: function () {
    window.cancelAnimationFrame(SNAKE.gameLoop)
    clearTimeout(SNAKE.timeOut)
    SNAKE.ctx.fillStyle = '#222222'
    SNAKE.ctx.fillRect(140, 230, 400, 150)
    SNAKE.ctx.font = '60px Georgia'
    SNAKE.ctx.fillStyle = 'white'
    SNAKE.ctx.fillText('GAME OVER', 160, 300)
    SNAKE.ctx.font = '20px Georgia'
    SNAKE.ctx.fillText('Game Score: ' + SNAKE.gameScore, 200, 350)
    SNAKE.ctx.font = '13px Georgia'
    SNAKE.ctx.fillText('Play again? (y/n)', 400, 350)
    window.removeEventListener('keydown', SNAKE.controls, false)
    window.addEventListener('keydown', SNAKE.gameOverControls, false)

  },

  gameOverControls: function (event) {
    switch (event.keyCode) {
      case 89:
        SNAKE.gameScore = 0
        SNAKE.snakeList = [[80, 40]]
        SNAKE.snakeY = 40
        SNAKE.snakeX = 80
        SNAKE.snakeXchange = 0
        SNAKE.snakeYchange = 0
        SNAKE.init()
        window.removeEventListener('keydown', SNAKE.gameOverControls, false)
        break
    }

  },

// variable to store the apple image.
  appleImage: undefined,

// Array that will keep track of where the snake parts are located in the grid.
  snakeList: [[80, 40]],

// Variable that keeps track of the snakes change in X
  snakeXchange: 0,

// Variable that keeps track of the snakes change in Y
  snakeYchange: 0,

// Variable that will hold the current X value of the snake.
  snakeX: 80,

// Variable that will hold the current Y value of the snake.
  snakeY: 40,

// Variable that stores the gameScore.
  gameScore: 0,

// Variable that is used to stop requestAnimationFrame(SNAKE.draw).
  gameLoop: undefined,

// Variable that is used to stop setTimeout.
  timeOut: undefined,

  pauseMode: false,

// The first function that is called. implements controls, Gridsystem and initiates the animation loop..
  init: function () {
    window.addEventListener('keydown', SNAKE.controls, false)

    SNAKE.createGridSystem()
    SNAKE.initAppleImage()
    SNAKE.rand()

    SNAKE.draw()
  },

  keyLock: false,

// Function that will check for if the user have pressed any of the arrow keys.
  controls: function (event) {
    if (event.keyCode <= 40 && event.keyCode >= 37 && SNAKE.keyLock === false || event.keyCode === 80 && SNAKE.keyLock === false || SNAKE.pauseMode) {
      switch (event.keyCode) {
        // Left arrow
        case 37:
          if (SNAKE.snakeXchange <= 0) {
            SNAKE.snakeXchange = -20
            SNAKE.snakeYchange = 0
          }
        break
        // up arrow
        case 38:
          if (SNAKE.snakeYchange <= 0) {
            SNAKE.snakeYchange = -20
            SNAKE.snakeXchange = 0
          }
          break
        // right arrow
        case 39:
          if (SNAKE.snakeXchange >= 0) {
            SNAKE.snakeXchange = 20
            SNAKE.snakeYchange = 0
          }
          break
        // down arrow
        case 40:
          if (SNAKE.snakeYchange >= 0) {
            SNAKE.snakeYchange = 20
            SNAKE.snakeXchange = 0
          }
          break
        case 80:
          if (SNAKE.pauseMode === false) {
            window.cancelAnimationFrame(SNAKE.gameLoop)
            clearTimeout(SNAKE.timeOut)
            SNAKE.pauseMode = true
            SNAKE.ctx.font = '60px Georgia'
            SNAKE.ctx.fillStyle = 'white'
            SNAKE.ctx.fillText('PAUSE', 240, 300)
          }else {
            SNAKE.pauseMode = false
            SNAKE.draw()
          }
          break
      }
      SNAKE.keyLock = true
    }
  },

// Function that will check if there is a collision between the snake and the grids surrounding wall or obstacles.
  collisionDetection: function () {
    for (var i = 4; i < SNAKE.snakeList.length; i += 1) {
      if (SNAKE.snakeList[0][0] === SNAKE.snakeList[i][0] && SNAKE.snakeList[0][1] === SNAKE.snakeList[i][1]) {
        SNAKE.gameOverScreen()
      }
    }
    if (SNAKE.appleX >= SNAKE.snakeX && SNAKE.appleX <= SNAKE.snakeX + 20 &&
    SNAKE.appleY >= SNAKE.snakeY && SNAKE.appleY <= SNAKE.snakeY + 20 &&
    SNAKE.appleX + 20 >= SNAKE.snakeX && SNAKE.appleX + 20 <= SNAKE.snakeX + 20 &&
    SNAKE.appleY + 20 >= SNAKE.snakeY && SNAKE.appleY + 20 <= SNAKE.snakeY + 20) {
      SNAKE.gameScore += 10
      console.log(SNAKE.gameScore)

      SNAKE.snakeList.push([SNAKE.snakeList[SNAKE.snakeList.length - 1][0], SNAKE.snakeList[SNAKE.snakeList.length - 1][1]])
      // SNAKE.snakeList.push([SNAKE.snakeList[SNAKE.snakeList.length - 1][1]])
      SNAKE.rand()
    }
    if (SNAKE.snakeList[0][0] < 0 || SNAKE.snakeList[0][0] > 700 ||
    SNAKE.snakeList[0][1] < 0 || SNAKE.snakeList[0][1] > 700) {
      SNAKE.gameOverScreen()
    }
  },

// Function that draws the snake and the apple to the screen and updates.
  draw: function () {
    SNAKE.timeOut = setTimeout(function () {
      SNAKE.gameLoop = window.requestAnimationFrame(SNAKE.draw)
      SNAKE.ctx.clearRect(0, 0, SNAKE.canvas.width, SNAKE.canvas.height)
      SNAKE.snakeX += SNAKE.snakeXchange
      SNAKE.snakeY += SNAKE.snakeYchange

      SNAKE.snakeList.pop()
      SNAKE.snakeLength = SNAKE.snakeList.unshift([SNAKE.snakeX, SNAKE.snakeY])

      SNAKE.ctx.drawImage(SNAKE.appleImage, SNAKE.appleX, SNAKE.appleY)
      for (var i = 0; i < SNAKE.snakeList.length; i += 1) {
        SNAKE.ctx.fillStyle = 'rgba(0, 204, 0, 1)'
        SNAKE.ctx.strokeStyle = 'black'

        SNAKE.ctx.beginPath()
        SNAKE.ctx.arc(SNAKE.snakeList[i][0] + 10, SNAKE.snakeList[i][1] + 10, 10, 0, 2 * Math.PI, false)
        SNAKE.ctx.closePath()
        SNAKE.ctx.fill()
        SNAKE.ctx.stroke()
        // SNAKE.ctx.fillRect(SNAKE.snakeList[i][0], SNAKE.snakeList[i][1], 19, 19)
      }
      SNAKE.collisionDetection()
      SNAKE.keyLock = false
    }, 1000 / 6)
  }
}
// Starts when the page is fully loaded.
window.addEventListener('load', SNAKE.init, false)
