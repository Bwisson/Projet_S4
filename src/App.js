/* Librairy import */
import React from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Button from './components/Button';

function getListUser(){
    axios.get('./php/list/listAllUsers.php')
        .then(response => console.log(response.data))
}

function App() {
  return (
    <div className="App">
        {getListUser()}
        <Button text={"stylé ça mère"}></Button>
    </div>
  );
}

export default App;
