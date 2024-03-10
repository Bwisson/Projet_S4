/* Librairy import */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* css imports */
import '../../css/cssViewsAdmin/ViewUsers.scss'

/* components imports */
import Button from '../Button'
import PopUpUser from "./PopUpUser"

function ViewUsers() {
    const [showPopUp, setShowPopUp] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        function getUsers() {
            axios.get("./php/list/listAllUsers.php")
                .then(response => {
                    let datas = response.data
                    setUsers(datas)
                })
        }
        getUsers()
    }, []);

    function showingPopUp(){
        return setShowPopUp(true)
    }
    function hidePopUp(){
        return setShowPopUp(false)
    }

    function List(){
        let list_users = null
        if(users != null){
            list_users = users.map(user =>
                <tr>
                    <td id={"userLastName"}>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.login}</td>
                    <td>{user.mail}</td>
                    <td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>
                </tr>
            );

        }

        return list_users
    }

    return (
        <div className="ViewUsers">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Login</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Réservations</th>
                    </tr>
                </thead>
                <tbody>
                {<List/> != null ? <List/> : null}
                </tbody>
            </table>
            {<List/> == null ? <i>Aucun utilisateurs</i> : null}
            {showPopUp?
                <>
                    <div onClick={hidePopUp} className="foreground"></div>
                    <PopUpUser showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>
                </>
                 : null}
        </div>

    )
}

export default ViewUsers;