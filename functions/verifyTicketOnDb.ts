import { executeQuery } from "../libs/client.ts";

export default async function verifyTicketOnDb(identification: string){
    const data = await executeQuery(`
        SELECT
            t.status as ticketStatus,
            t.name as clientName,
            t.numbers,
            r.title
        FROM tickets t JOIN raffles r ON t.raffleid = r.id
        WHERE (r.status = 0 OR r.status = 1) AND t.identification = $1;
    `, [identification]);
    return data;
    // const {data, error} = await supabase.rpc('VerifyNumber', {searchid: identification})
    // if(error){
    //     return error
    // }else{
    //     return data
    // }
}