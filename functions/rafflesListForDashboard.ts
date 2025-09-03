import { supabase } from "../libs/supabase.ts";
import { Handlers, FreshContext } from "$fresh/server.ts";

export default async function rafflesListForDashboard(pagination: number){
    const end = pagination * 5
    const start = pagination == 1 ? 0 : end - 4

    const {data: list, error} = await supabase.from('raffles').select('*').range(start, end)
    if(!error){
        return list
    }else{
        throw error
    }
} 