import { Handlers } from "$fresh/server.ts";
import { useState, useEffect } from "preact/hooks"
import { Iticket } from "../types/ticket.ts";

interface IrandomTickets{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void
}

export default function RandomTickets({ticketPrice = 1, raffleId, dolarPrice, changeMethod}: IrandomTickets){

    const [ticketsQuantity, setTicketsQuantity] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        if(ticketsQuantity != 0){
            setTotalAmount(ticketsQuantity * dolarPrice * ticketPrice)
        } 
    }, [ticketsQuantity])

    async function handleSubmit(e: Event){
        e.preventDefault();

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        formData.append("ticketsQuantity", ticketsQuantity.toString())
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("raffleId", raffleId.toString())
        const fileInput = document.getElementById("fileInput")
        formData.append("receiptFile", fileInput.files[0])

        // const data: Iticket = {
        //     name: e.target[0].value,
        //     identification: e.target[1].value,
        //     phone: e.target[2].value,
        //     email: e.target[3].value,
        //     receipt: e.target[4].files[0],
        //     raffleId: raffleId,
        //     ticketsQuantity: ticketsQuantity,
        //     dolarPrice: dolarPrice
        // }

        const res = await fetch("http://localhost:8000/api/buyRandomTicket", {
            method: "post",
            // headers: { "Content-Type": "Aplication/JSON" },
            body: formData,
        })

        const result = await res.json()
        console.log(result)
    }

    return(<div class="RandomTickets">
        <h2>Compra tus numeros aqui!</h2>
        <button onClick={changeMethod}>Escoger numeros</button>
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
        <h2>Monto total: {totalAmount.toFixed(2)} Bs</h2>
        <form onSubmit={handleSubmit} >
            <input name="name" placeholder="Nombre:" required/>
            <input name="identification" placeholder="Cedula:" required/>
            <input name="phone" placeholder="Telefono:" required/>
            <input name="email" placeholder="Correo: " required/>
            <input name="receipts" type="file" accept="image/*, .pdf" id="fileInput" required/>
            <button type="submit">Comprar</button>
        </form>

    </div>)
}