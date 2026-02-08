import { executeQuery } from "../libs/client.ts";

export default async function archiveRaffle(raffleId: string){
    const _data = await executeQuery("UPDATE raffles SET status = 2 WHERE id = $1", [raffleId])
    return true;
    // const {data: _data, error} = await supabase.from("raffles").update({status: 2}).eq("id", raffleId)
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
}