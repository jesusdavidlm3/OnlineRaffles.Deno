import { executeQuery } from "../libs/client.ts";

interface IcreateRaffle{
    title: string,
    description: string,
    minBuy: number,
    ticketsLimit: number,
    ticketPrice: number,
    flyer: string
}

export default async function createNewRaffle({title, description, minBuy, ticketPrice, ticketsLimit, flyer}: IcreateRaffle) {
    const _res = await executeQuery(`
        INSERT INTO raffles(
            title,
            description,
            minBuy,
            ticketsLimit,
            ticketsPrice,
            flyer
        ) VALUES(
            $1, $2, $3, $4, $5, $6
        )
    `, [title, description, minBuy, ticketPrice, ticketsLimit, flyer])
        
    return true

    // const {data: _data, error} = await supabase.from("raffles").insert([{
    //     title: title,
    //     description: description,
    //     minBuy: minBuy,
    //     ticketsLimit: ticketsLimit,
    //     ticketPrice: ticketPrice,
    //     flyer: flyer
    // }])
    // if(!error){
    //     return true
    // }else{
    //     console.log(error)
    //     throw error
    // }
}