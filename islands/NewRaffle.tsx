export default function NewRaffle({apiUrl}){

    async function submitForm(e: Event){
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const flyerInput = document.getElementById("flyer")
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
            <input name="title"/>
            <label>Descripcion:</label>
            <input name="description"/>
            <label>Precio del numero:</label>
            <input name="ticketPrice"/>
            <label>Minimo de numeros por compra:</label>
            <input name="minBuy"/>
            <label>Cantidad total de numeros:</label>
            <input name="ticketsLimit"/>
            <label>Flyer:</label>
            <input name="flyer" type="file" id="flyer" />
            <button type="submit">Crear rifa</button>
        </form>
    )
}