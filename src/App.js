import './css/App.scss';
import Button from './components/Button';
import React from "react";
import axios from 'axios';

function getListUser(){
    axios.get('./php/show/showAllUsers.php')
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
