import { supabase } from "../libs/supabase.ts";
import NavBar from "../islands/NavBar.tsx";

export default async function Raffles(){

    const {data: raffles, error} = await supabase
    .from('raffles')
    .select('*')
    .is("status", true)
    console.log(raffles)

    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>Rifas activas</h1>
            <div class="listContainer">
                {raffles?.map(item => <a href={`/raffle/${item.id}`} class="listItem">
                    {item.title}
                </a>)}
            </div>
        </div>
    </>)
}