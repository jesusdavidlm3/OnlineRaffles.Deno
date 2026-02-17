import { executeQuery } from "../libs/client.ts"

interface getRaffleInfoResponse{
    thisRaffleId: string,
    title: string,
    ticketsprice: number,
    description: string,
    ticketsLimit: number,
    flyer: string,
    minBuy: number,
    status: number,
    soldtickets: number[]
}

export default async function getRaffleInfo(raffleId: string){
    const data = await executeQuery(`
        SELECT 
            r.id,
            r.status,
            r.title,
            r.minBuy,
            r.description,
            r.flyer,
            r.ticketsLimit AS ticketsLimit,
            r.ticketsPrice,
            r.currency,
            r.sellmethod,
            (SELECT array_agg(n) FROM tickets t, unnest(t.numbers) AS n WHERE raffleId = $1) as soldnumbers
        FROM raffles r LEFT JOIN tickets t ON r.id = t.raffleId
        WHERE r.id = $1     
    `, [raffleId]);
    return data[0];
    // const {data: data, error} = await supabase.rpc('GetAllRaffleInfo', {searchid: raffleId})
    // if(!error){
    //     return data[0]
    // }else{
    //     console.error(error)
    //     throw error
    // }
}