import {useState} from "react";

function Popup({Content}){
    return (
        <div className={"Popup"}>
            <Content />
        </div>
    )
}

export default Popup