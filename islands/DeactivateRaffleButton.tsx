interface IDeactivateRaffleButton{
    raffleId: string,
    apiUrl: string
}

export default function DeactivateRaffleButton({raffleId, apiUrl}: IDeactivateRaffleButton){
    
    const deactivateRaffle = async() => {
        const res = await fetch(`${apiUrl}/api/deactivateRaffle`, {
            method: "post",
            body: JSON.stringify({raffleId: raffleId})
        })
        if(res.status == 200){
            globalThis.location.replace("/Dashboard/1")
        }
    }

    return(
        <button onClick={deactivateRaffle}>Cerrar venta</button>
    )
}