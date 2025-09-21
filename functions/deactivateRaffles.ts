import { supabase } from "../libs/supabase.ts"

export default async function deactivateRaffles(raffleId: string){
    const {data: _data, error} = await supabase.from("raffles").update({status: 1}).eq("id", raffleId)
    if(!error){
        return true
    }else{
        throw error
    }
}