import { useState } from "preact/hooks"
import RandomTickets from "./RandomTickets.tsx"
import TicketsSelector from "./TicketsSelector.tsx"

export default function Buyer({ticketPrice = 1, raffleId}){

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
        </>
    )
}