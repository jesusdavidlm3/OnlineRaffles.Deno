import NavBar from "../../islands/NavBar.tsx"
import { Handlers, PageProps } from "$fresh/server.ts"
import Buyer from "../../islands/Buyer.tsx"
import Footer from "../../components/Footer.tsx";
import getRaffleInfo from "../../functions/getRaffleInfo.ts"
import SoldBar from "../../components/SoldBar.tsx";
import { bucketStorage } from "../../libs/client.ts";

const supabaseUrl = Deno.env.get("supabase_url")
const apiUrl = Deno.env.get("FRONT_URL")

export const handler: Handlers = {
    async GET(_req, ctx){
        const raffleId = ctx.params.raffleId
        const data = await getRaffleInfo(raffleId)
        const flyerUrl = await bucketStorage.presignedGetObject(`flyers/${data.flyer}`)
        console.log(data)
        return ctx.render({...data, flyerUrl: flyerUrl});
    }
}

export default function raffle(props: PageProps){

    const currentRaffle = props.data

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>{currentRaffle.title}</h1>
            <img src={currentRaffle.flyerUrl} class="flyer" draggable={false}/>
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