import NavBar from "../../islands/NavBar.tsx"
import { Handlers, PageProps } from "$fresh/server.ts"
import Buyer from "../../islands/Buyer.tsx"
import Footer from "../../components/Footer.tsx";
import getRaffleInfo from "../../functions/getRaffleInfo.ts"
import SoldBar from "../../components/SoldBar.tsx";

const supabaseUrl = Deno.env.get("supabase_url")
const apiUrl = Deno.env.get("front_url")

export const handler: Handlers = {
    async GET(_req, ctx){
        const raffleId = ctx.params.raffleId
        const data = await getRaffleInfo(raffleId)
        return ctx.render({...data![0], flyer: `${supabaseUrl}/storage/v1/object/public/${data[0].flyer}`});
    }
}

export default function raffle(props: PageProps){

    const currentRaffle = props.data

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>{currentRaffle.title}</h1>
            <img src={currentRaffle.flyer} class="flyer" draggable={false}/>
            <p style={{whiteSpace: 'pre-line'}}>{currentRaffle.description}</p>
            <SoldBar sold={currentRaffle.soldtickets} total={currentRaffle.ticketsLimit}/>
            <Buyer
                ticketPrice={currentRaffle.ticketPrice}
                raffleId={currentRaffle.thisRaffleId}
                apiUrl={apiUrl!}
                minBuy={currentRaffle.minBuy}
                raffleStatus={currentRaffle.status}
                soldNumbers={currentRaffle.soldtickets}
                ticketsLimit={currentRaffle.ticketsLimit}
            />
            <Footer/>
        </div>
    </>)
}