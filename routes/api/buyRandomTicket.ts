import { FreshContext, Handlers } from "$fresh/server.ts";
import { supabase } from "../../libs/supabase.ts";
import uploadReceipt from "../../functions/uploadReceipt.ts"
import { crypto } from "@std/crypto/crypto";

interface Idata{
    name: string,
    identification: string,
    phone: string,
    email: string,
    raffleId: string,
    ticketsQuantity: number,
    dolarPrice: number
}

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const uuid = crypto.randomUUID()
        const formData = await req.formData()
        const name = formData.get("name")?.toString()
        const identification = formData.get("identification")?.toString()
        const phone = formData.get("phone")?.toString()
        const email = formData.get("email")?.toString()
        const raffleId = formData.get("raffleId")?.toString()
        const ticketsQuantity = Number(formData.get("ticketsQuantity")?.toString())
        const dolarPrice = Number(formData.get("dolarPrice")?.toString())

        const receipt = formData.get("receiptFile") as File

        const receiptRes = await uploadReceipt(receipt)

        const soldNumbers: number[] = []
        const numbersToSell: number[] = []
        
        const {data: raffleInfo} = await supabase.from("raffles").select("ticketsLimit").eq("id", raffleId)
        const {data: rawNumbers} = await supabase.from("tickets").select("numbers").eq("raffleId", raffleId)

        rawNumbers?.forEach(dbItem => {
            dbItem.numbers.forEach(numbersCollection => {
                soldNumbers.push(numbersCollection)
            });
        })

        for(let i = 1; numbersToSell.length < ticketsQuantity; i++){
            if(!soldNumbers.includes(i)){
                numbersToSell.push(i)
            }
        }

        const {data, error} = await supabase.from("tickets").insert([{
            id: uuid,
            name: name,
            identification: identification,
            raffleId: raffleId,
            phone: phone,
            email: email,
            numbers: numbersToSell,
            dolarPrice: dolarPrice,
            receipt: receiptRes?.fullPath
        }]).select()

        console.log(error)

        return new Response(JSON.stringify({id: uuid}), {status: 201, headers: {'content-type': 'application/json'}})
    }
}