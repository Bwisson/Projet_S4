/* Librairy import */
import React from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connexion from "./components/Connexion";

function getListUser(){
    axios.get('./php/list/listAllUsers.php')
        .then(response => console.log(response.data))
}

function App() {
  return (
    <div className="App">
        <Connexion></Connexion>
    </div>
  );
}

export default App;
