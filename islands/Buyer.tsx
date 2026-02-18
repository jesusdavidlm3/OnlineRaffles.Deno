import { useState, useEffect } from "preact/hooks"
import RandomTickets from "./RandomTickets.tsx"
import TicketsSelector from "./TicketsSelector.tsx"
import Accounts from "../components/Accounts.tsx"

interface Ibuyer{
    ticketPrice: number,
    raffleId: string,
    apiUrl: string,
    minBuy: number,
    raffleStatus: number,
    soldNumbers: number[],
    ticketsLimit: number,
    currency: string,
    sellmethod: string
}

export default function Buyer({raffleId, apiUrl, minBuy, raffleStatus, soldNumbers, ticketsLimit, ticketPrice, currency, sellmethod}: Ibuyer){

    const [dolarPrice, setDolarPrice] = useState<number>()
    const [selectionMethod, setSelectionMethod] = useState<1 | 2>(2)

    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
    .then(async data => {
        const dolarRaw = data;
        const dolar = await dolarRaw.json()
        setDolarPrice(dolar.promedio)
    })

    useEffect(() => {
        if(sellmethod === "random"){
            setSelectionMethod(1)
        }
    }, []) 

    return(
        <>
            { raffleStatus == 1 && <h2>Esta rifa ya ah cerrado su venta</h2> }

            { selectionMethod == 1 && raffleStatus == 0 &&
                <RandomTickets
                    dolarPrice={dolarPrice!}
                    raffleId={raffleId}
                    ticketPrice={ticketPrice}
                    changeMethod={() => setSelectionMethod(2)}
                    apiUrl={apiUrl}
                    minBuy={minBuy}
                    sellemethod={sellmethod}
                    currency={currency}
                />
            }

            { selectionMethod == 2 && raffleStatus == 0 &&
                <TicketsSelector
                    dolarPrice={dolarPrice!}
                    raffleId={raffleId}
                    ticketPrice={ticketPrice}
                    changeMethod={() => setSelectionMethod(1)}
                    soldNumbers={soldNumbers ? soldNumbers:[]}
                    ticketsLimit={ticketsLimit}
                    minBuy={minBuy}
                    apiUrl={apiUrl}
                    currency={currency}
                    sellmethod={sellmethod}
                />
            }

            <Accounts/>
        </>
    )
}