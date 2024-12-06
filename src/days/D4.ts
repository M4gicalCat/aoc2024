export const star1 = (data: string) => {
	const grid = data.split('\n').map(line => line.split(''))
	const get = {
		N: ({x, y}) => ({letter: grid[x]?.[y - 1], position: {x: x, y: y - 1}}),
		NE: ({x, y}) => ({letter: grid[x + 1]?.[y - 1], position: {x: x + 1, y: y - 1}}),
		E: ({x, y}) => ({letter: grid[x + 1]?.[y], position: {x: x + 1, y: y}}),
		SE: ({x, y}) => ({letter: grid[x + 1]?.[y + 1], position: {x: x + 1, y: y + 1}}),
		S: ({x, y}) => ({letter: grid[x]?.[y + 1], position: {x: x, y: y + 1}}),
		SW: ({x, y}) => ({letter: grid[x - 1]?.[y + 1], position: {x: x - 1, y: y + 1}}),
		W: ({x, y}) => ({letter: grid[x - 1]?.[y], position: {x: x - 1, y: y}}),
		NW: ({x, y}) => ({letter: grid[x - 1]?.[y - 1], position: {x: x - 1, y: y - 1}}),
	} satisfies Record<string, ({x, y}: { x: number, y: number }) => {
		letter: string | undefined,
		position: { x: number, y: number }
	}>
	let sum = 0

	const checkLetter = ({x, y}: { x: number, y: number }) => {
		if (grid[x]?.[y] !== 'X') return 0
		const possibilities = {
			N: {isPossible: true, position: {x, y}},
			NE: {isPossible: true, position: {x, y}},
			E: {isPossible: true, position: {x, y}},
			SE: {isPossible: true, position: {x, y}},
			S: {isPossible: true, position: {x, y}},
			SW: {isPossible: true, position: {x, y}},
			W: {isPossible: true, position: {x, y}},
			NW: {isPossible: true, position: {x, y}},
		}


		for (let nextLetter of ['M', 'A', 'S']) {
			for (const [direction, value] of Object.entries(possibilities)) {
				if (!value.isPossible) continue
				const {position, letter} = get[direction](value.position)
				if (letter !== nextLetter) value.isPossible = false
				else value.position = position
			}
		}
		return Object.values(possibilities).filter(({isPossible}) => isPossible).length
	}

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			sum += checkLetter({x, y})
		}
	}

	console.log(sum);
}


export const star2 = (data: string) => {
	const grid = data.split('\n').map(line => line.split(''))
	const get = {
		N: ({x, y}) => ({letter: grid[x]?.[y - 1], position: {x: x, y: y - 1}}),
		NE: ({x, y}) => ({letter: grid[x + 1]?.[y - 1], position: {x: x + 1, y: y - 1}}),
		E: ({x, y}) => ({letter: grid[x + 1]?.[y], position: {x: x + 1, y: y}}),
		SE: ({x, y}) => ({letter: grid[x + 1]?.[y + 1], position: {x: x + 1, y: y + 1}}),
		S: ({x, y}) => ({letter: grid[x]?.[y + 1], position: {x: x, y: y + 1}}),
		SW: ({x, y}) => ({letter: grid[x - 1]?.[y + 1], position: {x: x - 1, y: y + 1}}),
		W: ({x, y}) => ({letter: grid[x - 1]?.[y], position: {x: x - 1, y: y}}),
		NW: ({x, y}) => ({letter: grid[x - 1]?.[y - 1], position: {x: x - 1, y: y - 1}}),
	} satisfies Record<string, ({x, y}: { x: number, y: number }) => {
		letter: string | undefined,
		position: { x: number, y: number }
	}>
	let sum = 0

	const checkLetter = ({x, y}: { x: number, y: number }) => {
		if (grid[x]?.[y] !== 'A') return 0
		const possibilities = {
			// N: {isPossible: true, position: {x, y: y + 2}},
			NE: {isPossible: true, position: {x: x - 2, y: y + 2}},
			// E: {isPossible: true, position: {x: x - 2, y}},
			SE: {isPossible: true, position: {x: x - 2, y: y - 2}},
			// S: {isPossible: true, position: {x, y: y - 2}},
			SW: {isPossible: true, position: {x: x + 2, y: y - 2}},
			// W: {isPossible: true, position: {x: x + 2, y}},
			NW: {isPossible: true, position: {x: x + 2, y: y + 2}},
		}


		for (let nextLetter of ['M', 'A', 'S']) {
			for (const [direction, value] of Object.entries(possibilities)) {
				if (!value.isPossible) continue
				const {position, letter} = get[direction](value.position)
				if (letter !== nextLetter) value.isPossible = false
				else value.position = position
			}
		}

		const computed =
			[
				possibilities.NE.isPossible || possibilities.SW.isPossible,
				possibilities.SE.isPossible || possibilities.NW.isPossible
		]
		return computed[0] && computed[1] ? 1 : 0
	}

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			sum += checkLetter({x, y})
		}
	}

	console.log(sum);
}

// 1821 is too high