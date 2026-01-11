import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { executeQuery } from "../../libs/client.ts"
import { verifyAndRenewToken } from "../../libs/jwt.ts";

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext){
        const apiUrl = Deno.env.get("FRONT_URL")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const requestData = await req.json()
            const raffleId = requestData.raffleId
            const data = await executeQuery("SELECT * FROMS tickets WHERE raffleId = $1 AND status = 2", [raffleId]);
            return data;
            // if(!error){
            //     const response = new Response(JSON.stringify(list))
            //     setCookie(response.headers, {
            //         name: "token",
            //         value: newToken
            //     })
            //     return response
            // }else{
            //     console.log(error)
            //     return new Response(JSON.stringify(error), {status: 500})
            // }
        }
    }
}