import { useState } from "preact/hooks"

export default function UserAgreeModal(){

    const [backDropVisibility, setBackDropVisibility] = useState<string | null>(null)
    const [modalVisibility, setModalVisibility] = useState<string | null>(null)

    return(
        <div class={`ModalBase ${backDropVisibility}`}>
            <div class={`UserAgreeModal ${modalVisibility}`}>
                <h2>Terminos y condiciones</h2>
                <h3>Para particiar en cualquier sorteo se presentan las siguientes condiciones:</h3>
                <p>Condicion 1</p>
                <p>Condicion 2</p>
                <p>Condicion 3</p>
                <p>Condicion 4</p>
                <button type="button" onClick={() => {setBackDropVisibility("blendOut"); setModalVisibility("reduce")}}>Cerrar</button>
            </div>
        </div>
    )
}