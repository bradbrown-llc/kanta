import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abi } from '../../schemas/abi/mod.ts'
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = Deno.readTextFileSync('./Resolver.sol')
const result = await client.compile(code)

Deno.test('abi in result', () => {
    assertEquals('abi' in result['Resolver'], true)
})

Deno.test('bytecode in result', () => {
    assertEquals('bytecode' in result['Resolver'], true)
})

Deno.test('abi parseable by schema', () => {
    assertEquals(!!abi.parse(result['Resolver'].abi), true)
})

Deno.test('bytecode is string', () => {
    assertEquals(typeof result['Resolver'].bytecode, 'string')
})

console.log('bytecode', result['Resolver'].bytecode)
console.log('abi', JSON.stringify(result['Resolver'].abi))