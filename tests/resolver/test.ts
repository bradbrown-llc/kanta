import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abi } from '../../schemas/abi/mod.ts'
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = Deno.readTextFileSync('./Resolver.sol')
const result = await client.compile(code)

Deno.test('errors in result', () => { // due to use of self destruct
    assertEquals('errors' in result, true)
})

Deno.test('contracts in result', () => {
    assertEquals('contracts' in result, true)
})

Deno.test('Resolver in contracts', () => {
    assertEquals('Resolver' in result.contracts!, true)
})

Deno.test('bytecode in result.contracts.Resolver', () => {
    assertEquals('bytecode' in result.contracts!.Resolver, true)
})

Deno.test('abi in result.contracts.Resolver', () => {
    assertEquals('abi' in result.contracts!.Resolver, true)
})

Deno.test('abi parseable by schema', () => {
    abi.parse(result.contracts!.Resolver.abi)
})

console.log('bytecode', result.contracts!.Resolver.bytecode)
console.log('abi', JSON.stringify(result.contracts!.Resolver.abi))
console.log('errors', JSON.stringify(result.errors))