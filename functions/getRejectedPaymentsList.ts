import { executeQuery } from "../libs/client.ts";

export default async function getRejectedPaymentList(raffleId: string) {
    const data = await executeQuery(`SELECT * FROM tickets WHERE raffleid = $1 AND status = 2`, [raffleId]);
    return data;
    // const {data: list, error} = await supabase.from("tickets").select("*").eq("raffleId", raffleId).eq("status", 0).range(0, 9)
    // if(!error){
    //     return list
    // }else{
    //     throw error
    // }
}