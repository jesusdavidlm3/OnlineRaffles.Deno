import { supabase } from "../libs/supabase.ts";
import { crypto } from "@std/crypto"

export default async function(file: File){
    const fileName = crypto.randomUUID()
    const {data} = await supabase.storage.from("files").upload(`receipts/${fileName}`, file)

    return data
}