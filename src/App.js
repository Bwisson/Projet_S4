/* Librairy import */
import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";
// import Inscription from "./components/connection/Inscription";
import NavBar from "./components/NavBar";
import ViewUsers from "./components/viewsAdmin/ViewUsers";
import ViewObjects from "./components/viewsAdmin/ViewObjects"
import Calendar from "./components/calendar/Calendar"

function App() {
    const [admin, setAdmin] = useState(false)
    const [isConnect, setIsConnect] = useState(false)
    const [deconnection, setDeconnection] = useState(true)

    useEffect(() => { // Permet de garder la connexion activer lors d'un rechargement de la page
        axios.get("./php/connection/isConnect.php")
            .then(response => {
                setIsConnect(response.data)
            })

        axios.get("./php/connection/isAdmin.php")
            .then(response => {
                setAdmin(response.data)
            })
    }, []);

    console.log("isConnect : ", isConnect, "; admin : ", admin)

    return (
        <div className="App">
            { !isConnect ?
                <Connection setAdmin={setAdmin} setIsConnect={setIsConnect}/>
                :
                <div className={"pageContent"}>
                    <NavBar admin={admin} setDeconnection={setIsConnect}/>
                    <Routes>
                        <Route path="info7/AdminViewUsers" element={<ViewUsers />}/>  TODO : changer avant de push
                        {/*<Route path="/AdminViewUsers" element={<ViewUsers />}/>*/}
                        <Route path="info7/AdminViewObjects" element={<ViewObjects />}/>
                        {/*<Route path="/AdminViewObjects" element={<ViewObjects />}/>*/}
                        <Route path="info7/Calendar" element={<Calendar />}/>
                        {/*<Route path="/Calendar" element={<Calendar />}/>*/}
                    </Routes>
                </div>
            }
        </div>
    );
}

export default App;
