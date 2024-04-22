/* Librairy imports */
import React, { useState, useEffect } from "react"

/* components imports */
import Button from '../Button'

/* css imports */
import '../../css/cssViewUser/CardReservable.scss'

function CardReservable({title, URLimage}){

    return(
        <div className={"CardReservable"}>
            <div className={"img"}></div>
            <div className="cardTitle">
                <h4>{title}</h4>
            </div>
            <Button bgColor={"#C4A6FF"} text={"Réserver"}/>

        </div>
    )
}

export default CardReservable