/* Librairy import */
import React from "react";
import { Link } from "react-router-dom"

/* css import */
import '../css/NavBar.scss';

/* components import */
import Disconnection from "../components/connection/Disconnection";

function NavBar(connecte, setConnecte) {
    let isAdmin = true /* todo : mettre à false pr la mise en prod */
    return (
        <div className="NavBar">
            <nav>
                <Disconnection connecte={connecte} setConnecte={setConnecte}/>
                <ul>
                    <li>CHEVALETS</li>
                    <li>PEINTURE</li>
                    <li>MODÈLES</li>
                    <li>ATELIERS</li>
                </ul>
                {isAdmin ?
                    <>
                        <div id="divider"></div>
                        <ul>
                            <li>OBJETS</li>
                            <li><Link to={"/AdminViewUsers"}>UTILISATEURS</Link></li>
                        </ul>
                    </>
                    :
                    null}

            </nav>

        </div>
    )
}

export default NavBar;