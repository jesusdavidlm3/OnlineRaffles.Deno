import NavBar from "../../islands/NavBar.tsx"
import { Handlers, PageProps } from "$fresh/server.ts"
import { supabase } from "../../libs/supabase.ts";
import Buyer from "../../islands/Buyer.tsx"

export const handler: Handlers = {
    async GET(_req, ctx){
        const raffleId = ctx.params.raffleId
        const {data: currentRaffle, error} = await supabase.from("raffles").select("*").eq("id", raffleId)
        return ctx.render(currentRaffle)
    }
}

export default function raffle(props: PageProps){

    const currentRaffle = props.data[0]

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>{currentRaffle.title}</h1>
            <Buyer />
        </div>
    </>)
}