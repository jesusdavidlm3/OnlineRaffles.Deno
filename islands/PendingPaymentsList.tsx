import { useState, useEffect } from "preact/hooks"
import { supabase } from "../libs/supabase.ts"

export default function PendingPaymentsList({raffleId, apiUrl, imageUrl}){
    
    const [currentList, setCurrentList] = useState([])

    useEffect(() => {
        if(currentList.length == 0){
            updateListElements(raffleId)
        }
    }, [currentList])

    async function updateListElements(raffleId: string){
        const res = await fetch(`${apiUrl}/api/getPendingPaymentsList`, {
            method: 'post',
            body: JSON.stringify({raffleId: raffleId})
        })
        const response = await res.json()
        if(response.length > 0){
            setCurrentList(response)
        }else{
            const rejectedRes = await fetch(`${apiUrl}/api/getRejectedPaymentsList`, {
                method: 'post',
                body: JSON.stringify({raffleId: raffleId})
            })
            const rejectedResponse = await rejectedRes.json()
            if(rejectedResponse.length > 0 ){
                setCurrentList(rejectedResponse)
            }
        }
    }

    async function confirmPayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/confirmPayment`, {
            method: 'post',
            body: JSON.stringify({ticketId: ticketId})
        })
        if(res.status == 200){
            setCurrentList(c => c.filter(item => item.id != ticketId))
        }
    }

    async function rejectPayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/rejectPayment`, {
            method: 'post',
            body: JSON.stringify({ticketId: ticketId})
        })
        if(res.status == 200){
            setCurrentList(c => c.filter(item => item.id != ticketId))
        }
    }

    return(
        <>
            {currentList.map(item => (
                    <div class="listItem">
                    <div class="info">
                        <h4>Nombre: {item.name}</h4>
                        <h4>Cedula: {item.identification}</h4>
                        <h4>Dolar a la compra: {item.dolarPrice}</h4>
                        <h4>Numeros: {item.numbers.map(number => `${number}, `)}</h4>
                        <h4>Telefono: {item.phone}</h4>
                        <h4>Correo: {item.email}</h4>
                    </div>
                    <div class="buttons">
                        <button onClick={() => confirmPayment(item.id)}>Aceptar</button>
                        <button onClick={() => rejectPayment(item.id)}>Rechazar</button>
                        <a href={`${imageUrl}${item.receipt}`} target="_blank"><button>Ver comprobante</button></a>
                    </div>
                </div>
                ))}
        </>
    )
}