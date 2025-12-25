import { Client } from "jsr:@db/postgres";

const client = new Client({
    hostname: Deno.env.get("DB_URL"),
    password: Deno.env.get("DB_PASS"),
    port: Deno.env.get("DB_PORT"),
    user: Deno.env.get("DB_USER"),
    database: Deno.env.get("DB_NAME"),
    host_type: "tcp"
})

export async function executeQuery(query: string, params?: string[]){
    await client.connect();
    const result = await client.queryObject(query);
    await client.end();
    return result.rows;
}

export async function execute(query: string, params?: string[]){
    await client.connect();
    const result = await client.queryObject(query);
    await client.end();
    return result.rows;
}