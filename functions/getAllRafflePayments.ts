import { supabase } from "../libs/supabase.ts";

interface IgetAllRafflePayments{
    raffleId: string,
    start: number,
    end: number
}

export default async function getAllRafflePayments({raffleId, start, end}: IgetAllRafflePayments){
    const {data: list, error} = await supabase.from("tickets").select("*").eq("raffleId", raffleId).range(start, end)
    if(!error){
        return list
    }else{
        throw error
    }
}