/* Librairy import */
import { Link } from "react-router-dom"

/* components imports */
import Button from '../Button'

/* css imports */
import '../../css/cssViewUser/CardReservable.scss'

function CardReservable({id, type, title, URLimage}){

    return(
        <div className={"CardReservable"}>
            <div className={"img"}></div>
            <div className="cardTitle">
                <h4>{title}</h4>
            </div>
            <Link to={id}><Button bgColor={"#C4A6FF"} text={"Réserver"}/></Link>

        </div>
    )
}

export default CardReservable