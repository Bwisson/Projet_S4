/* Librairy import */
import React from "react";
import axios from 'axios';

/* CSS import */
import './css/App.scss';

/* Components import */
import Connection from "./components/connection/Connection";

function App() {
  return (
    <div className="App">
        <Connection></Connection>
    </div>
  );
}

export default App;
