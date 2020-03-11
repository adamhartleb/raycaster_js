import * as p5 from 'p5'

const UP_ARROW = 'ArrowUp'
const DOWN_ARROW = 'ArrowDown'
const RIGHT_ARROW = 'ArrowRight'
const LEFT_ARROW = 'ArrowLeft'

class Map {
	#TILE_SIZE = 32
	#MAP_NUM_ROWS = 11
	#MAP_NUM_COLS = 15
	#grid = [
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

	get MAP_HEIGHT() {
		return this.#MAP_NUM_ROWS * this.#TILE_SIZE
	}

	get MAP_WIDTH() {
		return this.#MAP_NUM_COLS * this.#TILE_SIZE
	}

	get grid() {
		return this.#grid
	}

	get TILE_SIZE() {
		return this.#TILE_SIZE
	}

	render(scene) {
		for (let i = 0; i < this.#MAP_NUM_ROWS; i++) {
			for (let j = 0; j < this.#MAP_NUM_COLS; j++) {
				const tileX = j * this.#TILE_SIZE
				const tileY = i * this.#TILE_SIZE
				const tileColor = this.#grid[i][j] === 1 ? '#222' : '#fff'
				scene.stroke('#222')
				scene.fill(tileColor)
				scene.rect(tileX, tileY, this.#TILE_SIZE, this.#TILE_SIZE)
			}
		}
	}
}

class Player {
	#radius = 3
	#turnDirection = 0
	#walkDirection = 0
	#x = 0
	#y = 0
	#rotationAngle = Math.PI / 2
	#moveSpeed = 2 // px per frame
	#rotationSpeed = 2 * (Math.PI / 180)

	constructor(x, y) {
		this.#x = x
		this.#y = y
	}

	walkForward() {
		this.#walkDirection = 1
	}

	walkBackward() {
		this.#walkDirection = -1
	}

	turnRight() {
		this.#turnDirection = 1
	}

	turnLeft() {
		this.#turnDirection = -1
	}

	stopWalking() {
		this.#walkDirection = 0
	}

	stopTurning() {
		this.#turnDirection = 0
	}

	isCollision() {}

	update(map) {
		this.#rotationAngle += this.#turnDirection * this.#rotationSpeed
		const moveStep = this.#moveSpeed * this.#walkDirection

		const nextX = this.#x + Math.cos(this.#rotationAngle) * moveStep
		const nextY = this.#y + Math.sin(this.#rotationAngle) * moveStep
		const tileX = Math.floor(nextX / map.TILE_SIZE)
		const tileY = Math.floor(nextY / map.TILE_SIZE)

		if (map.grid[tileY][tileX] === 0) {
			this.#x = nextX
			this.#y = nextY
		}
	}

	render(scene) {
		scene.noStroke()
		scene.fill('red')
		scene.circle(this.#x, this.#y, this.#radius)
		scene.stroke('red')
		scene.line(
			this.#x,
			this.#y,
			this.#x + Math.cos(this.#rotationAngle) * 30,
			this.#y + Math.sin(this.#rotationAngle) * 30
		)
	}
}

const main = scene => {
	const map = new Map()
	const player = new Player(map.MAP_WIDTH / 2, map.MAP_HEIGHT / 2)

	scene.setup = () => {
		scene.createCanvas(map.MAP_WIDTH, map.MAP_HEIGHT)
	}

	scene.keyPressed = key => {
		switch (key.code) {
			case UP_ARROW:
				player.walkForward()
				break
			case DOWN_ARROW:
				player.walkBackward()
				break
			case RIGHT_ARROW:
				player.turnRight()
				break
			case LEFT_ARROW:
				player.turnLeft()
				break
			default:
		}
	}

	scene.keyReleased = key => {
		switch (key.code) {
			case UP_ARROW:
			case DOWN_ARROW:
				player.stopWalking()
				break
			case RIGHT_ARROW:
			case LEFT_ARROW:
				player.stopTurning()
				break
			default:
		}
	}

	scene.draw = () => {
		map.render(scene)
		player.update(map)
		player.render(scene)
	}
}

new p5(main)
