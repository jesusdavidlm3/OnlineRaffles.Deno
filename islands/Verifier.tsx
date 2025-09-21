import { useState } from "preact/hooks";
import { Fragment } from "preact"

interface Iverifier{
    apiUrl: string
}

interface Iticket{
    id: string,
    ticketstatus: number,
    title: string,
    clientname: string,
    numbers: number[]
}

export default function Verifier({apiUrl}: Iverifier){
    const [tickets, setTickets] = useState([])

    const verify = async() => {
        const identification = document.getElementById("inputId") as HTMLInputElement
        const res = await fetch(`${apiUrl}/api/verifyTicket`,{
            body: JSON.stringify({identification: identification.value}),
            method: 'post'
        })
        const response = await res.json()
        setTickets(response)
    }

    return(<>
        <input placeholder="Numero de cedula:" class="input" id="inputId"/>
        <button type="button" onClick={verify}>Verificar</button>
        <div class="listContainer">
            {tickets.map((item: Iticket) => <div key={item.id} class="listItem ticket">
                <h1>Rifa: {item.title}</h1>
                <h3>Cliente: {item.clientname}</h3>
                <h3>Numeros: {item.numbers.map(item => <Fragment key={item}>{item}, </Fragment>)}</h3>
                {item.ticketstatus == 0 && <h3>⌛Pendiente por verificar pago</h3>}
                {item.ticketstatus == 1 && <h3>✅Compra verificada</h3>}
                {item.ticketstatus == 2 && <h3>🚫Error en su pago</h3>}
            </div>)}
        </div>
    </>)
}