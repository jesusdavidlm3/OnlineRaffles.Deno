import { supabase } from "../libs/supabase.ts";

export default async function rejectPayment(paymentId: string){
    const {data: _data, error} = await supabase.from("tickets").update({status: 2}).eq("id", paymentId)
    if(!error){
        return true
    }else{
        throw error
    }
}