import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import deletePayment from "../../functions/deletePayment.ts";

export const handler: Handlers = {
    async DELETE(req: Request, _ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const reqData = await req.json()
            const response = await deletePayment(reqData.ticketId)
            if(response){
                const response = new Response(null, {status: 200})
                setCookie(response.headers, {
                    name: "token",
                    value: newToken
                })
                return response
            }else{
                return new Response(null, {status: 500})
            }
        }
    }
}