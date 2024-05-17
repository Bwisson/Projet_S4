/* Librairy imports */
import {useParams, Link} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import axios from 'axios';
import JsBarcode from 'jsbarcode';


/* css imports */
import '../../css/cssViewUser/Object.scss';

/* components imports */
import Button from '../Button';
import {formatDate} from "@fullcalendar/core";
import Calendar from "../calendar/Calendar";

function Object(){
    const urlParams = useParams();
    const id = urlParams.id;
    const objectType = urlParams.reservableObject;

    const [objectInfo, setObjectInfo] = useState(null);
    const [objectName, setObjectName] = useState("");
    const objectImageRef = useRef(null);

    useEffect(() => {
        function getObjectInfo() {
            let dataObject = new FormData();
            dataObject.append("id", id);
            dataObject.append("type", objectType);

            axios.post("./../../php/select/selectObject.php", dataObject)
                .then(response => {
                    let data = response.data[0];
                    setObjectInfo(data);
                    setObjectName(data.nom);
                    objectImageRef.current.src = `../../assets/images/objects/${data.image}`;
                });
        }
        getObjectInfo();
    }, []);


    function CodeBarre() {
        useEffect(() => {
            if (objectInfo) {
                JsBarcode(".barcode").init();
            }
        }, [objectInfo]);

        return (
            <div className={"code_barre"}>
                <svg className="barcode"
                     jsbarcode-value={objectInfo ? objectInfo.code_barre : ""}
                     jsbarcode-textmargin="0"
                     jsbarcode-fontoptions="bold"></svg>
            </div>
        );
    }

    function InfosObjet(){
        let res = <i>Aucnes données disponible</i>
        if (objectInfo != null){
            if (objectType === "Chevalets" || objectType === "Peinture"){
                res =
                    <>

                        <h2>{objectName}</h2>
                        <p>Catégorie : {objectInfo.categorie}</p>
                        <p>Couleur : {objectInfo.couleur}</p>
                        <p>Taille : {objectInfo.taille}</p>
                        <CodeBarre/>
                    </>
            } else if (objectType === "Ateliers"){
                res =
                    <>
                        <h2>{objectName}</h2>
                        <p>Type : {objectInfo.type}</p>
                    </>
            } else if (objectType === "Modeles"){
                res =
                    <>
                        <h2>{objectName} {objectInfo.prenom}</h2>
                        <p>Genre : {objectInfo.genre}</p>
                        <p>Âge : {objectInfo.age}</p>
                        <p>Tarif horaire : {objectInfo.tarif_horaire}€/h</p>
                    </>
            }
        }
        return res
    }

    return(
        <div className="Object">
            <Link to={"../info7/ListObjects/" + objectType}><p className={"flèche"}>←</p></Link>

            <div className={"leftSide"}>
                <div className={"divImg"}>
                    <img className={"imgCard"} ref={objectImageRef} alt=""/>
                </div>

                <div className={"article"}>
                    <InfosObjet />
                </div>
            </div>

            <div className={"rightSide"}>
                <div className={"calendar"}>
                    <Calendar objectInfo={objectInfo} objectType={objectType}/>
                </div>
            </div>
        </div>
    );
}

export default Object;
