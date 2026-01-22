import { executeQuery } from "../libs/client.ts";

export default async function getNumbersForATicket(ticketId: string){
    const data = await executeQuery(`SELECT numbers FROM tickets WHERE id = $1`, [ticketId]);
    return data[0];
    // const {data: ticket, error} = await supabase.from("tickets").select("numbers").eq("id", ticketId)
    // if(!error){
    //     return ticket[0]
    // }else{
    //     throw error
    // }
}