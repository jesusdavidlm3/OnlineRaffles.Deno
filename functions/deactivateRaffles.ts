import { executeQuery } from "../libs/client.ts"

export default async function deactivateRaffles(raffleId: string){
    const data = await executeQuery(`UPDATE raffles SET status = 1 WHERE id = ${raffleId}`);
    return data;
    // const {data: _data, error} = await supabase.from("raffles").update({status: 1}).eq("id", raffleId)
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
}