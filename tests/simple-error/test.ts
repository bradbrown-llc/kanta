import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Client } from "../../Client.ts";

const client = new Client('http://kanta')
const code = '//SPDX-License-Identifier: 0BSD\n pragma solidity 0.8.23; contract Foo { function foo(uint x) external pure returns (uint) { return y + 1; } }'
const result = await client.compile(code)

Deno.test('errors in result', () => {
    assertEquals('errors' in result, true)
})

Deno.test('contracts not in result', () => {
    assertEquals('contracts' in result, false)
})