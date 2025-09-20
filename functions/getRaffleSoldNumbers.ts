import { supabase } from "../libs/supabase.ts";

export default async function getRaffleSoldNumbers(raffleId: string): Promise<number[]>{
    const {data: data, error} = await supabase.rpc("GetAllSoldNumbersByRaffleId", {searchId: raffleId})
    if(!error){
        return data
    }else{
        throw error
    }
}