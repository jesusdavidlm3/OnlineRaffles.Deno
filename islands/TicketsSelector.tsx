interface IticketsSelector{
    ticketPrice: number,
    raffleId: string,
    dolarPrice: number,
    changeMethod: () => void
}

export default function TicketsSelector({ticketPrice = 1, raffleId, dolarPrice, changeMethod}: IticketsSelector){
    return(
        <div class="TicketsSelector">
            <h2>Compra tus numeros aqui!</h2>
            <button onClick={changeMethod}>Numeros al azar</button>
            <h3>Numeros disponibles</h3>
        </div>
    )
}