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
    reference: string,
    currency: string
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
            reference,
            currency
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)    
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
        ticketInfo.reference,
        ticketInfo.currency
    ]);
    
    return true;
}