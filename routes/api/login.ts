import { Handlers, FreshContext } from "$fresh/server.ts";
import { setCookie } from "@std/http/cookie";
import loginOnSupabase from "../../functions/loginOnSupabase.ts"
import path from "node:path";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const formData = await req.formData()
        const email = formData.get("email")!.toString()
        const password = formData.get("password")!.toString()

        const data = await loginOnSupabase(email, password)
        
        // const res = new Response()
        const headers = new Headers()
        const apiUrl = Deno.env.get("front_url")

        const tokenCookie = {
            name: 'token',
            value: data.session.access_token,
            path: "/"
        }
        const refreshCookie = {
            name: 'refresh',
            value: data.session.refresh_token,
            path: "/"
        }
        const emailCookie = {
            name: 'email',
            value: data.user.email,
        }

        setCookie(headers, tokenCookie)
        setCookie(headers, refreshCookie)
        // setCookie(headers, emailCookie)

        return new Response(JSON.stringify(data), {headers})
    }
}