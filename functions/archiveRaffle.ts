import { executeQuery } from "../libs/client.ts";
import { bucketStorage } from "../libs/client.ts";

export default async function archiveRaffle(raffleId: string){
    const _archiveQuery = await executeQuery("UPDATE raffles SET status = 2 WHERE id = $1", [raffleId])
    const ReceiptsToDelete = await executeQuery("SELECT receipt FROM tickets WHERE raffleId = $1", [raffleId])
    ReceiptsToDelete.forEach((item: any) => {
        bucketStorage.deleteObject(`receipts/${item.receipt}`)
    })
    // console.log(ReceiptsToDelete)
    return true;
    // const {data: _data, error} = await supabase.from("raffles").update({status: 2}).eq("id", raffleId)
    // if(!error){
    //     return true
    // }else{
    //     throw error
    // }
}