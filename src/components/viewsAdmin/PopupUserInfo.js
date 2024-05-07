/* Library imports */
import {useEffect,useState} from "react";
import axios from "axios"

/* components imports */
import Button from "../Button";

/* css imports */
import "../../css/cssViewsAdmin/PopUpUser.scss"

function PopupUserInfo({id, setShowPopupUser, positionY}) {

    useEffect(() => {
        function getUserInfo(){
            let form_data = new FormData()
            form_data.append("id", id)

            axios.post("./php/select/selectUser.php", form_data)
                .then(response => {
                    let data = response.data
                    console.log(data)
                })
        }

        getUserInfo()
    }, [id]);


    function hidePopUp() {
        return setShowPopupUser(false)
    }

    let popup = document.getElementsByClassName("PopUpUser")

    if(popup[0] != undefined){
        let popupHeight = popup[0].clientHeight
        positionY = positionY - popupHeight
    }

    return (
        <div className="PopupUserInfo" style={{top: positionY + 'px'}}>
            {/*<Button onSmash={hidePopUp} text={"X"} bgColor={"#ff2828"}/>*/}
        </div>
    )
}

export default PopupUserInfo;