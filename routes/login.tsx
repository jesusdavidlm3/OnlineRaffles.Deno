import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import LoginForm from "../islands/login.tsx";

export const handler: Handlers = {
    GET(_req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("RAILWAY_PUBLIC_DOMAIN")
        return ctx.render(apiUrl)
    }
}

export default function login(props: PageProps){
    return(
        <LoginForm
            apiUrl={props.data}
        />
    )
}