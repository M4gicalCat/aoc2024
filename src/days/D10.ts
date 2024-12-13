export const star1 = (data: string) => {
  const map = data.split('\n').map(line => line.split('').map(Number))
	const findTrails = ({x,y}: {x: number; y: number}, current: number = 0): `${number}|${number}`[] => {
		if (map[y]?.[x] !== current) return []
		if (current === 9) return [`${x}|${y}`]
		const arr = []
		arr.push(...findTrails({x: x + 1, y}, current + 1))
		arr.push(...findTrails({x, y: y + 1}, current + 1))
		arr.push(...findTrails({x: x - 1, y}, current + 1))
		arr.push(...findTrails({x, y: y - 1}, current + 1))
		return current === 0 ? Array.from(new Set(arr)) : arr
	}
	let sum = 0
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			sum += findTrails({x,y}).length
		}
	}
	console.log(sum)
}

export const star2 = (data: string) => {
	const map = data.split('\n').map(line => line.split('').map(Number))
	const findTrails = ({x,y}: {x: number; y: number}, current: number = 0): `${number}|${number}`[] => {
		if (map[y]?.[x] !== current) return []
		if (current === 9) return [`${x}|${y}`]
		const arr = []
		arr.push(...findTrails({x: x + 1, y}, current + 1))
		arr.push(...findTrails({x, y: y + 1}, current + 1))
		arr.push(...findTrails({x: x - 1, y}, current + 1))
		arr.push(...findTrails({x, y: y - 1}, current + 1))
		return arr
	}
	let sum = 0
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			sum += findTrails({x,y}).length
		}
	}
	console.log(sum)
}
