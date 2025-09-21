import { useState, useEffect } from "preact/hooks"

interface IpaymentList{
    raffleId: string,
    apiUrl: string,
    imageUrl: string,
    raffleStatus: number
}

interface Ipayment{
    id: string,
    name: string,
    identification: string,
    dolarPrice: number,
    numbers: number[],
    phone: string, 
    email: string,
    status: number,
    receipt: string
}

// Primero se piden 10 pagos pendientes, al agotar la lista se piden 10 mas. los pendientes tienen prioridad
// Despues de agotar los pendientes se pediran los rechazados para comunicarse y confirmar o liberar los numeros
// si la rifa esta cerrada pero no archivada se visualizaran todos los pagos con paginacion al no haber pagos pendientes.

export default function PaymentsList({raffleId, apiUrl, imageUrl, raffleStatus}: IpaymentList){
    
    const [currentList, setCurrentList] = useState([])
    const [page, setPage] = useState<number>(1)
    const [pendingPayments, setPendingPayments] = useState<boolean>(true)   //Si no hay pagos pendientes se traen los
                                                                            //pagos rechazados
    useEffect(() => {
        if(currentList.length == 0 && pendingPayments === true){
            updateListElements(raffleId)
        }else if(currentList.length == 0 && pendingPayments === false){
            getAllElements()
        }
    }, [currentList, page])

    useEffect(() => {
        if(pendingPayments === false){
            getAllElements()
        }
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
            setCurrentList(c => c.filter((item: Ipayment) => item.id != ticketId))
        }
    }

    async function rejectPayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/rejectPayment`, {
            method: 'post',
            body: JSON.stringify({ticketId: ticketId})
        })
        if(res.status == 200){
            setCurrentList(c => c.filter((item: Ipayment) => item.id != ticketId))
        }
    }

    async function deletePayment(ticketId: string){
        const res = await fetch(`${apiUrl}/api/deletePayment`, {
            method: 'delete',
            body: JSON.stringify({ticketId: ticketId})
        })
        if(res.status == 200){
            setCurrentList(c => c.filter((item: Ipayment) => item.id != ticketId))
        }
    }

    return(
        <>
            {currentList.map((item: Ipayment) => (
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
                        <button type="button" onClick={() => confirmPayment(item.id)}>Aceptar</button>
                        <button type="button" onClick={() => rejectPayment(item.id)}>Rechazar</button>
                        {item.status == 2 && <button type="button" onClick={() => deletePayment(item.id)}>Eliminar</button>}
                        <a href={`${imageUrl}${item.receipt}`} target="_blank"><button type="button">Ver comprobante</button></a>
                    </div>}
                </div>
            ))}
            {(raffleStatus == 2 || pendingPayments === false) && 
                <div class="pagination">
                    <button type="button" onClick={() => setPage(page-1)} disabled={page == 1}>Anterior</button>
                    <h3>{page}</h3>
                    <button type="button" onClick={() => setPage(page+1)}>Siguiente</button>
                </div>
            }
        </>
    )
}