import { executeQuery } from "../libs/client.ts";

export default async function getActiveRaffle(){
    const data = await executeQuery("SELECT * FROM raffles WHERE status = 0 OR status = 1");
    return data
}