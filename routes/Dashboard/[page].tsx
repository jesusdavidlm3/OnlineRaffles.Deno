import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import rafflesListForDashboard from "../../functions/rafflesListForDashboard.ts"
import { getCookies, setCookie } from "@std/http/cookie";
import { getJwtPayload } from "@popov/jwt";
import { verifyAndRenewToken } from "../../libs/jwt.ts";
import { Ipayload } from "../../types/JWTpayload.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const supabaseUrl = Deno.env.get("supabase_url")

        const pagination = ctx.params.page
        const cookies = getCookies(req.headers)
        const token = cookies.token
        
        if(token == undefined){     
            return Response.redirect(`${apiUrl}/`)
        }else{
            const newToken = await verifyAndRenewToken(token)
            if(newToken === false){
                return Response.redirect(`${apiUrl}/`)
            }else{
                const payload = getJwtPayload(token) as Ipayload
                const list = await rafflesListForDashboard(Number(pagination))
                const response = await ctx.render({
                    page: pagination,
                    list: list,
                    email: payload.email,
                    imageUrl: `${supabaseUrl}/storage/v1/object/public/`,
                    apiUrl: apiUrl
                })
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
                    <a href="/Dashboard/raffle/New"><button type="button">Nueva rifa</button></a>
                    <button type="button">Salir</button>
                </div>
            </div>
            <div class="listContainer">
                {data.list.map(item => 
                    <a key={item} href={`/Dashboard/raffle/${item.id}`} class="listItem listItemMainDashboard">
                        <img src={`${data.imageUrl}${item.flyer}`}/>
                        <h1>{item.title}</h1>
                    </a>
                )}
            </div>
            <div class="pagination">
                { Number(data.page) > 1 && <a href={`${data.apiUrl}/Dashboard/${Number(data.page)-1}`}><button type="button">Anterior</button></a>}
                <h3>{data.page}</h3>
                <a href={`${data.apiUrl}/Dashboard/${Number(data.page)+1}`}><button type="button">Siguiente</button></a>
            </div>
        </div>
    )
}