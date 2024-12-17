export const star1 = (data: string) => {
  const grid = data.split('\n').map((line) => line.split(''))
  const read = new Set<`${number}|${number}`>()

  let sum = 0
  const getSum = (letter: string, x: number, y: number): number => {
    if (read.has(`${x}|${y}`)) return { area: 0, perimeter: 0 }
    read.add(`${x}|${y}`)
    return [
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
      [x - 1, y],
    ].reduce(
      (acc, [x, y]) => {
        if (grid[y]?.[x] !== letter)
          return { area: acc.area, perimeter: acc.perimeter + 1 }
        const here = getSum(letter, x, y)
        return {
          area: acc.area + here.area,
          perimeter: acc.perimeter + here.perimeter,
        }
      },
      { area: 1, perimeter: 0 },
    )
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (read.has(`${x}|${y}`)) continue
      const letter = grid[y][x]
      const { area, perimeter } = getSum(letter, x, y)
      sum += area * perimeter
    }
  }
  console.log(sum)
}

export const star2 = (data: string) => {
  const isCorner = (
    letter: string,
    side1: string,
    side2: string,
    corner: string,
  ) => {
    // Aa
    // ab
    if (side1 === side2 && side1 === letter && corner !== letter) return true
    // Ab
    // bb
    if (side1 !== letter && side2 !== letter) return true
    return false
  }
  const grid = data.split('\n').map((line) => line.split(''))
  const read = new Set<`${number}|${number}`>()

  let sum = 0
  const getSum = (letter: string, x: number, y: number): number => {
    if (read.has(`${x}|${y}`)) return { area: 0, perimeter: 0 }
    read.add(`${x}|${y}`)
    const [TL, T, TR, L, R, BL, B, BR] = [
      grid[y - 1]?.[x - 1],
      grid[y - 1]?.[x],
      grid[y - 1]?.[x + 1],
      grid[y]?.[x - 1],
      grid[y]?.[x + 1],
      grid[y + 1]?.[x - 1],
      grid[y + 1]?.[x],
      grid[y + 1]?.[x + 1],
    ]

    const corners = [
      isCorner(letter, T, L, TL),
      isCorner(letter, T, R, TR),
      isCorner(letter, B, L, BL),
      isCorner(letter, B, R, BR),
    ].filter((a) => a)

    return [
      [x + 1, y],
      [x, y + 1],
      [x, y - 1],
      [x - 1, y],
    ].reduce(
      (acc, [x, y]) => {
        if (grid[y]?.[x] !== letter) return acc
        const here = getSum(letter, x, y)

        return {
          area: acc.area + here.area,
          perimeter: acc.perimeter + here.perimeter,
        }
      },
      { area: 1, perimeter: corners.length },
    )
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (read.has(`${x}|${y}`)) continue
      const letter = grid[y][x]
      const { area, perimeter } = getSum(letter, x, y)
      sum += area * perimeter
    }
  }
  console.log(sum)
}
