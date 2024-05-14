import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { abi } from '../../schemas/abi/mod.ts'
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = '//SPDX-License-Identifier: 0BSD\n pragma solidity 0.8.23; contract Foo { function foo(uint x) external pure returns (uint) { return x + 1; } }'
const result = await client.compile(code)

Deno.test('errors not in result', () => {
    assertEquals('errors' in result, false)
})

Deno.test('contracts in result', () => {
    assertEquals('contracts' in result, true)
})

Deno.test('Foo in contracts', () => {
    assertEquals('Foo' in result.contracts!, true)
})

Deno.test('bytecode in result.contracts.Foo', () => {
    assertEquals('bytecode' in result.contracts!.Foo, true)
})

Deno.test('abi in result.contracts.Foo', () => {
    assertEquals('abi' in result.contracts!.Foo, true)
})

Deno.test('abi parseable by schema', () => {
    abi.parse(result.contracts!.Foo.abi)
})

console.log('bytecode', result.contracts!.Foo.bytecode)
console.log('abi', JSON.stringify(result.contracts!.Foo.abi))