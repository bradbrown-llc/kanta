import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abi } from '../../schemas/abi/mod.ts'
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = Deno.readTextFileSync('./ERC20_20240228_slipbridge.sol')
const result = await client.compile(code)

Deno.test('errors in result', () => { // due to use of self destruct
    assertEquals('errors' in result, true)
})

Deno.test('contracts in result', () => {
    assertEquals('contracts' in result, true)
})

Deno.test('ERC20 in contracts', () => {
    assertEquals('ERC20' in result.contracts!, true)
})

Deno.test('bytecode in result.contracts.ERC20', () => {
    assertEquals('bytecode' in result.contracts!.ERC20, true)
})

Deno.test('abi in result.contracts.ERC20', () => {
    assertEquals('abi' in result.contracts!.ERC20, true)
})

Deno.test('abi parseable by schema', () => {
    abi.parse(result.contracts!.ERC20.abi)
})

console.log('bytecode', result.contracts!.ERC20.bytecode)
console.log('abi', JSON.stringify(result.contracts!.ERC20.abi))
console.log('errors', JSON.stringify(result.errors))