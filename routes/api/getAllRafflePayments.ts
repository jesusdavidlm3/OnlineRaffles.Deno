import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import getAllRafflePayments from "../../functions/getAllRafflePayments.ts"

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const requestData = await req.json()
            const raffleId = requestData.raffleId
            const end = requestData.page * 10
            const start = requestData.page === 1 ? 0 : end - 9
            const list = await getAllRafflePayments({raffleId, start, end})
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