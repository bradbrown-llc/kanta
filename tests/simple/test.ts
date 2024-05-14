import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abi } from '../../schemas/abi/mod.ts'
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = '//SPDX-License-Identifier: 0BSD\n pragma solidity 0.8.23; contract Foo { function foo(uint x) external pure returns (uint) { return x + 1; } }'
const result = await client.compile(code)

Deno.test('abi in result', () => {
    assertEquals('abi' in result['Foo'], true)
})

Deno.test('bytecode in result', () => {
    assertEquals('bytecode' in result['Foo'], true)
})

Deno.test('abi parseable by schema', () => {
    assertEquals(!!abi.parse(result['Foo'].abi), true)
})

Deno.test('bytecode is string', () => {
    assertEquals(typeof result['Foo'].bytecode, 'string')
})

console.log('bytecode', result['Foo'].bytecode)
console.log('abi', JSON.stringify(result['Foo'].abi))