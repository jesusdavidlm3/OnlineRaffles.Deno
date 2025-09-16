import { supabase } from "../libs/supabase.ts";

export default async function getActiveRaffle(){
    const {data: data, error} = await supabase.from("raffles").select("*").or("status.eq.0, status.eq.1");
    if(!error){
        if(data.length == 0){
            return false
        }else{
            return data[0]
        }
    }else{
        throw error
    }
}