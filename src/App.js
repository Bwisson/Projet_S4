/* Librairy import */
import React, { useState } from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";
// import Inscription from "./components/connection/Inscription";
import NavBar from "./components/NavBar";
import ViewUsers from "./components/viewsAdmin/ViewUsers";

async function isConnect(){
    let connecte= true
    // axios.get("./php/connection/isConnect.php")
    //     .then(response =>
    //         connecte = response.data)

    return connecte
}

function App() {
    let isConnecte = isConnect()

    const [connecte, setConnecte] = useState(true) /* todo : passer à false quand upload sur le serv */
    console.log(connecte)

  return (
    <div className="App">
        { !connecte ?
            <Connection connecte={connecte} setConnecte={setConnecte}/>
            :
            <div className={"pageContent"}>
                <NavBar connecte={connecte} setConnecte={setConnecte}/>
                <ViewUsers />
            </div>
        }
    </div>
  );
}


export default App;
