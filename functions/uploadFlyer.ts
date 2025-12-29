import { crypto } from "@std/crypto"
import { bucketStorage } from "../libs/client.ts";

export default async function(file: File){
    const fileName = crypto.randomUUID()
    const fileStream = file.stream()
    // const fileUInt8 = new Uint8Array(fileArrayBuffer)
    const data = await bucketStorage.putObject(`flyers/${fileName}`, fileStream);
    // const {data} = await supabase.storage.from("files").upload(`raffles/${fileName}`, file)
    return fileName
}