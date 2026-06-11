import NavBar from "../islands/NavBar.tsx"
import Vierifier from "../islands/Verifier.tsx"
import Footer from "../components/Footer.tsx"

const apiUrl = Deno.env.get("RAILWAY_PUBLIC_DOMAIN")

export default function verify(){
    return(<>
        <NavBar/>
        <div class="PageBasis">
            <div class="VerifyPage">
                <h1>VERIFICACIÓN</h1>
                <p>A continuation ingrese su numero de cedula o ticket para verificar su compra.</p>
                <Vierifier apiUrl={apiUrl!}/>
            </div>
        </div>
        <Footer/>
    </>)
}