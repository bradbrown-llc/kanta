import * as jra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/jra@0.1.3/mod.ts'
import { Kanta } from './Kanta.ts';

export async function compile(params: jra.types.Params, id:jra.types.Id) {
    const code = await Kanta.codeFromParams(params, id)
    if (code instanceof Response) return code
    const version = await Kanta.getSolcFromCode(code, id)
    if (version instanceof Response) return version
    const output = await Kanta.compile(code, version, id)
    return jra.Server.respond({ result: output, id })

}

const handler:jra.types.ServeHandler = async (jraRequest, _httpRequest, _info):Promise<Response> => {
    const { method, params, id } = jraRequest
    switch (method) {
        case "compile": return await compile(params, id)
        default: return jra.Server.error.METHOD_NOT_FOUND(id)
    }
}

jra.Server.serve({ port: 80, hostname: '0.0.0.0' }, handler)