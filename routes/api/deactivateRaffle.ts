import { Handlers, FreshContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import { supabase } from "../../libs/supabase.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const reqData = await req.json()
            const {data: data, error} = await supabase.from("raffles").update({status: false}).eq("id", reqData.raffleId)
            if(!error){
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