interface ISoldBar{
    sold: number,
    total: number
}

export default function SoldBar({sold, total}: ISoldBar){

    const percentage = sold != null ? Number((sold.length / total) * 100).toFixed(2) : 0

    return(
        <div class="SoldBar">
            <h4>{percentage}% de los numeros vendidos</h4>
            <div style={{width: `${percentage}%`}} class="SoldArea"/>
        </div>
    )
}