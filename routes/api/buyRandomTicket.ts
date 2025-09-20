import { FreshContext, Handlers } from "$fresh/server.ts";
import uploadReceipt from "../../functions/uploadReceipt.ts"
import { crypto } from "@std/crypto/crypto";
import buyTickets from "../../functions/buyTickets.ts"
import getRaffleInfo from "../../functions/getRaffleInfo.ts"

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

        const raffleData = await getRaffleInfo(raffleId!)

        const soldNumbers = raffleData.soldtickets
        const numbersToSell: number[] = []

        while(numbersToSell.length < ticketsQuantity){
            const posibleNumber = Math.floor(Math.random() * ((raffleData.ticketsLimit+1) - 1) + 0)
            if(!soldNumbers.includes(posibleNumber)){
                numbersToSell.push(posibleNumber)
            }
        }

        const data = {
            id: uuid!,
            name: name!,
            identification: identification!,
            raffleId: raffleId!,
            phone: phone!,
            email: email!,
            numbers: numbersToSell!,
            dolarPrice: dolarPrice!,
            receipt: receiptRes?.fullPath!
        }

        const response = await buyTickets(data)
        if(response === true){
            return new Response(JSON.stringify({id: uuid}), {status: 201, headers: {'content-type': 'application/json'}})
        }else{
            return new Response(null, {status: 500})
        }
    }
}