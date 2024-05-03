/* Library imports */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* components imports */
import Button from '../Button'
import PopUpUser from "./PopUpUser"
import FormInscription from "../connection/Inscription"

/* css imports */
import '../../css/cssViewsAdmin/ViewUsers.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'



function ViewUsers() {
    const [showPopUp, setShowPopUp] = useState(false)
    const [showAddUserForm, setShowAddUserForm] = useState(false)
    const [users, setUsers] = useState(null)
    const [idUserClicked, setIdUserClicked] = useState(null)

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

    function changeVisiblityForm(){
        return setShowAddUserForm(!showAddUserForm)
    }

    function List(){
        let list_users = null
        if(users != null){
            list_users = users.map(user =>
                <tr>
                    <td id={user.nom}>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.login}</td>
                    <td>{user.mail}</td>
                    <td><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>
                </tr>
            );

        }
        return list_users
    }

    return (
        <div className="ViewUsers">
            <table className={"adminTable"}>
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
            {showAddUserForm && <FormInscription/>}
            <Button id={"btnAddUser"} onSmash={changeVisiblityForm} text={"+"} bgColor={"#2882ff"}/>
            {<List/> == null ? <i>Aucun utilisateurs</i> : null}
            {showPopUp?
                <>
                    <div onClick={hidePopUp} className="foreground"></div>
                    <PopUpUser id={idUserClicked} setShowPopUp={setShowPopUp}/>
                </>
                 : null}
        </div>

    )
}

export default ViewUsers;