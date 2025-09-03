import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import rafflesListForDashboard from "../../functions/rafflesListForDashboard.ts"
import { getCookies } from "@std/http/cookie";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const pagination = ctx.params.page
        const cookies = getCookies(req.headers)
        console.log(cookies)
        const list = await rafflesListForDashboard(Number(pagination))
        return ctx.render(list)
    }
}

export default function DashboardPage(props: PageProps){
    console.log(props.data)
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>Correo@correo.com</h4>
                <div class="buttons">
                    <a href="/Dashboard/raffle/New"><button>Nueva rifa</button></a>
                    <button>Salir</button>
                </div>
            </div>
            <div class="listContainer">
                <div class="listItem listItemMainDashboard">
                    <img/>
                    <h3>Titulo</h3>
                </div>
            </div>
        </div>
    )
}