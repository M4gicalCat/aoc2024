export const star1 = (data: string) => {
  const grid = data.split('\n').map((line) => line.split(''))
  const MAX_WIDTH = grid[0].length
  const MAX_HEIGHT = grid.length
  const antennas = new Map<string, { x: number; y: number }[]>()
  const antiNodes = new Set<string>()

  const addAntenna = (
    antenna: string,
    location: { x: number; y: number },
  ): void => {
    if (antenna === '.') return
    const existing = antennas.get(antenna) ?? []
    antennas.set(antenna, [...existing, location])
  }

  for (let y = 0; y < MAX_HEIGHT; y++) {
    for (let x = 0; x < MAX_WIDTH; x++) {
      addAntenna(grid[y][x], { x, y })
    }
  }

  for (const locations of antennas.values()) {
    for (const locationA of locations) {
      for (const locationB of locations) {
        if (locationB === locationA) continue

        const diffX = locationA.x - locationB.x
        const diffY = locationA.y - locationB.y
        const antiNode = { x: locationA.x + diffX, y: locationA.y + diffY }
        if (
          antiNode.y < 0 ||
          antiNode.y >= MAX_HEIGHT ||
          antiNode.x < 0 ||
          antiNode.x >= MAX_WIDTH
        ) continue
        antiNodes.add(`${antiNode.x}|${antiNode.y}`)
      }
    }
  }

  console.log(antiNodes.size)
}

export const star2 = (data: string) => {
  const grid = data.split('\n').map((line) => line.split(''))
  const MAX_WIDTH = grid[0].length
  const MAX_HEIGHT = grid.length
  const antennas = new Map<string, { x: number; y: number }[]>()
  const antiNodes = new Set<string>()

  const addAntenna = (
    antenna: string,
    location: { x: number; y: number },
  ): void => {
    if (antenna === '.') return
    const existing = antennas.get(antenna) ?? []
    antennas.set(antenna, [...existing, location])
  }

  for (let y = 0; y < MAX_HEIGHT; y++) {
    for (let x = 0; x < MAX_WIDTH; x++) {
      addAntenna(grid[y][x], { x, y })
    }
  }

  for (const locations of antennas.values()) {
    for (const locationA of locations) {
      for (const locationB of locations) {
        if (locationB === locationA) continue
        const posA = { x: locationA.x, y: locationA.y }
        const posB = { x: locationB.x, y: locationB.y }
        const diffX = posA.x - posB.x
        const diffY = posA.y - posB.y
        let antiNode = { ...posA }
        while (
          antiNode.y >= 0 &&
          antiNode.y < MAX_HEIGHT &&
          antiNode.x >= 0 &&
          antiNode.x < MAX_WIDTH
        ) {
          antiNodes.add(`${antiNode.x}|${antiNode.y}`)
          antiNode = { x: antiNode.x + diffX, y: antiNode.y + diffY }
        }
      }
    }
  }

  console.log(antiNodes.size)
}
