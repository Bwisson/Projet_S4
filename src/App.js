/* Librairy import */
import React from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";
import Inscription from "./components/connection/Inscription";

function App() {
  return (
    <div className="App">
        <Connection></Connection>
        <Inscription></Inscription>
    </div>
  );
}

export default App;
