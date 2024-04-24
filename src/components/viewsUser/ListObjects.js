/* Librairy imports */
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios'

/* css imports */
import '../../css/cssViewUser/ListObjects.scss'

/* components imports */
import CardReservable from "./CardReservable";


function ListObjects() {
    const { reservableObject } = useParams()
    const url = "./../php/list/listAll"+reservableObject+".php"
    const [articles, setArticles]=useState(null)

    useEffect(()=> {
        function getObjects() {
            axios.get(url)
                .then(response => {setArticles(response.data)})
        }
        getObjects();
        }, [url])

    function Objects(){
        let res = <p>Aucun articles désolé</p>
        if (articles != null) {
            if (articles.length != 0) {
                res = articles.map(article =>
                    <CardReservable id={article.id} type={reservableObject} title={article.nom}/>
                )
            }
        }
        return res
    }

    return (
        <div className="ListObjects">
            <div className="articlesContainer">
                <Objects/>
            </div>
        </div>
    )
}

export default ListObjects;