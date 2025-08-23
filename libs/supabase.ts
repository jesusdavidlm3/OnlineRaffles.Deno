import { createClient } from "@supabase/supabase-js"

const key = Deno.env.get("api_key")!;
const url = Deno.env.get("supabase_url")!;

export const supabase = createClient(url, key);