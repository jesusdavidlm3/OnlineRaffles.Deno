import { useState } from "preact/hooks"

export default function NavBar(){

    const [menuBackdropAnim, setMenuBackdropAnim] = useState<string>("hidden")
    const [menuAnim, setMenuAnim] = useState<string>("hidden")
    const [open, setOpen] = useState<boolean>(false)

    const changeState = () => {
        if(open === false){
            setMenuBackdropAnim("blendIn")
            setMenuAnim("showMenu")
        }else{
            setMenuBackdropAnim("blendOut")
            setMenuAnim("hideMenu")
        }
        setOpen(!open)
    }

    return(
        <div class="NavBar">
            <h4>Evelio</h4>
            <img src="/menu-icon.png" class="menuIcon" onClick={changeState}/>
            <div class={`${menuBackdropAnim} menuBackDrop`}>
                <div class={`${menuAnim} menu`}>
                    <img src="/menu-icon.png" class="menuIcon" onClick={changeState}/>
                    <a href="/">Inicio</a>
                    <a href="/Verify">Verificar tickets</a>
                    <a href="/Support">Soporte</a>
                </div>
            </div>
        </div>
    )
} 