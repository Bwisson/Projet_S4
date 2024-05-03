/* Librairy imports */
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios'

/* css imports */
import '../../css/cssViewUser/Object.scss'

/* components imports */
import Button from '../Button'
import {formatDate} from "@fullcalendar/core";

function Object(){
    const urlParams = useParams()
    const id = urlParams.id
    const objectType = urlParams.reservableObject
    const [objectName, setObjectName] = useState("")

    useEffect(() => {
        function getObjectInfo() {
            let dataObject = new FormData()
            dataObject.append("id", id)
            dataObject.append("type", objectType)
            axios.post("./../../php/select/selectObject.php", dataObject)
                .then(response => {
                    let data = response.data[0]
                    setObjectName(data.nom)
                })
        }
        getObjectInfo()
    }, []);
    console.log(objectName)
    return(
        <div className="Object">
            <div className={"leftSide"}>
                <div className="imgCard"></div>
                <h2>{objectName}</h2>
                <article>
                    <p>
                        {objectType}
                    </p>
                </article>
            </div>

            <div className={"rightSide"}>
                <div className={"calendar"}></div>
                <Button text={"Réserver"}></Button>
            </div>
        </div>
    )
}

export default Object