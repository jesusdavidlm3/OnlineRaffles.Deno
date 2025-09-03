import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        return ctx.render()
    }
}

export default function New(props: PageProps){
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>Correo@correo.com</h4>
                <div class="buttons">
                    <button>Atras</button>
                    <button>Salir</button>
                </div>
            </div>
            <h1>Crear nueva rifa</h1>
            <form>
                <label>Titulo:</label>
                <input/>
                <label>Descripcion:</label>
                <input/>
                <label>Precio del numero:</label>
                <input/>
                <label>Minimo de numeros por compra:</label>
                <input/>
                <label>Cantidad total de numeros:</label>
                <input/>
                <label>Flyer:</label>
                <input type="file" />
                <button type="submit">Crear rifa</button>
            </form>
        </div>
    )
}