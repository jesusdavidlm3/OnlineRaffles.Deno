import { Handlers, FreshContext } from "$fresh/server.ts";
import { setCookie } from "@std/http/cookie";
import loginOnSupabase from "../../functions/loginOnSupabase.ts"
import { createToken } from "../../libs/jwt.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const formData = await req.formData()
        const email = formData.get("email")!.toString()
        const password = formData.get("password")!.toString()

        const data = await loginOnSupabase(email, password)

        if(data === true){
            const token = await createToken(email)
            const headers = new Headers()
            const tokenCookie = {
                name: 'token',
                value: token,
                path: "/"
            }
            setCookie(headers, tokenCookie)
            return new Response(JSON.stringify(data), {headers})
        }else{
            return new Response("error", {status: 500})
        }
    }
}