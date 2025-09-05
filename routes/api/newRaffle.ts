import { Handlers, FreshContext } from "$fresh/server.ts";
import { getCookies, setCookie } from "@std/http/cookie";
import uploadFlyer from "../../functions/uploadFlyer.ts"
import { supabase } from "../../libs/supabase.ts";
import { verifyAndRenewToken } from "../../libs/jwt.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.toke
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const formData = await req.formData()
            const title = formData.get("title")?.toString()
            const description = formData.get("description")?.toString()
            const ticketPrice = Number(formData.get("ticketPrice")?.toString())
            const minBuy = Number(formData.get("minBuy")?.toString())
            const ticketsLimit = Number(formData.get("ticketsLimit")?.toString())
            const flyer = formData.get("flyerFile") as File

            const flyerData = await uploadFlyer(flyer)

            const {data: info, error} = await supabase.from("raffles").insert([{
                title: title,
                description: description,
                minBuy: minBuy,
                ticketsLimit: ticketsLimit,
                ticketPrice: ticketPrice,
                flyer: flyerData?.fullPath
            }])

            if(!error){
                const response = new Response(null, {status: 200})
                setCookie(response.headers, {
                    name: "token",
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