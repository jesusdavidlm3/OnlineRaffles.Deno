import { FreshContext, Handlers } from "$fresh/server.ts";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import { setCookie, getCookies } from "@std/http/cookie";
import rejectPayment from "../../functions/rejectPayment.ts"

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext){
        const reqData = await req.json()
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            const apiUrl = Deno.env.get("front_url")
            return Response.redirect(`${apiUrl}/`)
        }else{
            const response = await rejectPayment(reqData.ticketId)
            if(response === true){
                const response = new Response(null, {status: 200})
                setCookie(response.headers, {
                    name: token,
                    value: newToken
                })
                return response
            }else{
                return new Response(null, {status: 500})
            }
        }
    }
}