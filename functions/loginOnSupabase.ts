import { supabase } from "../libs/supabase.ts";

export default async function loginOnSupabase(email: string, password: string){
    const {data: user, error} = await supabase.from("users").select("*").eq("email", email)
    if(!error){
        if(user[0].password == password){
            return true
        }else{
            return false
        }
    }else{
        throw error
    }
}