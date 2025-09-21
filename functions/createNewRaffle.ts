import { supabase } from "../libs/supabase.ts";

interface IcreateRaffle{
    title: string,
    description: string,
    minBuy: number,
    ticketsLimit: number,
    ticketPrice: number,
    flyer: string
}

export default async function createNewRaffle({title, description, minBuy, ticketPrice, ticketsLimit, flyer}: IcreateRaffle) {
    const {data: _data, error} = await supabase.from("raffles").insert([{
        title: title,
        description: description,
        minBuy: minBuy,
        ticketsLimit: ticketsLimit,
        ticketPrice: ticketPrice,
        flyer: flyer
    }])
    if(!error){
        return true
    }else{
        console.log(error)
        throw error
    }
}