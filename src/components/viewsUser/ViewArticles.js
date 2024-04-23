/* Librairy imports */
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios'

/* components imports */
import CardReservable from "./CardReservable";

/* css imports */
import '../../css/cssViewUser/ViewArticles.scss'


function ViewArticles() {
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
                    <CardReservable title={article.nom}/>
                )
            }
        }
        return res
    }

    return (
        <div className="ViewArticles">
            <div className="articlesContainer">
                <Objects/>
            </div>
        </div>
    )
}

export default ViewArticles;