interface IArchiveRaffleButton{
    raffleId: string,
    apiUrl: string,
    // disabled: boolean
}

export default function ArchiveRaffleButton({raffleId, apiUrl}: IArchiveRaffleButton){
    const archiveRaffle = async() => {
        const res = await fetch(`${apiUrl}/api/archiveRaffle`, {
            method: "post",
            body: JSON.stringify({raffleId: raffleId})
        })
        if(res.status == 200){
            globalThis.location.replace("/Dashboard/1")
        }
    }

    return(
        <button onClick={archiveRaffle}>Archivar rifa</button>
    )
}