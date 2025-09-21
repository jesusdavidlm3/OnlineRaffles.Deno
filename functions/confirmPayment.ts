import { supabase } from "../libs/supabase.ts";

export default async function confirmPayment(paymentId: string){
    const {data: _data, error} = await supabase.from("tickets").update({status: 1}).eq("id", paymentId)
    if(!error){
        return true
    }else{
        throw error
    }
}