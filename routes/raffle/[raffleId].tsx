import NavBar from "../../islands/NavBar.tsx"
import { Handlers, PageProps } from "$fresh/server.ts"
import { supabase } from "../../libs/supabase.ts";
import Buyer from "../../islands/Buyer.tsx"
import { Iraffle } from "../../types/raffle.ts";
import Footer from "../../components/Footer.tsx"

const supabaseUrl = Deno.env.get("supabase_url")

export const handler: Handlers = {
    async GET(_req, ctx){
        const raffleId = ctx.params.raffleId
        const {data: rafflesList, error} = await supabase.from("raffles").select("*").eq("id", raffleId)
        return ctx.render({...rafflesList![0], flyer: `${supabaseUrl}/storage/v1/object/public/${rafflesList[0].flyer}`});
    }
}

export default function raffle(props: PageProps){

    const currentRaffle: Iraffle = props.data

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>{currentRaffle.title}</h1>
            <img src={currentRaffle.flyer} class="flyer" draggable={false}/>
            <p>{currentRaffle.description}</p>
            <Buyer
                ticketPrice={currentRaffle.ticketPrice}
                raffleId={currentRaffle.id}
            />
            <Footer/>
        </div>
    </>)
}