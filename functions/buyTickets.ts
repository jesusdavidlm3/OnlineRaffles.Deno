import { executeQuery } from "../libs/client.ts"

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
    const _res = await executeQuery(`
        INSERT INTO tickets(
            id,
            name,
            identification,
            raffleid,
            phone,
            email,
            numbers,
            dolarprice,
            receipt,
            reference
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)    
    `, [
        ticketInfo.id,
        ticketInfo.name,
        ticketInfo.identification,
        ticketInfo.raffleId,
        ticketInfo.phone,
        ticketInfo.email,
        ticketInfo.numbers,
        ticketInfo.dolarPrice,
        ticketInfo.receipt,
        ticketInfo.reference
    ]);
    
    return true;
    // const {data: _data, error} = await supabase.from("tickets").insert([{
    //     id: ticketInfo.id,
    //     name: ticketInfo.name,
    //     identification: ticketInfo.identification,
    //     raffleId: ticketInfo.raffleId,
    //     phone: ticketInfo.phone,
    //     email: ticketInfo.email,
    //     numbers: ticketInfo.numbers,
    //     dolarPrice: ticketInfo.dolarPrice,
    //     receipt: ticketInfo.receipt,
    //     reference: ticketInfo.reference
    // }]).select()
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
}