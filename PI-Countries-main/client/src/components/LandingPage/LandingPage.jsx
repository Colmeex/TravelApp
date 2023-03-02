import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"
import Tierra from "../Multimedia/Video/RotacionTierra.mp4"
// import { useRef,useEffect } from "react";


export default function LandingPage() {
  // const ref = useRef()
  // useEffect(() => { ref.current.play(); },[]);
  return (
    <div className={style.imgBody} src={Tierra}>
      {/* <video ref={ref} className={style.video} src={Tierra} playsinline autoplay={true} muted loop type="video/mp4" /> */}
        
    {/* <div className={style.header}> */}
      <h1 className={style.title}>Proyecto Individual</h1>
      <h2 className={style.subTitle}>Tema: Countries</h2>
      <Link to="/home">
        <button className={style.btn}>Acceder</button>
      </Link>
    {/* </div> */}
    </div>
  );
}
