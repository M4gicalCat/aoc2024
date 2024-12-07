import { aocData } from './data.ts'

const day = +Deno.args[0]
const part = +Deno.args[1]
const data = aocData(day)[Deno.args[2] === 'test' ? 'test' : 'real']

const { [`star${part}`]: run } = await import(`./days/D${day}.ts`)

console.time(`running part ${part} of day ${day}`)
run(data)
console.timeEnd(`running part ${part} of day ${day}`)
