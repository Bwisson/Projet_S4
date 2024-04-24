

/* css imports */
import '../../css/cssViewUser/Object.scss'

/* components imports */
import Button from '../Button'
import {useParams} from "react-router-dom";

function Object({image, objectName, objectInformations}){
    const urlParams = useParams()
    const type = urlParams.type
    const id = urlParams.id

    return(
        <div className="Object">
            <div className={"leftSide"}>
                <div className="imgCard"></div>
                <h2>{objectName}</h2>
                <article>
                    <p>
                        {objectInformations}
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