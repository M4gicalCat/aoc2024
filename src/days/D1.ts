export function star1(data: string) {
  const left: number[] = []
  const right: number[] = []

  for (const line of data.split('\n')) {
    let [n1, n2] = line.split('   ').map(Number)
    for (let i = 0; i <= left.length + 1 && n1 + n2 > -4; i++) {
      if (n1 >= (left[i] ?? -1)) {
        left.splice(i, 0, n1)
        n1 = -2
      }
      if (n2 >= (right[i] ?? -1)) {
        right.splice(i, 0, n2)
        n2 = -2
      }
    }
  }

  let sum = 0

  for (let i = 0; i < right.length; i++) {
    const diff = Math.abs(left[i] - right[i])
    sum += diff
  }

  console.log(sum)
}

export function star2(data: string) {
  const left: Record<number, number> = {}
  const right: Record<number, number> = {}
  for (const line of data.split('\n')) {
    let [n1, n2] = line.split('   ').map(Number)
    left[n1] = (left[n1] ?? 0) + 1
    right[n2] = (right[n2] ?? 0) + 1
  }

  let sum = 0

  for (const number in left) {
    sum += left[number] * number * (right[number] ?? 0)
  }

  console.log(sum)
}
