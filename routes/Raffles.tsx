import NavBar from "../islands/NavBar.tsx";
import getActiveRafflesList from "../functions/getActiveRafflesList.ts"
import { Handlers, FreshContext, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req: Request, ctx: FreshContext){
        const list = await getActiveRafflesList()
        return ctx.render(list)
    }
}

export default function Raffles(props: PageProps){

    const list = props.data

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>Rifas activas</h1>
            <div class="listContainer">
                {list?.map(item => <a href={`/raffle/${item.id}`} class="listItem">
                    {item.title}
                </a>)}
            </div>
        </div>
    </>)
}