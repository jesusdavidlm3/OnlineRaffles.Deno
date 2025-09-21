import { supabase } from "../libs/supabase.ts"

export default async function getActiveRafflesList(){
    const {data: raffles, error} = await supabase.from('raffles').select('*').eq("status", 0)
    if(!error){
        return raffles
    }else{
        throw error
    }
}

