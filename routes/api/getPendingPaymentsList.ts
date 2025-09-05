import { Handlers, FreshContext } from "$fresh/server.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { supabase } from "../../libs/supabase.ts"
import { verifyAndRenewToken } from "../../libs/jwt.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = await getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const requestData = await req.json()
            const raffleId = requestData.raffleId
            const {data: list, error} = await supabase.from("tickets").select("*").eq("raffleId", raffleId).eq("status", 0).range(0, 4)
            if(!error){
                const response = new Response(JSON.stringify(list))
                setCookie(response.headers, {
                    name: "token",
                    value: newToken
                })
                return response
            }else{
                console.log(error)
                return new Response(JSON.stringify(error), {status: 500})
            }
        }
    }
}