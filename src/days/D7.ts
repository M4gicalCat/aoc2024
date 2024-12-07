export const star1 = (data: string) => {
	const increment = (arr: number[], i = 0) => {
		if (arr[i] === 1) {
			arr[i] = 0
			if (i < arr.length - 1) return increment(arr, i + 1)
		}
		arr[i] = 1
	}
	const operations = data.split('\n')
	let sum = 0
	for (const line of operations) {
		const [result, ...numbers] = line.split(' ').map(a => Number(a.replace(':', '')))
		const operators = Array<number>(numbers.length - 1).fill(0)
		for (let i =0; i < Math.pow(2, numbers.length - 1) ; i++) {
			let total = numbers[0];
			for (let n = 0; n < numbers.length - 1; n++) {
				if (operators[n] === 0) total += numbers[n + 1]
				else total *= numbers[n + 1]
			}
			if (result === total) {
				sum += total
				break
			}
			increment(operators)
		}
	}
	console.log(sum);
}

export const star2 = (data: string) => {
	const increment = (arr: number[], i = 0) => {
		if (arr[i] === 2) {
			arr[i] = 0
			if (i < arr.length - 1) return increment(arr, i + 1)
		}
		arr[i]++
	}
	const operations = data.split('\n')
	let sum = 0
	for (const line of operations) {
		const [result, ...numbers] = line.split(' ').map(a => Number(a.replace(':', '')))
		const operators = Array<number>(numbers.length - 1).fill(0)
		for (let i =0; i < Math.pow(3, numbers.length - 1) ; i++) {
			let total = numbers[0];
			for (let n = 0; n < numbers.length - 1; n++) {
				if (operators[n] === 0) total += numbers[n + 1]
				else if (operators[n] === 1) total *= numbers[n + 1]
				else total = +`${total}${numbers[n + 1]}`
			}
			if (result === total) {
				sum += total
				break
			}
			increment(operators)
		}
	}
	console.log(sum);
}
