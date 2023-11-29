import { Doughnut } from "react-chartjs-2"
import { useState } from "react";

export default function DoughnutChart({ data }){
    let options = {
        legend: {
            display: true
        }
      };
    
    return(
        <>
            <Doughnut data={data} options={options} />
        </>
    )
}