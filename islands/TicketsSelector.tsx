import { useEffect, useState } from "preact/hooks";

interface IticketsSelector{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void,
    soldNumbers: number[],
    ticketsLimit: number,
    minBuy: number,
    apiUrl: string,
    currency: string,
    sellmethod: string
}

export default function TicketsSelector({ticketPrice = 1, raffleId, dolarPrice, changeMethod, soldNumbers = [], ticketsLimit, minBuy = 1, apiUrl, currency, sellmethod}: IticketsSelector){

    // Logica de UI
    const [loading, setLoading] = useState<boolean>(false)
    const [totalAmountBs, setTotalAmountBs] = useState<number>(0)
    const [totalAmountD, setTotalAmountD] = useState<number>(0)

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
        if(currency === "Bolivares"){
            setTotalAmountBs(selectedNumbers.length == 0 ? 0 : (selectedNumbers.length * ticketPrice))
        }else{
            setTotalAmountD(selectedNumbers.length == 0 ? 0 : (selectedNumbers.length * ticketPrice))
            setTotalAmountBs(selectedNumbers.length == 0 ? 0 : (dolarPrice * selectedNumbers.length * ticketPrice))
        }
        updatePageContent()
    }, [page, selectedNumbers])

    async function handleSubmit(e: Event){
        e.preventDefault();
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const receiptInput = document.getElementById("receipt") as HTMLInputElement
        const currencySelect = document.getElementById("currencySelect")?.value
        formData.append("dolarPrice", dolarPrice.toString())
        formData.append("raffleId", raffleId.toString())
        formData.append("receipt", receiptInput.files[0])
        formData.append("numbers", selectedNumbers.toString())

        if(currency === "Bolivares"){
            formData.append("currency", "Bolivares")
        }else if(currency === "Dolares"){
            formData.append("currency", "Dolares")
        }else{
            formData.append("currency", currencySelect)
        }

        const res = await fetch(`${apiUrl}/api/buySelectedTickets`, {
            method: "post",
            body: formData,
        })
        setLoading(false)

        const ticketInfo = await res.json()
        // console.log(ticketInfo)

        if(res.status == 201){
            globalThis.location.replace(`/SuccessfulPucharse/${ticketInfo.id}`)
        }
    }

    return(
        <div class="TicketsSelector">
            <h2>Compra tus numeros aqui!</h2>
            {sellmethod === "dual" && <button type="button" onClick={changeMethod}>Numeros al azar</button>} 
            <div className="totalAmountContainer">
                {(currency === "Bolivares" || currency == "Dolares y Bolivares") && 
                    <h2>Monto total: Bs. {totalAmountBs.toFixed(2)}</h2>            
                }
                {(currency === "Dolares y Bolivares") && 
                    <h3>Monto total: ${totalAmountD}</h3>                
                }
                {(currency === "Dolares") && 
                    <h2>Monto total: ${totalAmountD}</h2>                
                }
            </div>
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
                { ticketsLimit <= 100 ? (<>
                    {`${(page*100)-99} - ${page*100}`}
                </>) : (<>
                    <button type="button" onClick={() => setPage(page-1)} disabled={page <= 1}>{page == 1 ? 0 : `${((page-1)*100)-99} - ${(page-1)*100}`}</button>
                    {`${(page*100)-99} - ${page*100}`}
                    <button type="button" onClick={() => setPage(page+1)} disabled={(page * 100) >= ticketsLimit}>{`${((page+1)*100)-99} - ${(page+1)*100}`}</button>
                </>) }
            </div>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre:" required disabled={loading}/>
                <input name="identification" placeholder="Cedula:" required disabled={loading} type="number" min="1" max="200000000"/>
                <input name="phone" placeholder="Telefono:" required disabled={loading} type="number"/>
                <input name="email" placeholder="Correo: " required disabled={loading} type="email"/>
                <input name="reference" placeholder="Referencia de pago: " required disabled={loading} type="number"/>
                {currency === "Dolares y Bolivares" && 
                    <select id="currencySelect" required placeholder="Metodo de pago">
                        <option value="Bolivares">Bolivares</option>
                        <option value="Dolares">Dolares</option>
                    </select>
                }
                <label style={{alignSelf: 'start', marginLeft: '15px'}}>Comprobante de pago:</label>
                <input name="receipt" type="file" accept="image/*" id="receipt" required disabled={loading}/>
                { selectedNumbers.length >= minBuy ? (
                    <button type="submit" disabled={loading}>{loading ? "Cargando":"Comprar"}</button>
                ):(
                    <h4>Debe seleccionar al menos {minBuy} numeros para comprar.</h4>
                )  }
            </form>
        </div>
    )
}