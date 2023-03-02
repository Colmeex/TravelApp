import  { React,useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import { postActivity,getCountries } from "../../actions";
import { useDispatch,useSelector } from "react-redux";
import style from "./CreateActivity.module.css"

function validate(input){
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)
    // let sLetras= new RegExp('^[A-Z]+$', 'i');

    if(!input.name) errors.name = "Recuerda poner un nombre!"
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = "Nombre no puede tener caracteres especiales o tildes"
        
    if(!input.difficulty) errors.difficulty = "Debe elegir una dificultad!"
    else if (dif <= 0 || dif > 5) errors.difficulty = "Debe ser entre 1 y 5"
    
    if(!input.duration) errors.duration = "Escoge un tiempo de duracion!"    
    else if (dur <= 0 || dur > 24) errors.duration = "Debe ser entre 1 y 24"
        
    if(!input.season || input.season === "vacio") errors.season = "Escoge una temporada para tu actividad!"
    
    if(!input.countries || input.countries.length === 0) errors.countries = "Debe escoger al menos un pais!"

    return errors;
}



export default function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]

    })



useEffect(() => {
    dispatch(getCountries())
},[dispatch])

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
     setErrors(validate({
         ...input,
         [e.target.name] : e.target.value
     }))
    console.log(input)
}

const handleSelect = (e) => {
    setInput((estado) => {
        if(e.target.name === "countries") {
            return {
                ...estado,
                countries: [...estado.countries, e.target.value]
            }
        } else {
            return {
                ...estado,
                [e.target.name]: e.target.value
            }
        }
})}

function handleSubmit(e){
    e.preventDefault()
    console.log(input)
    if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
        return alert ('Complete correctamente el formulario antes de enviarlo')
    }

    dispatch(postActivity(input))
    alert("Actividad Creada Exitosamente")
    setInput({
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]
    })
    history.push("/home")
}

function handleDelete(e){
    setInput({
        ...input,
        countries: input.countries.filter( con => con !== e)
    })
}

function handleClick(e){
    e.preventDefault();
    history.push("/home")
    
}



return(
    
    <div className={style.fondo}>
        <div>
        <h1>Crear Actividad</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.seccion}>
                    <label  className={style.nombre} >Nombre: </label>
                    <input className={style.input} type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)} />
                    {errors.name && (<p className="errors">{errors.name}</p>)}
                </div>
            
                <div  >
                   
                    <select className={style.input} name="countries" id="countries" onChange={(e) => handleSelect(e)} >
                            <option>Pais </option>                      
                        {countries.map((con) => (
                            <option value={con.id}>{con.name}</option>
                            ))}
                    </select>
                    {errors.countries && (<p className="errors">{errors.countries}</p>)}
                    <select className={style.input}  name="season" id="season" onChange={(e) => handleSelect(e)} >
                    <option value="vacio"> Temporada</option>
                            <option value={"Verano"}>Verano </option>
                            <option value={"Invierno"}>Invierno </option>
                            <option value={"Primavera"}>Primavera </option>
                            <option value={"Otoño"}>Otoño </option>
                    </select>
                    {errors.countries && (<p className="errors">{errors.season}</p>)}
                </div>

                
                <div className={style.seccion}>
                    <label className={style.nombre} >Dificultad: </label>
                    <input min="1"  max="5" className={style.input} type="number" value= {input.difficulty} name= "difficulty"  onChange={(e)=> handleChange(e)}/>
                    {errors.countries && (<p className="errors">{errors.difficulty}</p>)}
                </div>

                <div className={style.seccion}>
                    <label className={style.nombre} >Duración: </label>
                    <input placeholder="horas" min="1" max="24" className={style.input} type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                    
                    {errors.countries && (<p className="errors">{errors.duration}</p>)}
                </div>
                <div>
                    <button className={style.btn} type="submit" >Añadir Actividad</button>
                </div>
        </form>

        {input.countries.map(e =>
                    <div >
                        <p > {e} </p>
                        <button  onClick={()=> handleDelete(e)}>X </button>
                    </div>    
                    )}
                </div>    
                <div className={style.btnAct}>
                    <Link to = "/home"><button className={style.btnVolver} onClick={(e) => handleClick(e)}>Volver</button></Link>
                </div>
    </div>
    
)
}