import { FreshContext, Handlers } from "$fresh/server.ts";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import { setCookie, getCookies } from "@std/http/cookie";
import { supabase } from "../../libs/supabase.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const reqData = await req.json()
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            const apiUrl = Deno.env.get("front_url")
            return Response.redirect(`${apiUrl}/`)
        }else{
            const {data: data, error} = await supabase.from("tickets").update({status: 1}).eq("id", reqData.ticketId)
            if(!error){
                const response = new Response(null, {status: 200})
                setCookie(response.headers, {
                    name: token,
                    value: newToken
                })
                return response
            }else{
                console.log(error)
                return new Response(null, {status: 500})
            }
            
        }
    }
}