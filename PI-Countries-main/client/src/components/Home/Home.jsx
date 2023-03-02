import React, { useState } from "react";
import {  useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries,filterByContinents, filterByActivities, orderByName, orderByPopulation, getActivities, } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Cards/Card"; 
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css"

export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.allActivities)

    const[orden, setOrden]=useState("")

    //Empieza en uno porque siempre arranco en l aprimera pagina
    const[currentPage, setCurrentPage] = useState(1)
    //Cantidad de personajes que quiero cmostrar por pagina
    const [countryPerPage, setCountryPerPage] = useState(10)

    //
    const indexOfLastCountry = currentPage * countryPerPage  //-----------> 10
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage  // ------------> 0
    //
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getCountries())

    }
    //Filtra Por continente
    function handleFilterContinent(e){
        e.preventDefault()
        dispatch(filterByContinents(e.target.value))
    }
    //Filtra por actividad
    function handleFilterByActivities(e){
        e.preventDefault()
        e.target.value === "none" ? dispatch(getCountries()):
        dispatch(filterByActivities(e.target.value))
        setCurrentPage(1)
    }
    
    //Filtrar por nombre alfabetico
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    //Filtra por population
    function handleSortPopulation(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    
    console.log({activities})
    return (
        <div className={style.fondo}>
            <h1>Countries</h1>
            <br></br>
            {/* <button className={style.btn} onClick={e=> {handleClick(e)}}>
                refrescar paises
            </button> */}
            {/* <Link to = "/activities"> 
            <button
            className={style.btn}>
            crear actividades
            </button>
            </Link> */}
            <div className={style.secciones}>
                {/* <section > */}
                    {/* <label className={style.nombre}>Orden Alfabetico</label> */}
                    <select className={style.input} onChange={e  => handleSort(e)}>
                        <option >Alfabetico</option>
                        <option  value="asc">Ascendente</option>
                        <option  value="desc" >Descendente</option>
                    </select>
                <select className={style.input} onChange={ e => handleFilterContinent(e)}>
                    <option value={"All"}>Continente</option>
                    <option value={"South America"}>Sudamérica</option>
                    <option value={"North America"}>Norteamérica</option>
                    <option value={"Africa"}>África</option>
                    <option value={"Asia"}>Asia</option>
                    <option value={"Europe"}>Europa</option>
                    <option value={"Oceania"}>Oceanía</option>
                    <option value={"Antarctica"}>Antárctica</option>
                </select>
                <select className={style.input} onChange={e  => handleSortPopulation(e)}>
                    <option>Poblacion</option>
                    <option value="popDesc">Mayor Poblacion</option>
                    <option value="popAsc">Menor Poblacion</option>
                    
                </select>
                <select className={style.input} onChange={e => handleFilterByActivities(e)}>
                <option value="none">Activdades</option>
                {activities.map(e => (
                <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
               
            </div>
            
            <div className={style.botones}>
            <button className={style.btn} onClick={e=> {handleClick(e)}}>
                Todos los paises
            </button>
            <Link to = "/activities"> 
            <button
            className={style.btn}>
            Crea tu avididad
            </button>
            </Link>
            
                <SearchBar />
                

            </div>
                <div className={style.cards}>
                {currentCountry.length?currentCountry.map( (el) =>{
                    return(
                        <fragment>
                            <Link to={"/home/" + el.id}>
                            <Card id={el.id} name={el.name} continent={el.continent} flagImg={el.flagImg ? el.flagImg : el.flagImg}/>
                            </Link>
                        </fragment>
                       
                        ) 
                    }):<h1>No hay coincidencias =( </h1>
                }
                </div>

            <div className={style.footer}>
                    
            <div className={style.paginado}>
                    <Paginado
                    countryPerPage={countryPerPage}
                    allCountries={allCountries.length}
                    paginado = {paginado}
                    />
            </div>
            </div>
        </div>
    )
}