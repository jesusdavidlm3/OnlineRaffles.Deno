import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import { supabase } from "../../libs/supabase.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const ticketId = ctx.params.ticketId
        const {data: ticket, error} = await supabase.from("tickets").select("numbers").eq("id", ticketId)
        return ctx.render(ticket[0])
    }
}

export default function SuccessfulPucharse(props: PageProps){

    return(
        <div class="SuccessfulPucharse">
            <img src="/check-icon.png" draggable={false}/>
            <h1>Compra realizada exitosamente</h1>
            <h3>Numeros comprados: {props.data.numbers.map((item: number) => <>{item},</>)}</h3>
            <a href="/"><h3>Volver</h3></a>        
        </div>
    )
}