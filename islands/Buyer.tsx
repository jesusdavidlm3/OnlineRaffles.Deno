import { useState } from "preact/hooks"
import RandomTickets from "./RandomTickets.tsx"
import TicketsSelector from "./TicketsSelector.tsx"
import Accounts from "../components/Accounts.tsx"

interface Ibuyer{
    ticketPrice?: number,
    raffleId: string,
    apiUrl: string,
    minBuy: number
}

export default function Buyer({ticketPrice = 1, raffleId, apiUrl, minBuy}: Ibuyer){

    // const dolarRaw = await fetch('https://ve.dolarapi.com/v1/dolares/oficial')
    // const dolar = await dolarRaw.json()

    const [dolarPrice, setDolarPrice] = useState<number>()
    const [selectionMethod, setSelectionMethod] = useState<1 | 2>(1)

    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
    .then(async data => {
        const dolarRaw = data;
        const dolar = await dolarRaw.json()
        setDolarPrice(dolar.promedio)
    })

    return(
        <>
            { selectionMethod == 1 &&
                <RandomTickets
                    dolarPrice={dolarPrice!}
                    raffleId={raffleId}
                    ticketPrice={ticketPrice}
                    changeMethod={() => setSelectionMethod(2)}
                    apiUrl={apiUrl}
                    minBuy={minBuy}
                />
            }

            { selectionMethod == 2 &&
                <TicketsSelector
                    dolarPrice={dolarPrice!}
                    raffleId={raffleId}
                    ticketPrice={ticketPrice}
                    changeMethod={() => setSelectionMethod(1)}
                />
            }

            <Accounts/>
        </>
    )
}