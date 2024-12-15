export const star1 = (data: string) => {
  const updateStone = (s: `${number}`) => {
    if (s === '0') return ['1']
    if (s.length % 2 === 0)
      return [s.slice(0, s.length / 2), (+s.slice(s.length / 2)).toString()]
    return [(+s * 2024).toString()]
  }
  let stones = data.split(' ')
  for (let i = 0; i < 25; i++) {
    stones = stones.flatMap(updateStone)
  }
  console.log(stones.length)
}

// spent fucking too much time on that fucking puzzle 'cause I thought I needed math to calculate cycles and shit WHEN IT WAS THAT FUCKING SIMPLE OF DON'T DO THE SAME THING TWICE I HATE MYSELF
export const star2 = (data: string) => {
  const updateStone = (s: `${number}`) => {
    if (s === '0') return ['1']
    if (s.length % 2 === 0)
      return [s.slice(0, s.length / 2), (+s.slice(s.length / 2)).toString()]
    return [(+s * 2024).toString()]
  }
  let stones = data.split(' ').map((s) => [s, 1])
  const toSorted = (stones) => {
    const map = new Map()
    for (const [stone, val] of stones) {
      const n = map.get(stone) ?? 0
      map.set(stone, n + val)
    }
    return Array.from(map.entries())
  }
  for (let i = 0; i < 75; i++) {
    stones = toSorted(stones).flatMap(([stone, val]) => {
      const next = updateStone(stone)
      return next.map((s) => [s, val])
    })
  }
  console.log(stones.reduce((acc, [, i]) => acc + i, 0))
}
