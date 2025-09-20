import { useEffect, useState } from "preact/hooks";

interface IticketsSelector{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void,
    soldNumbers: number[],
    ticketsLimit: number,
    minBuy: number,
    apiUrl: string
}

export default function TicketsSelector({ticketPrice = 1, raffleId, dolarPrice, changeMethod, soldNumbers, ticketsLimit, minBuy, apiUrl}: IticketsSelector){
    
    // Logica de UI
    const [loading, setLoading] = useState<boolean>(false)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    // Logica de funcionamiento
    const [page, setPage] = useState<number>(1)
    const [pageContent, setPageContent] = useState<number[]>([])
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
    const newContent: number[] = []

    function updatePageContent(){
        for(let i = (page*100)-99; i <= page * 100; i++){
            newContent.push(i)
            setPageContent(newContent)
        }
    }

    useEffect(() => {
        setTotalAmount(selectedNumbers.length == 0 ? 0 : (dolarPrice * selectedNumbers.length * ticketPrice))
        updatePageContent()
    }, [page, selectedNumbers])

    async function handleSubmit(e: Event){
        e.preventDefault();
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("raffleId", raffleId.toString())
        const fileInput = document.getElementById("fileInput") as HTMLInputElement
        formData.append("receiptFile", fileInput!.files[0])
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("numbers", selectedNumbers.toString())

        const res = await fetch(`${apiUrl}/api/buySelectedTickets`, {
            method: "post",
            body: formData,
        })
        setLoading(false)

        const ticketInfo = await res.json()
        console.log(ticketInfo)

        if(res.status == 201){
            globalThis.location.replace(`/SuccessfulPucharse/${ticketInfo.id}`)
        }
    }

    return(
        <div class="TicketsSelector">
            <h2>Compra tus numeros aqui!</h2>
            <button type="button" onClick={changeMethod}>Numeros al azar</button>
            <h2>Monto total: {totalAmount.toFixed(2)} Bs</h2>
            <h3>Seleccionados: {selectedNumbers.map(n => `${n}, `)}</h3>
            <div class="numbersContainer">
                {pageContent.map(item => {
                    if(!(item <= ticketsLimit)){
                        return 
                    }else if (selectedNumbers.includes(item)){
                        return <button key={item} type="button" class="selected" onClick={() => setSelectedNumbers(selectedNumbers.filter(s => s!=item))}>{item}</button>
                    }else if(soldNumbers.includes(item)){
                        return <button key={item} type="button" class="sold">{item}</button>
                    }else{
                        return <button key={item} type="button" onClick={() => setSelectedNumbers([...selectedNumbers, item])}>{item}</button>
                    }
                })}
            </div>

            <div class="pagination">
                <button type="button" onClick={() => setPage(page-1)} disabled={page <= 1}>anterior</button>
                {`${(page*100)-99} - ${page*100}`}
                <button type="button" onClick={() => setPage(page+1)} disabled={(page * 100) >= ticketsLimit}>siguiente</button>
            </div>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre:" required disabled={loading}/>
                <input name="identification" placeholder="Cedula:" required disabled={loading}/>
                <input name="phone" placeholder="Telefono:" required disabled={loading} type="phone"/>
                <input name="email" placeholder="Correo: " required disabled={loading} type="email"/>
                <label style={{alignSelf: 'start', marginLeft: '15px'}}>Comprobante de pago:</label>
                <input name="receipts" type="file" accept="image/*, .pdf" id="fileInput" required disabled={loading}/>
                { selectedNumbers.length >= minBuy ? (
                    <button type="submit" disabled={loading}>{loading ? "Cargando":"Comprar"}</button>
                ):(
                    <h4>Debe seleccionar al menos {minBuy} numeros para comprar.</h4>
                )  }
            </form>
        </div>
    )
}