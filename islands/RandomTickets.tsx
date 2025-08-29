import { Handlers } from "$fresh/server.ts";
import { useState, useEffect } from "preact/hooks"

interface IrandomTickets{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void
}

// const apiUrl = Deno.env.get("front_url")

export default function RandomTickets({ticketPrice = 1, raffleId, dolarPrice, changeMethod}: IrandomTickets){

    const [loading, setLoading] = useState(false)

    const [ticketsQuantity, setTicketsQuantity] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        if(ticketsQuantity != 0){
            setTotalAmount(ticketsQuantity * dolarPrice * ticketPrice)
        } 
    }, [ticketsQuantity])

    async function handleSubmit(e: Event){
        e.preventDefault();
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        formData.append("ticketsQuantity", ticketsQuantity.toString())
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("raffleId", raffleId.toString())
        const fileInput = document.getElementById("fileInput")
        formData.append("receiptFile", fileInput.files[0])

        const res = await fetch(`http://localhost:8000/api/buyRandomTicket`, {
            method: "post",
            body: formData,
        })
        setLoading(false)

        if(res.status == 201){
            globalThis.location.replace("/SuccessfulPucharse")
        }
    }

    return(<div class="RandomTickets">
        <h2>Compra tus numeros aqui!</h2>
        <button onClick={changeMethod} disabled={loading}>Escoger numeros</button>
        <div class="Selector">
            <button
                class="MinusButton"
                disabled={(ticketsQuantity <= 1) || loading}
                onClick={() => setTicketsQuantity(ticketsQuantity - 1)}
            ><h1>-</h1></button>                
            <h1>{ticketsQuantity}</h1>
            <button
                class="PlusButton"
                onClick={() => setTicketsQuantity(ticketsQuantity + 1)}
                disabled={loading}
            ><h1>+</h1></button>
        </div>
        <h2>Monto total: {totalAmount.toFixed(2)} Bs</h2>
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nombre:" required disabled={loading}/>
            <input name="identification" placeholder="Cedula:" required disabled={loading}/>
            <input name="phone" placeholder="Telefono:" required disabled={loading}/>
            <input name="email" placeholder="Correo: " required disabled={loading}/>
            <input name="receipts" type="file" accept="image/*, .pdf" id="fileInput" required disabled={loading}/>
            <button type="submit" disabled={loading}>{loading ? "Cargando":"Comprar"}</button>
        </form>
    </div>)
}