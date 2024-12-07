export const star1 = (data: string) => {
  const [tmpRules, tmpUpdates] = data.split('\n\n')
  const rules = new Set<string>(tmpRules.split('\n'))
  const updates = tmpUpdates.split('\n')

  let sum = 0

  for (const update of updates) {
    const array = update.split(',')
    const sorted = array.sort((a, b) =>
      rules.has(`${a}|${b}`) ? -1 : rules.has(`${b}|${a}`) ? 1 : 0
    )
    if (sorted.join(',') === update) {
      sum += +sorted[Math.floor(sorted.length / 2)]
    }
  }

  console.log(sum)
}

/**
 * lmao just 1 character is different from star1
 */
export const star2 = (data: string) => {
  const [tmpRules, tmpUpdates] = data.split('\n\n')
  const rules = new Set<string>(tmpRules.split('\n'))
  const updates = tmpUpdates.split('\n')

  let sum = 0

  for (const update of updates) {
    const array = update.split(',')
    const sorted = array.sort((a, b) =>
      rules.has(`${a}|${b}`) ? -1 : rules.has(`${b}|${a}`) ? 1 : 0
    )
    if (sorted.join(',') !== update) {
      sum += +sorted[Math.floor(sorted.length / 2)]
    }
  }

  console.log(sum)
}
