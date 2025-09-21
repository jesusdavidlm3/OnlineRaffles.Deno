import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "@std/http/cookie";
import { getJwtPayload } from "@popov/jwt";
import { verifyAndRenewToken } from "../../../libs/jwt.ts"; 
import NewRaffle from "../../../islands/NewRaffle.tsx";
import { Ipayload } from "../../../types/JWTpayload.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
        const cookies = getCookies(req.headers)
        const token = cookies.token
        const newToken = await verifyAndRenewToken(token)
        if(newToken === false){
            return Response.redirect(`${apiUrl}/`)
        }else{
            const payload = getJwtPayload(token) as Ipayload
            const response = await ctx.render({email: payload.email, apiUrl: apiUrl})
            setCookie(response.headers, {
                name: "token",
                value: token,
                path: "/"
            })
            return response
        }
    }
}

export default function New(props: PageProps){
    const data = props.data
    return(
        <div class="PageBasis Dashboard">
            <div class="dashboardNavBar">
                <h4>{data.email}</h4>
                <div class="buttons">
                    <button type="button">Atras</button>
                    <button type="button">Salir</button>
                </div>
            </div>
            <h1>Crear nueva rifa</h1>
            <NewRaffle
                apiUrl={data.apiUrl}
            />
        </div>
    )
}