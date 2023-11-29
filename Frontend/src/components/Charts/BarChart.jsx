import { Bar } from "react-chartjs-2"
import { useState } from "react";

export default function BarChart({ data }){
    let options = {
        legend: {
            display: false
        }
      };
    
    return(
        <>
            <Bar data={data} options={options}/>
        </>
    )
}