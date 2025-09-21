import { supabase } from "../libs/supabase.ts";

export default async function getNumbersForATicket(ticketId: string){
    const {data: ticket, error} = await supabase.from("tickets").select("numbers").eq("id", ticketId)
    if(!error){
        return ticket[0]
    }else{
        throw error
    }
}