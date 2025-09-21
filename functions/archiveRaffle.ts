import { supabase } from "../libs/supabase.ts";

export default async function archiveRaffle(raffleId: string){
    const {data: _data, error} = await supabase.from("raffles").update({status: 2}).eq("id", raffleId)
    if(!error){
        return true
    }else{
        throw error
    }
}