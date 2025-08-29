import UserAgreementsModal from "../islands/UserAgreementsModal.tsx"
import NavBar from "../islands/NavBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabase } from "../libs/supabase.ts";
import { Iraffle } from "../types/raffle.ts";
import Footer from "../components/Footer.tsx"

const supabaseUrl = Deno.env.get("supabase_url")

export const handler: Handlers = {
  async GET(_req, ctx){
    const {data: raffleList, error} = await supabase.from("raffles").select("*").is("status", true);
    return ctx.render({...raffleList![0], flyer: `${supabaseUrl}/storage/v1/object/public/${raffleList[0].flyer}`});
  }
}

export default function Home(props: PageProps) {

  const currentRaffle: Iraffle = props.data;

  return (<>
    <UserAgreementsModal/>
    <NavBar/>
    <div class="PageBasis">
      <h1>Pagina Principal</h1>
      <a href={`/raffle/${currentRaffle.id}`} class="mainRaffle">
        <h2>{currentRaffle.title}</h2>
        <img src={currentRaffle.flyer} class="flyer" draggable={false}/>
        Toca para participar
        <p>{currentRaffle.description}</p>
      </a>
    </div>
    <Footer/>
  </>);
}
