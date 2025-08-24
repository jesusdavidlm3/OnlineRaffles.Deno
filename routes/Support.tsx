import NavBar from "../islands/NavBar.tsx"
import Footer from "../components/Footer.tsx"

export default function Support(){
    return(<>
        <NavBar/>
        <div class="PageBasis">
            <h1>Soporte</h1>
            <a class="SupportLink">
                <img src="/wsLogo.webp"/>
                <div class="Button">
                    Toca aqui para contactar con soporte
                </div>
            </a>
        </div>
        <Footer/>
    </>)
}