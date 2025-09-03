import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        return ctx.render()
    }   
}

export  default function RaffleDashboard(props: PageProps){
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>Correo@correo.com</h4>
                <div class="buttons">
                    <button>Atras</button>
                    <button>Salir</button>
                </div>
            </div>
            <div class="dashboardRaffleTile">
                <h1>Titulo</h1>
                <button>Desactivar</button>
            </div>
            <h1>pagos</h1>
            <div class="listContainer">
                <div class="listItem">
                    <div class="info">
                        <h4>Nomre</h4>
                        <h4>Cedula</h4>
                        <h4>Dolar a la compra</h4>
                        <h4>Numeros:</h4>
                    </div>
                    <div class="buttons">
                        <button>Aceptar</button>
                        <button>Rechazar</button>
                        <button>Descargar comprobante</button>
                    </div>
                </div>
            </div>
        </div>
    )
}