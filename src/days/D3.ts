'use strict'

export function star1(data: string) {
  const regex = /(mul\(\d{1,3},\d{1,3}\))/g
  let found
  let sum = 0

  while ((found = regex.exec(data)) !== null) {
    console.log(found[0])

    const [n1, n2] = found[0].slice(4, -1).split(',').map(Number)
    sum += n1 * n2
  }

  console.log(sum)
}

// best guess so far : /(?<!don't\(\)(.|\n)*(?<!do\(\))).(mul\(\d{1,3},\d{1,3}\))/g

/*
 * Current regex finds mul(number,number), but can get a character before;
 * shit ass
 */

export function star2(data: string) {
  const getIndexes = (regex: RegExp, fullData) => {
    const indexes = []
    let found
    while ((found = regex.exec(data)) !== null) {
      indexes.push(fullData ? found : found.index)
    }
    return indexes
  }
  const regex = {
    mul: /(mul\(\d{1,3},\d{1,3}\))/g,
    do: /(do\(\))/g,
    dont: /(don't\(\))/g,
  }

  const doIndexes = getIndexes(regex.do).sort((a, b) => a - b)
  const dontIndexes = getIndexes(regex.dont).sort((a, b) => a - b)
  const mulIndexes = getIndexes(regex.mul, true)

  let sum = 0

  for (const { index: mulIndex, ...mul } of mulIndexes) {
    const lastDo = doIndexes.findLast((i) => i < mulIndex) ?? -1
    const lastDont = dontIndexes.findLast((i) => i < mulIndex) ?? -1
    if (lastDont > lastDo) {
      continue
    }
    const [n1, n2] = mul[0].slice(4, -1).split(',').map(Number)
    sum += n1 * n2
  }
  console.log(sum)
}
