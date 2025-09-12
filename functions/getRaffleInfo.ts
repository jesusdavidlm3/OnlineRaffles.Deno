import { supabase } from "../libs/supabase.ts"

export default async function getRaffleInfo(raffleId: string){
    const {data: data, error} = await supabase.rpc('GetAllRaffleInfo', {searchid: raffleId})
    if(!error){
        return data
    }else{
        console.error(error)
        throw error
    }
}