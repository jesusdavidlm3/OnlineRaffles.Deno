import { executeQuery } from "../libs/client.ts"

export default async function getActiveRafflesList(){
    const data = await executeQuery("SELECT * FROM raffles WHERE status = 0");
    return data;
    // const {data: raffles, error} = await supabase.from('raffles').select('*').eq("status", 0)
    // if(!error){
    //     return raffles
    // }else{
    //     throw error
    // }
}

