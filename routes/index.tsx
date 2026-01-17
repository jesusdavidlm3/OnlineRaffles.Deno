import UserAgreementsModal from "../islands/UserAgreementsModal.tsx"
import NavBar from "../islands/NavBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Iraffle } from "../types/raffle.ts";
import Footer from "../components/Footer.tsx"
import getActiveRaffle from "../functions/getActiveRaffle.ts"
import { bucketStorage } from "../libs/client.ts";

const supabaseUrl = Deno.env.get("supabase_url")

export const handler: Handlers = {
  async GET(_req, ctx){
    const raffle = await getActiveRaffle();
    if(raffle === false){
      return ctx.render();
    }else{
      const flyerUrl = await bucketStorage.presignedGetObject(`flyers/${raffle[0].flyer}`, {expirySeconds: 10})
      const props = {...raffle[0], flyerUrl: flyerUrl}
      // console.log(props)
      return ctx.render(props);
    }
  }
}

export default function Home(props: PageProps) {

  const currentRaffle = props.data;

  return (<>
    <UserAgreementsModal/>
    <NavBar/>
    <div class="PageBasis">
      <h1>Pagina Principal</h1>
      {currentRaffle != undefined ? (
        <a href={`/raffle/${currentRaffle.id}`} class="mainRaffle">
          <h2>{currentRaffle.title}</h2>
          <img src={currentRaffle.flyerUrl} class="flyer" draggable={false}/>
          Toca para participar
          <p style={{whiteSpace: "pre-line"}}>{currentRaffle.description}</p>
        </a>
      ):(
        <>
          <h1>Actualmente no hay ninguna rifa en funcionamiento</h1>
          <h3>Vuelve pronto para estar al pendiente</h3>
        </>
      )}
      
    </div>
    <Footer/>
  </>);
}
