/* Librairy imports */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* components imports */
import Button from '../Button'
import PopUpUser from "./PopUpUser"

/* css imports */
import '../../css/cssViewsAdmin/ViewUsers.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'


function ViewCard() {
  const [articles, setArticles]=useState(null)

  useEffect(() => {
    function getArticles() {
    axios.get(".php/list/listAllArticles.php)
              .then(response => {
                let dataResponse = response.data
                if (dataResponse != null){
                  dataResponse.reverse()
                }
                setArticles(dataResponse)
                setNewData(false);
              })
              }
    getArticles();
  }, [])
}

function Cards() {
  let cards_articles = null
  if(articles != null){
    cards_articles = articles.map(art =>
      <div className="card">
        <span>{art.img}</span>
        <span>{art.nom}</span>
        <button>Réserver</button>
      </div>
    );
  }
  return cards_article
}
    
return (
  <div className="ViewCards">
    <Cards />
  </div>
  )
}

export default ViewArticle;
