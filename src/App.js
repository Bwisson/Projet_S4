/* Librairy import */
import React, { useState } from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";
import Inscription from "./components/connection/Inscription";
import Disconnection from "./components/connection/Disconnection";

async function isConnect(){
    let connecte = false
    axios.get("./php/connection/isConnect.php")
        .then(response =>
            connecte = response.data)

    return connecte
}

function App() {
    let isConnecte = isConnect()

    const [connecte, setConnecte] = useState(false)
    console.log(connecte)

  return (
    <div className="App">
        { !connecte ?
            <Connection connecte={connecte} setConnecte={setConnecte}/>
            :
            <Disconnection connecte={connecte} setConnecte={setConnecte}/>
        }
    </div>
  );
}


export default App;
