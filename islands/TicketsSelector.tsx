import { useEffect, useState } from "preact/hooks";

interface IticketsSelector{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void,
    soldNumbers: number[],
    ticketsLimit: number
}

export default function TicketsSelector({ticketPrice = 1, raffleId, dolarPrice, changeMethod, soldNumbers, ticketsLimit}: IticketsSelector){
    
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
        updatePageContent()
    }, [page, selectedNumbers])

    return(
        <div class="TicketsSelector">
            <h2>Compra tus numeros aqui!</h2>
            <button onClick={changeMethod}>Numeros al azar</button>
            <h3>Seleccionados: {selectedNumbers.map(n => `${n}, `)}</h3>
            <div class="numbersContainer">
                {pageContent.map(item => {
                    if(!(item <= ticketsLimit)){
                        return 
                    }else if (selectedNumbers.includes(item)){
                        return <button class="selected" onClick={() => setSelectedNumbers(selectedNumbers.filter(s => s!=item))}>{item}</button>
                    }else if(soldNumbers.includes(item)){
                        return <button class="sold">{item}</button>
                    }else{
                        return <button onClick={() => setSelectedNumbers([...selectedNumbers, item])}>{item}</button>
                    }
                })}
            </div>

            <div class="pagination">
                <button onClick={() => setPage(page-1)} disabled={page <= 1}>anterior</button>
                {`${(page*100)-99} - ${page*100}`}
                <button onClick={() => setPage(page+1)} disabled={(page * 100) >= ticketsLimit}>siguiente</button>
            </div>
        </div>
    )
}