/* Library imports */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* components imports */
import Button from '../Button'
import PopupUser from "./PopupUser"
import FormInscription from "../connection/Inscription"

/* css imports */
import '../../css/cssViewsAdmin/ViewUsers.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'



function ViewUsers() {
    const [showPopupResas, setShowPopupResas] = useState(false)
    const [showPopupUser, setShowPopupUser] = useState(false)
    const [showAddUserForm, setShowAddUserForm] = useState(false)

    const [users, setUsers] = useState(null)
    const [idUserClicked, setIdUserClicked] = useState(null)
    const [popupPosition, setPopupPosition] = useState(20)

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

    function showingPopUp(event){
        let idElement = event.target.id
        let scroll = event.view.scrollY
        setIdUserClicked(idElement)
        setPopupPosition(((event.view.screen.height)/2) + scroll)

        setShowPopupResas(true)
    }
    function hidePopUp(){
        setShowPopupResas(false)
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
                    <td><Button id={user.id} onSmash={showingPopUp} text={"Voir"} bgColor={"#2882ff"}/></td>
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
                {<List/> != null && <List/> }
                </tbody>
            </table>
            {showAddUserForm && <FormInscription/>}
            <Button id={"btnAddUser"} onSmash={changeVisiblityForm} text={"+"} bgColor={"#2882ff"}/>
            {<List/> == null && <i>Aucun utilisateurs</i>}
            {showPopupResas &&
                <>
                    <div onClick={hidePopUp} className="foreground"></div>
                    <PopupUser id={idUserClicked} setShowPopUp={setShowPopupResas} positionY={popupPosition}/>
                </>}
        </div>

    )
}

export default ViewUsers;