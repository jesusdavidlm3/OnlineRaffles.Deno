import { executeQuery } from "../libs/client.ts";

interface IcreateRaffle{
    title: string,
    description: string,
    minBuy: number,
    ticketsLimit: number,
    ticketPrice: number,
    flyer: string,
    currency: string,
    sellMethod: string
}

export default async function createNewRaffle({title, description, minBuy, ticketsLimit, ticketPrice, flyer, currency, sellMethod}: IcreateRaffle) {
    const _res = await executeQuery(`
        INSERT INTO raffles(
            title,
            description,
            minBuy,
            ticketsLimit,
            ticketsPrice,
            flyer,
            currency,
            sellmethod
        ) VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8
        )
    `, [title, description, minBuy, ticketsLimit, ticketPrice, flyer, currency, sellMethod])
        
    return true
}