import { Handlers, FreshContext } from "$fresh/server.ts";
import uploadFlyer from "../../functions/uploadFlyer.ts"
import { supabase } from "../../libs/supabase.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
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
            return new Response(null, {status: 200})
        }else{
            console.log(error)
            return new Response(null, {status: 500})
        }
    }
}