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
    if(raffleList != undefined && raffleList.length > 0){
      const props = {...raffleList![0], flyer: `${supabaseUrl}/storage/v1/object/public/${raffleList[0].flyer}`}
      return ctx.render(props);
    }else{
      return ctx.render();
    }
  }
}

export default function Home(props: PageProps) {

  const currentRaffle: Iraffle = props.data;

  return (<>
    <UserAgreementsModal/>
    <NavBar/>
    <div class="PageBasis">
      <h1>Pagina Principal</h1>
      {currentRaffle != undefined ? (
        <a href={`/raffle/${currentRaffle.id}`} class="mainRaffle">
          <h2>{currentRaffle.title}</h2>
          <img src={currentRaffle.flyer} class="flyer" draggable={false}/>
          Toca para participar
          <p style={{whiteSpace: "pre-line"}}>{currentRaffle.description}</p>
        </a>
      ):(
        <>
          <h1>Actualmente no hay ninguna rifa en funcionamiento</h1>
          <h3>Vuelve propnto para estar al pendiente</h3>
        </>
      )}
      
    </div>
    <Footer/>
  </>);
}
