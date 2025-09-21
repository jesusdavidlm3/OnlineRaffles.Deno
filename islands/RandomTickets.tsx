import { useState, useEffect } from "preact/hooks"

interface IrandomTickets{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void,
    apiUrl: string,
    minBuy: number
}

export default function RandomTickets({ticketPrice = 1, raffleId, dolarPrice, changeMethod, apiUrl, minBuy = 1}: IrandomTickets){

    const [loading, setLoading] = useState(false)

    const [ticketsQuantity, setTicketsQuantity] = useState<number>(minBuy)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        if(ticketsQuantity != 0){
            setTotalAmount(dolarPrice * ticketPrice * ticketsQuantity)
        } 
    }, [ticketsQuantity, dolarPrice])

    async function handleSubmit(e: Event){
        e.preventDefault();
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        formData.append("ticketsQuantity", ticketsQuantity.toString())
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("raffleId", raffleId.toString())
        const fileInput = document.getElementById("fileInput") as HTMLInputElement
        formData.append("receiptFile", fileInput!.files[0])
        formData.append("dolarPrice", dolarPrice.toString())

        const res = await fetch(`${apiUrl}/api/buyRandomTicket`, {
            method: "post",
            body: formData,
        })
        setLoading(false)

        const ticketInfo = await res.json()
        console.log(ticketInfo)

        if(res.status == 201){
            globalThis.location.replace(`/SuccessfulPucharse/${ticketInfo.id}`)
        }
    }

    return(<div class="RandomTickets">
        <h2>Compra tus numeros aqui!</h2>
        <button type="button" onClick={changeMethod} disabled={loading}>Escoger numeros</button>
        <div class="Selector">
            <button
                type="button"
                class="MinusButton"
                disabled={(ticketsQuantity <= minBuy) || loading}
                onClick={() => setTicketsQuantity(ticketsQuantity - 1)}
            ><h1>-</h1></button>                
            <h1>{ticketsQuantity}</h1>
            <button
                type="button"
                class="PlusButton"
                onClick={() => {if(ticketsQuantity < minBuy){setTicketsQuantity(minBuy)}else{setTicketsQuantity(ticketsQuantity + 1)}}}
                disabled={loading}
            ><h1>+</h1></button>
        </div>
        <h2>Monto total: {totalAmount.toFixed(2)} Bs</h2>
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nombre:" required disabled={loading}/>
            <input name="identification" placeholder="Cedula:" required disabled={loading} type="number"/>
            <input name="phone" placeholder="Telefono:" required disabled={loading} type="number"/>
            <input name="email" placeholder="Correo: " required disabled={loading} type="email"/>
            <input name="reference" placeholder="Referencia de pago: " required disabled={loading} type="number"/>
            <label style={{alignSelf: 'start', marginLeft: '15px'}}>Comprobante de pago:</label>
            <input name="receipts" type="file" accept="image/*, .pdf" id="fileInput" required disabled={loading}/>
            <button type="submit" disabled={loading}>{loading ? "Cargando":"Comprar"}</button>
        </form>
    </div>)
}