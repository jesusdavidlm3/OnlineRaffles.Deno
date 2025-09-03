import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import rafflesListForDashboard from "../../functions/rafflesListForDashboard.ts"
import { getCookies } from "@std/http/cookie";
import { createJwt, isJwtValid, isJwtExpired, getJwtPayload } from "@popov/jwt";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const secret = Deno.env.get("secret")                       //Obtenemos el token
        const pagination = ctx.params.page
        const cookies = getCookies(req.headers)
        const token = cookies.token
        
        if(token == undefined){     
            return Response.redirect(`${Deno.env.get("front_url")}/`)
        }else{
            const tokenValidation = await isJwtValid(token, secret!)
            const tokenExp = isJwtExpired(token)
            if(!tokenValidation || tokenExp){
                return Response.redirect(`${Deno.env.get("front_url")}/`)
            }else{
                const payload = getJwtPayload(token)
                const list = await rafflesListForDashboard(Number(pagination))
                return ctx.render({list: list, email: payload.email})
            }
        }
    }
}

export default function DashboardPage(props: PageProps){
    const data = props.data
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>{data.email}</h4>
                <div class="buttons">
                    <a href="/Dashboard/raffle/New"><button>Nueva rifa</button></a>
                    <button>Salir</button>
                </div>
            </div>
            <div class="listContainer">
                {data.list.map(item => 
                    <a href={`/Dashboard/raffle/${item.id}`} class="listItem listItemMainDashboard">
                        <img/>
                        <h3>{item.title}</h3>
                    </a>
                )}
            </div>
        </div>
    )
}