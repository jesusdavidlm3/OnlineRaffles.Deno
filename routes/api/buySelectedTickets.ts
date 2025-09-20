import { FreshContext, Handlers } from "$fresh/server.ts";
import uploadReceipt from "../../functions/uploadReceipt.ts"
import { crypto } from "@std/crypto/crypto";
import buyTickets from "../../functions/buyTickets.ts"

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
    async POST(req: Request, _ctx: FreshContext){
        const uuid = crypto.randomUUID()
        const formData = await req.formData()
        const name = formData.get("name")?.toString()
        const identification = formData.get("identification")?.toString()
        const phone = formData.get("phone")?.toString()
        const email = formData.get("email")?.toString()
        const raffleId = formData.get("raffleId")?.toString()
        const dolarPrice = Number(formData.get("dolarPrice")?.toString())
        const rawNumbers = formData.get("numbers")?.toString().split(",")
        const numbers = rawNumbers!.map((item: string) => Number(item))

        const receipt = formData.get("receiptFile") as File

        const receiptRes = await uploadReceipt(receipt)

        const data = {
            id: uuid!,
            name: name!,
            identification: identification!,
            raffleId: raffleId!,
            phone: phone!,
            email: email!,
            numbers: numbers!,
            dolarPrice: dolarPrice!,
            receipt: receiptRes?.fullPath!
        }

        const response = await buyTickets(data)

        if (response === true){
            return new Response(JSON.stringify({id: uuid}), {status: 201, headers: {'content-type': 'application/json'}})
        }else{
            return new Response(null, {status: 500})
        }
    }
}