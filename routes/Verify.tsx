import NavBar from "../islands/NavBar.tsx"
import Vierifier from "../islands/Verifier.tsx"
import Footer from "../components/Footer.tsx"

const apiUrl = Deno.env.get("front_url")

export default function verify(){
    return(<>
        <NavBar/>
        <div class="PageBasis">
            <div class="VerifyPage">
                <h1>Verificacion</h1>
                <p>A continuation ingrese su numero de cedula para verificar la compra de sus tickets</p>
                <Vierifier apiUrl={apiUrl!}/>
            </div>
        </div>
        <Footer/>
    </>)
}