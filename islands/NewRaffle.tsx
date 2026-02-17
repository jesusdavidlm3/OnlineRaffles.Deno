export default function NewRaffle({apiUrl}: {apiUrl: string}){

    async function submitForm(e: Event){
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const flyerInput = document.getElementById("flyer") as HTMLInputElement
        formData.append("flyerFile", flyerInput.files[0])

        const res = await fetch(`${apiUrl}/api/newRaffle`, {
            method: 'post',
            body: formData
        })

        if(res.status == 200){
            globalThis.location.replace("/Dashboard/1")
        }
    }

    return(
        <form onSubmit={submitForm}>
            <label>Titulo:</label>
            <input required name="title"/>
            <label>Descripcion:</label>
            <textarea required name="description"/>
            <label>Moneda:</label>
            <select required name="currency">
                <option value="Dolares">Dolares</option>
                <option value="Bolivares">Bolivares</option>
                <option value="Dolares y Bolivares">Dolares y Bolivares</option>
            </select>
            <label>Precio del numero:</label>
            <input required name="ticketPrice" type="number"/>
            <label>Minimo de numeros por compra:</label>
            <input required name="minBuy" type="number"/>
            <label>Cantidad total de numeros:</label>
            <input required name="ticketsLimit" type="number"/>
            <label>Metodo de venta:</label>
            <select required name="sellMethod">
                <option value="select">Elegir numeros</option>
                <option value="random">Numeros aleatorios</option>
                <option value="dual">Ambos</option>
            </select>
            <label>Flyer:</label>
            <input required name="flyer" type="file" id="flyer" />
            <button type="submit">Crear rifa</button>
        </form>
    )
}