import z from "https://deno.land/x/zod@v3.22.4/index.ts";
import { type } from "./type.ts";
import { io } from "./io/mod.ts";
import { stateMutability } from "./stateMutability.ts";

export const abi = z.object({
    type,
    name: z.string(),
    inputs: io,
    outputs: io,
    stateMutability
}).array()