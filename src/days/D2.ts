export function star1(data: string) {
  const isSafe = (record: number[]): boolean => {
    const isIncreasing = record[0] < record[1]
    for (let i = 1; i < record.length; i++) {
      if (record[i - 1] === record[i]) return false
      if ((record[i - 1] < record[i]) !== isIncreasing) return false
      const diff = Math.abs(record[i] - record[i - 1])
      if (diff < 1 || diff > 3) return false
    }
    return true
  }

  let sum = 0
  for (const line of data.split('\n')) {
    const record = line.split(' ').map(Number)
    if (isSafe(record)) {
      sum++
    }
  }
  console.log(sum)
}

export function star2(data: string) {
  const isSafe = (record: number[], acceptError = true): boolean => {
    const isIncreasing = record[0] < record[1]
    for (let i = 1; i < record.length; i++) {
      let ok = true
      if (record[i - 1] === record[i]) ok = false
      if ((record[i - 1] < record[i]) !== isIncreasing) ok = false
      const diff = Math.abs(record[i] - record[i - 1])
      if (diff < 1 || diff > 3) ok = false
      if (ok) continue
      if (!acceptError) return false

      const removedLeft = record.filter((_, index) => index !== i - 1)
      if (isSafe(removedLeft, false)) return true

      const removedRight = record.filter((_, index) => index !== i)
      return isSafe(removedRight, false)
    }
    return true
  }
  let sum = 0
  for (const line of data.split('\n')) {
    const record = line.split(' ').map(Number)
    const [_, ...rec] = record
    if (isSafe(rec, false) || isSafe(record)) {
      sum++
    }
  }
  console.log(sum)
}
