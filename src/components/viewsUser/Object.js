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

    return(
        <div className="Object">
            <div className={"leftSide"}>
                <Link to={"../info7/ListObjects/" + objectType}><p className={"flèche"}>←</p></Link>
                <div className={"title"}> 
                <img className={"imgCard"} ref={objectImageRef} alt=""/>
                <h2>{objectName}</h2></div>
                <div className={"article"}>
                    <p>
                        {objectType}
                    </p>
                    <CodeBarre />
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
