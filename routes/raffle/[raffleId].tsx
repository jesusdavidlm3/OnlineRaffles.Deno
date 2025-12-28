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
        console.log(data)
        return ctx.render(data);
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
            <SoldBar sold={currentRaffle.soldnumbers} total={currentRaffle.ticketslimit}/>
            <Buyer
                ticketPrice={currentRaffle.ticketprice}
                raffleId={currentRaffle.id}
                apiUrl={apiUrl!}
                minBuy={currentRaffle.minbuy}
                raffleStatus={currentRaffle.status}
                soldNumbers={currentRaffle.soldnumbers}
                ticketsLimit={currentRaffle.ticketslimit}
            />
            <Footer/>
        </div>
    </>)
}