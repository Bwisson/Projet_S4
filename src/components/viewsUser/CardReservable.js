/* Librairy import */
import { Link } from "react-router-dom"

/* components imports */
import Button from '../Button'

/* css imports */
import '../../css/cssViewUser/CardReservable.scss'

function CardReservable({id, type, title, URLimage}){
    const url = "info7/Object/" + type + "/" + id

    return(
        <div className={"CardReservable"}>
            <div className={"img"}></div>
            <div className="cardTitle">
                <h4>{title}</h4>
            </div>
            <Link to={url}></Link><Button bgColor={"#C4A6FF"} text={"Réserver"}/>

        </div>
    )
}

export default CardReservable