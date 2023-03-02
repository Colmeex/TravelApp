import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({countryPerPage, allCountries, paginado} ){
    const pageNumber = []

    for (let i = 1; i<= Math.ceil(allCountries/countryPerPage);i++){
        pageNumber.push(i )
    }
    return(
        <nav>
            <ul className={style.paginado2}>
                {pageNumber && pageNumber.map (number =>(
                    <li  key={number}>
                   <button className={style.btnPaginado} onClick={() => paginado(number)}>{number}</button> 
                   </li>
                ))}
            </ul>
        </nav>
    )
}