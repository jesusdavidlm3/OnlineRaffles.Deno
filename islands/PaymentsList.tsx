import { useState, useEffect } from "preact/hooks"
import { supabase } from "../libs/supabase.ts"

interface IPaymentList{
    raffleId: string,
    apiUrl: string,
    imageUrl: string,
    raffleStatus: number
}

export default function PaymentsList({raffleId, apiUrl, imageUrl, raffleStatus}: IPaymentList){
    
    const [currentList, setCurrentList] = useState([])
    const [page, setPage] = useState<number>(1)
    const [pendingPayments, setPendingPayments] = useState<boolean>(true)

    useEffect(() => {
        if(currentList.length == 0 && pendingPayments === true){
            updateListElements(raffleId)
        }else if(currentList.length == 0 && pendingPayments === false){
            getAllElements()
        }
    }, [currentList, page])

    useEffect(() => {
        getAllElements()
    }, [page])

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
            }else{
                setPendingPayments(false)
                getAllElements()
            }
        }
    }

    async function getAllElements(){
        const res = await fetch(`${apiUrl}/api/getAllRafflePayments`,{
            method: 'post',
            body: JSON.stringify({raffleId: raffleId, page: page})
        })
        if(res.status == 200){
            const response = await res.json()
            if(response.length > 0){
                setCurrentList(response)
            }
        }
    }

    async function confirmPayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/confirmPayment`, {
            method: 'post',
            body: JSON.stringify({ticketId: ticketId, page: page})
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

    async function deletePayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/deletePayment`, {
            method: 'delete',
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
                        <h4>Dolar a la compra: Bs. {Number(item.dolarPrice).toFixed(2)}</h4>
                        <h4>Numeros: {item.numbers.map(number => `${number}, `)}</h4>
                        <h4>Monto cancelado: Bs. {Number(item.dolarPrice * item.numbers.length).toFixed(2)}</h4>
                        <h4>Telefono: {item.phone}</h4>
                        <h4>Correo: {item.email}</h4>
                    </div>
                    { item.status != 1 && <div class="buttons">
                        <button onClick={() => confirmPayment(item.id)}>Aceptar</button>
                        <button onClick={() => rejectPayment(item.id)}>Rechazar</button>
                        {item.status == 2 && <button onClick={() => deletePayment(item.id)}>Eliminar</button>}
                        <a href={`${imageUrl}${item.receipt}`} target="_blank"><button>Ver comprobante</button></a>
                    </div>}
                </div>
            ))}
            {(raffleStatus == 2 || pendingPayments === false) && 
                <div class="pagination">
                    <button onClick={() => setPage(page-1)} disabled={page == 1}>Anterior</button>
                    <h3>{page}</h3>
                    <button onClick={() => setPage(page+1)}>Siguiente</button>
                </div>
            }
        </>
    )
}