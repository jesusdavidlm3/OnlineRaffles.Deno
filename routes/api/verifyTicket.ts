import { Handlers, FreshContext } from "$fresh/server.ts";
import verifyTicketOnDb from "../../functions/verifyTicketOnDb.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const requestData = await req.json()

        const res = await verifyTicketOnDb(requestData.identification)
        // console.log(res)
        return new Response(JSON.stringify(res))
    }
}