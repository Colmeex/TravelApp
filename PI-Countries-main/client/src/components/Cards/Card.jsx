import React from "react";
import {Link} from "react-router-dom"
import style from "./Card.module.css"

export default function Card({flagImg, name, continent, id}) {
    return (
        <div  >
            <Link to={`/countries/${id}`}>
            <div className={style.containerCard}>
                <div><img className={style.sizeImg} src={flagImg} alt="Imagen no encontrada" /> </div>
                    <h3 className={style.titulo}>{name}</h3>
                        <h5 className={style.subTitulo}>{continent}</h5>
            
                {/* <Link to={`/countries/${id}`}> <button className={style.btnCard}>Ver Más</button></Link> */}
            </div>  
            </Link>       
        </div>
    );
}