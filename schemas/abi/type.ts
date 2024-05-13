import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const type = z
    .literal('function')
    .or(z.literal('constructor'))
    .or(z.literal('receive'))
    .or(z.literal('fallback'))