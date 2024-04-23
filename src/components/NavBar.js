/* Librairy import */
import React, {useState} from "react";
import { Link } from "react-router-dom"

/* css import */
import '../css/NavBar.scss';

/* components import */
import Button from "./Button"
import Disconnection from "./connection/Disconnection";

function NavBar({ admin, setDeconnection }) {
    const [profilMenuVisible, setProfilMenuVisible] = useState(false)

    function showProfilMenu(){
        setProfilMenuVisible(!profilMenuVisible)
    }

    return (
        <div className="NavBar">
            <div className="contentNav">

                <nav>
                    <div id="btnAndMenu">
                        <Button id={"btnProfil"} text={"Profil"} onSmash={showProfilMenu} bgColor={"#2882ff"}></Button>
                        {profilMenuVisible &&
                            <div className={"profilMenu"}>
                                <Link to={"info7/"}>Mon compte</Link>
                                <Disconnection setDeconnection={setDeconnection}/>
                            </div>
                        }
                    </div>

                    <ul>
                        <li><Link to={"info7/ListObjects/Chevalets"}>CHEVALETS</Link></li>
                        <li><Link to={"info7/ListObjects/Peinture"}>PEINTURE</Link></li>
                        <li><Link to={"info7/ListObjects/Modeles"}>MODÈLES</Link></li>
                        <li><Link to={"info7/ListObjects/Ateliers"}>ATELIERS</Link></li>
                        <li><Link to={"info7/Object"}>Objet</Link></li>
                    </ul>
                    {admin ?
                        <>
                            <div id="divider"></div>
                            <ul id={"adminLink"}>
                                <li><Link to={"info7/AdminViewObjects"}>OBJETS</Link></li>
                                {/* TODO : rajouter info7/ avant de push */}
                                <li><Link to={"info7/AdminViewUsers"}>UTILISATEURS</Link></li>
                            </ul>
                        </>
                        : null}
                    <li><Link to={"info7/Calendar"}>Calendrier</Link></li>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;