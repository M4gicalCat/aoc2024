enum DIR {
	N,
	E,
	S,
	W
}

export const star1 = (data: string) => {
	const grid = data.split('\n').map(line => line.split(''))
	const visited = new Set<`${string}|${string}`>()
	let x
	let y = grid.findIndex(line => {
		const index = line.indexOf('^')
		if (index === -1) return false
		x = index
		return true
	})

	let direction = DIR.N

	const move = () => {
		visited.add(`${x}|${y}`)
		const nextPosition = {x,y}
		switch (direction) {
			case DIR.N:
				nextPosition.y--
				break
			case DIR.E:
				nextPosition.x++
				break
			case DIR.S:
				nextPosition.y++
				break
			case DIR.W:
				nextPosition.x--
				break
		}

		const nextStep = grid[nextPosition.y]?.[nextPosition.x]

		// got out of the map
		if (!nextStep) return false

		if (nextStep === '#') {
			// rotate 90° clockwise
			direction = (direction + 1) % 4
		} else {
			// advance
			x = nextPosition.x
			y = nextPosition.y
		}
		return true
	}

	while (move()) {}
	console.log(visited.size);
}

/**
 * I hate that it works
 * Basically it tries every possible position for a crate, and adds 1 to the sum if it loops
 */
export const star2 = (data: string) => {
	const grid = data.split('\n').map(line => line.split(''))
	let initialX
	let initialY = grid.findIndex(line => {
		const index = line.indexOf('^')
		if (index === -1) return false
		initialX = index
		return true
	})
	const isLoop = (grid: string[][])=> {
		const visited = new Map<`${string}|${string}`, [boolean, boolean, boolean, boolean]>()
		let x = initialX
		let y = initialY

		let direction = DIR.N
		const move = () => {
			const newVisit = visited.get(`${x}|${y}`) ?? [false, false, false, false]
			if (newVisit[direction]) return false
			newVisit[direction] = true
			visited.set(`${x}|${y}`, newVisit)
			const nextPosition = {x,y}
			switch (direction) {
				case DIR.N:
					nextPosition.y--
					break
				case DIR.E:
					nextPosition.x++
					break
				case DIR.S:
					nextPosition.y++
					break
				case DIR.W:
					nextPosition.x--
					break
			}

			const nextStep = grid[nextPosition.y]?.[nextPosition.x]

			// got out of the map
			if (!nextStep) {
				x = nextPosition.x
				y = nextPosition.y
				return false
			}

			if (nextStep === '#') {
				// rotate 90° clockwise
				direction = (direction + 1) % 4
			} else {
				// advance
				x = nextPosition.x
				y = nextPosition.y
			}
			return true
		}
		while (move()) {}
		return !!grid[y]?.[x];
	}
let sum = 0
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (['^', '#'].includes(grid[y][x])) continue;
			grid[y][x] = '#'
			if (isLoop(grid)) {
				sum++
			}
			grid[y][x] = '.'
		}
	}
	console.log(sum);
}
