/* Librairy import */
import React, {useState} from "react";
import { Link } from "react-router-dom"

/* css import */
import '../css/NavBar.scss';

/* components import */
import Disconnection from "../components/connection/Disconnection";

function NavBar({ admin, connecte, setConnecte }) {

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
                {admin ?
                    <>
                        <div id="divider"></div>
                        <ul>
                            <li><Link to={"info7/AdminViewObjects"}>OBJETS</Link></li>
                            <li><Link to={"info7/AdminViewUsers"}>UTILISATEURS</Link></li>
                        </ul>
                    </>
                    : null}

            </nav>

        </div>
    )
}

export default NavBar;