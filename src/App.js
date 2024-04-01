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
    const [connecte, setConnecte] = useState(false)
    const [admin, setAdmin] = useState(false)
    console.log("connecte : ", connecte, "; admin : ", admin)

    return (
        <div className="App">
            { !connecte ?
                <Connection setAdmin={setAdmin} setConnecte={setConnecte}/>
                :
                <div className={"pageContent"}>
                    <NavBar admin={admin} connecte={connecte} setConnecte={setConnecte} />
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
