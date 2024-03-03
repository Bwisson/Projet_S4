/* css import */
import '../css/NavBar.scss';

/* components import */
import Disconnection from "../components/connection/Disconnection";
import React from "react";

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
                            <li>UTILISATEURS</li>
                        </ul>
                    </>
                    :
                    null}

            </nav>

        </div>
    )
}

export default NavBar;