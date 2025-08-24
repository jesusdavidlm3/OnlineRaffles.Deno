import { FreshContext } from "$fresh/server.ts";

export const handler = (req: Request, _ctx: FreshContext): Response => {
    console.log(req)
    return new Response("test")
}