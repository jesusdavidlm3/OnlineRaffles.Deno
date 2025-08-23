import { useState } from "preact/hooks"

export default function Buyer({ticketPrice = 1, raffleId}){

    const [ticketsQuantity, setTicketsQuantity] = useState<number>(1)
    const [price, setPrice] = useState<number>()

    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
    .then(async data => {
        const dolarRaw = data;
        const dolar = await dolarRaw.json()
        setPrice(dolar.promedio * ticketsQuantity * ticketPrice)
    })

    return(<div class="Buyer">
        <h2>Compra tus numeros aqui!</h2>
        <div class="Selector">
            <button
                class="MinusButton"
                disabled={ticketsQuantity <= 1}
                onClick={() => setTicketsQuantity(ticketsQuantity - 1)}
            ><h1>-</h1></button>                
            <h1>{ticketsQuantity}</h1>
            <button
                class="PlusButton"
                onClick={() => setTicketsQuantity(ticketsQuantity + 1)}
            ><h1>+</h1></button>
        </div>
        <h2>Monto total: {price ? (price.toFixed(2)):("Error")}</h2>
        <form>
            <input placeholder="Nombre:"/>
            <input placeholder="Cedula"/>
            <input type="file" accept="image/*, .pdf"/>
            <button type="submit">Comprar</button>
        </form>

    </div>)
}