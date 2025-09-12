interface ISoldBar{
    sold: number,
    total: number
}

export default function SoldBar({sold, total}: ISoldBar){
    return(
        <div class="SoldBar">
            <h4>{sold.length} numeros vendidos</h4>
            <div style={{width: `${total/sold.length}%`}} class="SoldArea"/>
        </div>
    )
}