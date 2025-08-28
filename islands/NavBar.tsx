import { useState } from "preact/hooks"

export default function NavBar(){

    const [showMenu, setShowMenu] = useState<string>("hidden")

    return(
        <div class="NavBar">
            <h4>Evelio</h4>
            <img src="/menu-icon.png" class="menuIcon" onClick={() => setShowMenu("showMenu")}/>
            <div class={`${showMenu} menuBackDrop`}>
                <div class={`${showMenu} hiddenMenu`}>
                    <img src="/menu-icon.png" class="menuIcon" onClick={() => setShowMenu("hideMenu")}/>
                    <a href="/">Inicio</a>
                    <a href="/Verify">Verificar tickets</a>
                    <a href="/Support">Soporte</a>
                </div>
            </div>
        </div>
    )
} 