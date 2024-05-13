import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Client } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.3/mod.ts";
import { compileResult } from '../../schemas/compileResult.ts'
import { abi } from '../../schemas/abi/mod.ts'

const client = new Client('http://kanta')
const code = '//SPDX-License-Identifier: 0BSD\n pragma solidity 0.8.23; contract Foo { function foo(uint x) external pure returns (uint) { return x + 1; } }'
const result = compileResult.parse(await client.request('compile', { code }, 0))

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