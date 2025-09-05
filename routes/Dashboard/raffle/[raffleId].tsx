import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import { supabase } from "../../../libs/supabase.ts";
import { getCookies, setCookie } from "@std/http/cookie";
import { verifyAndRenewToken } from "../../../libs/jwt.ts";
import { getJwtPayload } from "@popov/jwt";
import PendingPaymentList from "../../../islands/PendingPaymentsList.tsx" 

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const raffleId = ctx.params.raffleId
            const payload = getJwtPayload(token)
            const supabaseUrl = Deno.env.get("supabase_url")
            const {data: raffleInfo} = await supabase.from("raffles").select("*").eq("id", raffleId)
            const response = await ctx.render({
                raffle: raffleInfo[0],
                email: payload.email,
                imageUrl: `${supabaseUrl}/storage/v1/object/public/`,
                apiUrl: apiUrl
            })
            setCookie(response.headers, {
                name: token,
                value: newToken
            })
            return response
        }
        
    }   
}

export  default function RaffleDashboard(props: PageProps){
    const raffle = props.data.raffle
    const tickets = props.data.tickets
    const email = props.data.email
    const imageUrl = props.data.imageUrl
    const apiUrl = props.data.apiUrl
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>{email}</h4>
                <div class="buttons">
                    <button>Atras</button>
                    <button>Salir</button>
                </div>
            </div>
            <div class="dashboardRaffleTile">
                <img src={`${imageUrl}${raffle.flyer}`}/>
                <div>
                    <h1>{raffle.title}</h1>
                    <h3>Precio del numero: {raffle.ticketPrice}</h3>
                    <h3>Limite de numeros: {raffle.ticketsLimit}</h3>
                    <h3>Minimo de numeros por venta: {raffle.minBuy}</h3>
                </div>
                {raffle.status === false ? (<h4>Rifa cerrada</h4>):(<button>Desactivar</button>)}
            </div>
            {raffle.status == false ? (<h1>Pagos realizados</h1>):(<h1>Pagos pendientes</h1>)}
            
            <div class="listContainer">
                <PendingPaymentList
                    raffleId={raffle.id}
                    apiUrl={apiUrl}
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    )
}