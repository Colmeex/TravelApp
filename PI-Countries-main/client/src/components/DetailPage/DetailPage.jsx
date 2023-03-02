import React  from "react";
import { useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getCountriesDetail } from "../../actions";
import style from "./DetailPage.module.css"

export default function DetailPage(props){
    console.log(props)
    const dispatch = useDispatch()
useEffect(()=> {
    dispatch(getCountriesDetail(props.match.params.id))
},[dispatch])

const myCountry = useSelector((state) => state.detail)

return(
    <div className={style.fondo}>
            <h1>Pais y Actividades</h1>
        <div >
                <div>
        {
           myCountry ?
           <div className={style.card}>
               <img className={style.imgDetail} src={myCountry.flagImg} alt="Imagen no disponible" />
               
                    <h4 className={style.continente} >{myCountry.continent}</h4>
                    <h2 className={style.nombre}>{myCountry.name}</h2>
                    <h3 className={style.id}>{myCountry.id}</h3>
                    <h4 className={style.titulo} >Capital: <h5>{myCountry.capital}</h5></h4>
                    <h4 className={style.titulo} >Región: <h5>{myCountry.subregion}</h5></h4>
                    <h4 className={style.titulo} >Población: <h5>{myCountry.population} habitantes</h5></h4>
                    <h4 className={style.titulo} >Área: <h5>{myCountry.area} km²</h5></h4>
               
           </div> : <p>Loading ...</p>
        }
    
    
        <div className={style.card2}>
            <h3 className={style.nombre}>Actividades del País</h3>
            {
                myCountry.Activities&&myCountry.Activities.length ? 
            myCountry.Activities.map(el => {
                return (
                        <div>
                            <h4 className={style.titulo}>{el.name}</h4>
                            <h4 className={style.titulo}>Dificultad: <h5>{el.difficulty} de 5</h5></h4>
                            <h4 className={style.titulo}>Duración: <h5>{el.duration} horas</h5></h4>
                            <h4 className={style.titulo}>Temporada: <h5>{el.season}</h5></h4>
                        </div>
                        
                    ) 
                 }) 
                 : <p>No existen actividades en este país</p> 
            }
            </div>
            </div>
                <Link to="/activities"><button className={style.btn} >Crear Actividad</button></Link>               
        <Link to="/home" >
        <button className={style.btnVolver}>Volver</button>
        </Link>
       
        </div>
    </div>


)


}