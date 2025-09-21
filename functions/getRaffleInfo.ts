import { supabase } from "../libs/supabase.ts"

interface getRaffleInfoResponse{
    thisRaffleId: string,
    title: string,
    ticketPrice: number,
    description: string,
    ticketsLimit: number,
    flyer: string,
    minBuy: number,
    status: number,
    soldtickets: number[]
}

export default async function getRaffleInfo(raffleId: string): Promise<getRaffleInfoResponse>{
    const {data: data, error} = await supabase.rpc('GetAllRaffleInfo', {searchid: raffleId})
    if(!error){
        return data[0]
    }else{
        console.error(error)
        throw error
    }
}