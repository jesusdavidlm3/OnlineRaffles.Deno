import { useState } from "preact/hooks";
import { Iticket } from "../types/ticket.ts";

export default function Verifier(){

    const [tickets, setTickets] = useState([])

    const verify = async() => {
        const identification = document.getElementById("inputId").value
        const res = await fetch("http://localhost:8000/api/verifyTicket",{
            body: JSON.stringify({identification: identification}),
            method: 'post'
        })
        const response = await res.json()
        setTickets(response)
    }

    return(<>
        <input placeholder="Numero de cedula:" class="input" id="inputId"/>
        <button onClick={verify}>Verificar</button>
        <div class="listContainer">
            {tickets.map(item => <div class="listItem">
                <h1>Rifa: {item.title}</h1>
                <h3>Cliente: {item.clientname}</h3>
                <h3>Numeros: {item.numbers.map(item => <>{item}, </>)}</h3>
                {item.ticketstatus == 0 && <h3>Pendiente por verificar pago</h3>}
                {item.ticketstatus == 1 && <h3>Compra verificada</h3>}
                {item.ticketstatus == 2 && <h3>Error en su pago</h3>}
            </div>)}
        </div>
    </>)
}