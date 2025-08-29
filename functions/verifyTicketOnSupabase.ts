import { supabase } from "../libs/supabase.ts";

export default async function verifyTicketOnSupabase(identification: string){
    const {data, error} = await supabase.rpc('VerifyNumber', {searchid: identification})
    if(error){
        return error
    }else{
        return data
    }
}