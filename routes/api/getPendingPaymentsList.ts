import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import getPendingPaymentList from "../../functions/getPendingPaymentsList.ts"

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = await getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const requestData = await req.json()
            const raffleId = requestData.raffleId
            const list = await getPendingPaymentList(raffleId)
            if(list){
                const response = new Response(JSON.stringify(list))
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