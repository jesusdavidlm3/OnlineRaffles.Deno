import { useState } from "preact/hooks"

export default function UserAgreeModal(){

    const [backDropVisibility, setBackDropVisibility] = useState<string | null>(null)
    const [modalVisibility, setModalVisibility] = useState<string | null>(null)

    return(
        <div class={`ModalBase ${backDropVisibility}`}>
            <div class={`UserAgreeModal ${modalVisibility}`}>
                <h2>Terminos y condiciones</h2>
                <h3>Para particiar en cualquier sorteo se presentan las siguientes condiciones:</h3>
                <p>
                    1.Los números disponibles para la compra en cada uno de nuestros sorteos se especificarán en la página de detalles correspondientes a cada sorteo.<br/><br/>
                    2. Los tickets serán enviados en un lapso de 24 a 48 horas debido al alto volumen de pagos por procesar.<br/><br/>
                    3. Solo podrán participar en nuestros sorteos personas naturales mayores de 18 añios con nacionalidad venezolana, extranjeros que residan legalmente en Venezuela. (De ser personas del extranjero deben autorizar a un familiar a recibir dicho premio).<br/><br/>
                    4. La compra mínima requerida para participar en nuestros sorteos sera establecida en cada sorteo a realizar mediante la publicidad establecida.<br/><br/>
                    5. Para reclamar tu premio tienes un lapso de 72 horas.<br/><br/>
                    6. Los ganadores aceptan aparecer en e contenido audiovisual del sorteo mostrando su presencia en las redes sociales y la entrega de los premios. Esto es OBLIGATORIO.<br/><br/>
                </p>
                <button type="button" onClick={() => {setBackDropVisibility("blendOut"); setModalVisibility("reduce")}}>Cerrar</button>
            </div>
        </div>
    )
}