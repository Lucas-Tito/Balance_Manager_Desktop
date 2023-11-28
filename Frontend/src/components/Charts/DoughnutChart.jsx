import { Doughnut } from "react-chartjs-2"
import { useState } from "react";

export default function DoughnutChart({ data }){
    
    return(
        <>
            <Doughnut data={data}/>
        </>
    )
}