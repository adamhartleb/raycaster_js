import * as p5 from 'p5'

const TILE_SIZE = 32
const MAP_NUM_ROWS = 11
const MAP_NUM_COLS = 15

const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE
const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE

class Map {
  constructor(scene) {
    this.scene = scene
    this.grid = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }

  render() {
    for (let i = 0; i < MAP_NUM_ROWS; i++) {
      for (let j = 0; j < MAP_NUM_COLS; j++) {
        const tileX = j * TILE_SIZE
        const tileY = i * TILE_SIZE
        const tileColor = this.grid[i][j] === 1 ? '#222' : '#fff'
        this.scene.stroke('#222')
        this.scene.fill(tileColor)
        this.scene.rect(tileX, tileY, TILE_SIZE, TILE_SIZE)
      }
    }
  }
}

const initializeP5 = scene => {
  const grid = new Map(scene)

  scene.setup = () => {
    scene.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT)
  }

  scene.update = () => {}

  scene.draw = () => {
    grid.render()
  }
}

new p5(initializeP5)
