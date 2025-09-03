import { supabase } from "../libs/supabase.ts";

export default async function loginOnSupabase(email: string, password: string){
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(!error){
        return data
    }else{
        throw error
    }
}