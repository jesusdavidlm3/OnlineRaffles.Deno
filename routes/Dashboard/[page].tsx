import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import rafflesListForDashboard from "../../functions/rafflesListForDashboard.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { getJwtPayload } from "@popov/jwt";
import { verifyAndRenewToken } from "../../libs/jwt.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const pagination = ctx.params.page
        const cookies = getCookies(req.headers)
        const token = cookies.token
        
        if(token == undefined){     
            return Response.redirect(`${Deno.env.get("front_url")}/`)
        }else{
            const newToken = await verifyAndRenewToken(token)
            if(newToken === false){
                return Response.redirect(`${Deno.env.get("front_url")}/`)
            }else{
                const payload = getJwtPayload(token)
                const list = await rafflesListForDashboard(Number(pagination))
                const response = await ctx.render({list: list, email: payload.email})
                setCookie(response.headers, {
                    name: "token",
                    value: newToken,
                    path: "/"
                })
                return response
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