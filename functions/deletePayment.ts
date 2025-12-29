import { executeQuery } from "../libs/client.ts";

export default async function deletePayment(paymentId: string) {
    const data = await executeQuery(`DELETE * FROM tickets WHERE id = ${paymentId}`);
    return data;
    // const {data: _data, error} = await supabase.from("tickets").delete().eq("id", paymentId)
    // console.log(_data)
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
} 