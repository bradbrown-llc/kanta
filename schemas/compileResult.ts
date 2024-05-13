import z from "https://deno.land/x/zod@v3.22.4/index.ts";
import { abi } from "./abi/mod.ts";

export const compileResult = z.record(z.string(), z.object({ abi, bytecode: z.string() }))