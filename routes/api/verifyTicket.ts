import { Handlers, FreshContext } from "$fresh/server.ts";
import verifyTicketOnSupabase from "../../functions/verifyTicketOnSupabase.ts";

export const handler: Handlers = {
    async POST(req: Request, ctx: FreshContext){
        const requestData = await req.json()

        const supabaseRes = await verifyTicketOnSupabase(requestData.identification)
        console.log(supabaseRes)
        return new Response(JSON.stringify(supabaseRes))
    }
}