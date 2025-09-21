import { supabase } from "../libs/supabase.ts";

export default async function deletePayment(paymentId: string) {
    const {data: _data, error} = await supabase.from("tickets").delete().eq("id", paymentId)
    console.log(_data)
    if(!error){
        return true
    }else{
        throw error
    }
} 