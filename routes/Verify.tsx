import NavBar from "../islands/NavBar.tsx"
import Vierifier from "../islands/Verifier.tsx"
import Footer from "../components/Footer.tsx"

export default function verify(){
    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>Verificacion</h1>
            <p>A continuation ingrese su numero de cedula para verificar la compra de sus tickets</p>
            <Vierifier/>
        </div>
        <Footer/>
    </>)
}