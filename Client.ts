import { compileResult } from "./schemas/compileResult.ts";
import * as jra from "https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.3/mod.ts";

export class Client {

    rpc:string

    constructor(rpc:string) {
        this.rpc = rpc
    }

    async compile(code:string) {
        const jraClient = new jra.Client(this.rpc)
        const result = await jraClient.request('compile', { code }, 0)
        return compileResult.parse(result)
    }

}