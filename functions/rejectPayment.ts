import { executeQuery } from "../libs/client.ts";

export default async function rejectPayment(paymentId: string){
    const data = await executeQuery(`UPDATE tickets SET status = 2 WHERE id = ${paymentId}}`);
    return data;
    // const {data: _data, error} = await supabase.from("tickets").update({status: 2}).eq("id", paymentId)
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
}