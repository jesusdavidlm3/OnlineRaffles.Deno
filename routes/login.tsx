import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";
import LoginForm from "../islands/login.tsx";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const apiUrl = Deno.env.get("front_url")
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