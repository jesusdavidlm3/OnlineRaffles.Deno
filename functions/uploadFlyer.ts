import { crypto } from "@std/crypto"
import { bucketStorage } from "../libs/client.ts";

export default async function(file: File){
    const fileId = crypto.randomUUID()
    const fileType = file.type.slice(6)
    const fileName = `${fileId}.${fileType}`
    const fileStream = file.stream()
    // const fileUInt8 = new Uint8Array(fileArrayBuffer)
    const data = await bucketStorage.putObject(`flyers/${fileName}`, fileStream);
    // const {data} = await supabase.storage.from("files").upload(`raffles/${fileName}`, file)
    return fileName
}