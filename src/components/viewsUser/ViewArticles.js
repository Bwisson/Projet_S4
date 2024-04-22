/* Librairy imports */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* components imports */
import Button from '../Button'
import CardReservable from "./CardReservable";

/* css imports */
import '../../css/cssViewUser/ViewArticles.scss'


function ViewArticles() {
    const [articles, setArticles]=useState(null)

    useEffect(()=> {
        function getArticle() {
            axios.get("./php/list/listAllArticles.php")
                .then(response => {setArticles(response.data)})
        }
        getArticle();
        }, [])

    function ListArticles(){
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
                <ListArticles/>
            </div>
        </div>
    )
}

export default ViewArticles;