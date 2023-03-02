import React from "react"
import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import {getCountriesSearch , countryByName}from "../../actions"
import style from "./SearchBar.module.css"
import lupa from "../Multimedia/lupa.png"



export default function SearchBar({setCurrentPage}){
  const dispatch = useDispatch() 
  const[name,setName] = useState ("") 

//   Obtiene el pais por el nombre
//   function handleInputChange(e){
//     if (e.target && e.target.value) {
//       dispatch(countryByName(e.target.value.toLowerCase()))
//       setCurrentPage(1)
//     }
// }

// function handleSubmit(e){
//     e.preventDefault()
//     dispatch(getCountriesSearch(name))
// }


// return(
//     <div className={style.containerSearch}>
//         <input className={style.input} value={name} type="text" placeholder="Buscar..." onChange = {(e) => {setName(e.target.value); handleInputChange(e)}}></input>
    
//         <button className={style.btnSearch} type="submit" onClick={(e) => handleSubmit(e)}>
//             <img className={style.btnSearch} src={lupa} alt=""/>
            
//             </button>
//     </div>
// )
// }

/************************************************************************* */

// Dispara la búsqueda después de un breve período de tiempo cuando el usuario deja de escribir
useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(getCountriesSearch(name));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [dispatch, name]);

  

  return (
    <div className={style.containerSearch}>
      <input
        className={style.input}
        value={name}
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className={style.btnSearch}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          dispatch(getCountriesSearch(name));
        }}
      >
        <img className={style.btnSearch} src={lupa} alt="" />
      </button>
    </div>
  );
}
