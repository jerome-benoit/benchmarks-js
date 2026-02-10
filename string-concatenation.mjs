import { Bench } from 'tinybench'

const str1 = 'Hello'
const str2 = 'World'
const str3 = 'JavaScript'
const str4 = 'Benchmark'
const str5 = 'Test'

const bench = new Bench({
  name: 'String concatenation',
  time: 100,
})

bench
  .add('+ operator', () => {
    return str1 + ' ' + str2 + ' ' + str3 + ' ' + str4 + ' ' + str5
  })
  .add('template literal', () => {
    return `${str1} ${str2} ${str3} ${str4} ${str5}`
  })
  .add('concat()', () => {
    return str1.concat(' ', str2, ' ', str3, ' ', str4, ' ', str5)
  })
  .add('array join', () => {
    return [str1, str2, str3, str4, str5].join(' ')
  })

await bench.run()

console.table(bench.table())
