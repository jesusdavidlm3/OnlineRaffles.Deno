import { supabase } from "../libs/supabase.ts"

interface IbuyTickets{
    id: string,
    name: string,
    identification: string,
    raffleId: string,
    phone: string,
    email: string,
    numbers: number[],
    dolarPrice: number,
    receipt: string,
    reference: string
}

export default async function buyTickets(ticketInfo: IbuyTickets){
    const {data: _data, error} = await supabase.from("tickets").insert([{
        id: ticketInfo.id,
        name: ticketInfo.name,
        identification: ticketInfo.identification,
        raffleId: ticketInfo.raffleId,
        phone: ticketInfo.phone,
        email: ticketInfo.email,
        numbers: ticketInfo.numbers,
        dolarPrice: ticketInfo.dolarPrice,
        receipt: ticketInfo.receipt,
        reference: ticketInfo.reference
    }]).select()
    if(!error){
        return true
    }else{
        throw error
    }
}