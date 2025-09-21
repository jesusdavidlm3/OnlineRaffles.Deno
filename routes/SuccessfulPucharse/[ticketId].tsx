import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import getNumbersForATicket from "../../functions/getNumbersForATicket.ts"
import { Fragment } from "preact"

export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext){
        const ticketId = ctx.params.ticketId
        const numbers = await getNumbersForATicket(ticketId)
        return ctx.render(numbers)
    }
}

export default function SuccessfulPucharse(props: PageProps){

    return(
        <div class="SuccessfulPucharse">
            <img src="/check-icon.png" draggable={false}/>
            <h1>Compra realizada exitosamente</h1>
            <h3>Numeros comprados: {props.data.numbers.map((item: number) => <Fragment key={item}>{item},</Fragment>)}</h3>
            <a href="/"><h3>Volver</h3></a>        
        </div>
    )
}