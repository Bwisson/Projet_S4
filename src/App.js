/* Librairy import */
import React, { useState } from "react";
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

async function isConnect(){
    let connecte= true
    // axios.get("./php/connection/isConnect.php")
    //     .then(response =>
    //         connecte = response.data)

    return connecte
}

function App() {
    let isConnecte = isConnect()
    const [connecte, setConnecte] = useState(false)

  return (
    <div className="App">
        { !connecte ?
            <Connection connecte={connecte} setConnecte={setConnecte}/>
            :
            <div className={"pageContent"}>
                <NavBar connecte={connecte} setConnecte={setConnecte}/>
                <Routes>
                    <Route path="/AdminViewUsers" element={<ViewUsers />}/>
                    <Route path="/AdminViewObjects" element={<ViewObjects />}/>
                </Routes>


            </div>
        }
    </div>
  );
}


export default App;
