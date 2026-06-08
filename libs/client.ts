import { Client } from "jsr:@db/postgres";
import { S3Client } from "@bradenmacdonald/s3-lite-client";

//Cliente de postgres
const client = new Client({
    hostname: Deno.env.get("DATABASE_URL"),
    password: Deno.env.get("PGPASSWORD"),
    port: Deno.env.get("PGPORT"),
    user: Deno.env.get("PGUSER"),
    database: Deno.env.get("PGDATABASE"),
    host_type: "tcp",
    connection: {attempts: 5, interval: 1000},
    tls: {enabled: true}
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
    endPoint: Deno.env.get("AWS_ENDPOINT_URL")!,
    region: Deno.env.get("AWS_DEFAULT_REGION")!,
    accessKey: Deno.env.get("AWS_ACCESS_KEY_ID")!,
    secretKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
    bucket: Deno.env.get("AWS_S3_BUCKET_NAME")
})