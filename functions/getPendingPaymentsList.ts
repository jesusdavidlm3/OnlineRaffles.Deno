import { executeQuery } from "../libs/client.ts";

export default async function getPendingPaymentList(raffleId: string) {
    const data = await executeQuery(`SELECT * FROM tickets WHERE raffleId = ${raffleId} AND status = 0`);
    return data;
    // const {data: list, error} = await supabase.from("tickets").select("*").eq("raffleId", raffleId).eq("status", 0).range(0, 9)
    // if(!error){
    //     return list
    // }else{
    //     throw error
    // }
}