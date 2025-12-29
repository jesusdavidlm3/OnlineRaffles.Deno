import { Client } from "jsr:@db/postgres";
import { S3Client } from "@bradenmacdonald/s3-lite-client";

//Cliente de postgres
const client = new Client({
    hostname: Deno.env.get("DB_URL"),
    password: Deno.env.get("DB_PASS"),
    port: Deno.env.get("DB_PORT"),
    user: Deno.env.get("DB_USER"),
    database: Deno.env.get("DB_NAME"),
    host_type: "tcp"
})

export async function executeQuery(query: string, params?: any[]){
    await client.connect();
    if(params != undefined){
        const result = await client.queryObject(query, params);
        await client.end();
        return result.rows;
    }else{
        const result = await client.queryObject(query);
        await client.end();
        return result.rows;
    }
}

// Cliente de S3
export const bucketStorage = new S3Client({
    endPoint: Deno.env.get("STORAGE_ENDPOINT")!,
    region: Deno.env.get("REGION")!,
    accessKey: Deno.env.get("BUCKET_ACCESS_KEY_ID")!,
    secretKey: Deno.env.get("BUCKET_SECRET_ACCESS_KEY")!,
    bucket: Deno.env.get("BUCKET_NAME")
})