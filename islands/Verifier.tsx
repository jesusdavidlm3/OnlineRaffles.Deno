import { useState } from "preact/hooks";
import { Iticket } from "../types/ticket.ts";

export default function Verifier(){

    const [tickets, setTickets] = useState<Iticket[]>([])

    return(<>
        <input placeholder="Numero de cedula:" class="input"/>
        <div class="listContainer">
            {tickets.map(item => <div class="listItem">
                {item.number}
            </div>)}
        </div>
    </>)
}