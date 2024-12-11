export const star1 = (data: string) => {
  const getId = (index: number) => index / 2
  let leftIndex = 1
  let rightIndex = data.length - 1
	let position = +data[0]
  let sum = 0
  let isBlankRight = data.length % 2 === 0
  // only start on a file
  if (isBlankRight) {
    rightIndex--
  }

	let empty = +data[1]

  for (; rightIndex > leftIndex; rightIndex -= 2) {
    const size = +data[rightIndex]
    for (let i = 0; i < size; i++) {
			if (empty === 0) {
				leftIndex++
				for (let j = 0; j < +data[leftIndex] - (leftIndex === rightIndex ? i : 0); j++) {
					sum += (getId(leftIndex) * position)
					position++
				}
				leftIndex++
				empty = +data[leftIndex]
				i--
				if (rightIndex < leftIndex) break
				continue
			}


			sum += (getId(rightIndex) * position)
			position++
			empty--
    }
  }

	console.log(sum);
}

export const star2 = (data: string) => {
	let maxIndex = data.length % 2 !== 0 ? data.length - 1 : data.length
	const getId = (index: number) => index / 2
	const updated = new Set<number>()

	let sum = 0
	let position = +data[0]

	for (let blankIndex = 1; blankIndex < data.length; blankIndex += 2) {
		let size = +data[blankIndex]
		for (let fileIndex = maxIndex; fileIndex > blankIndex; fileIndex -= 2) {
			if (+data[fileIndex] > size) continue
			const id = getId(fileIndex)
			if (updated.has(id)) continue
			for (let i = 0; i < +data[fileIndex]; i++) {
				sum += (id * position)
				position++
			}
			updated.add(id)
			size -= +data[fileIndex]
		}
		position += size
		const id = getId(blankIndex + 1)
		if (updated.has(id)) {
			position += +data[blankIndex + 1]
			continue
		}
		for (let i = 0; i < +data[blankIndex + 1]; i++) {
			sum += id * position;
			position++
		}
	}

	console.log(sum)
}
