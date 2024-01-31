/* Librairy import */
import React from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";
import Inscription from "./components/connection/Inscription";
import Disconnection from "./components/connection/Disconnection";

function App() {
    async function isConnect(){
        let isConnect = false
        axios.get("./php/connection/isConnect.php")
            .then(response =>
                isConnect = response.data)

        return isConnect
    }
    let connecte = isConnect()
    console.log(connecte)
  return (
    <div className="App">
        <Connection />
        <Disconnection connecte={connecte}/>
    </div>
  );
}


export default App;
