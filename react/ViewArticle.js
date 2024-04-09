/* Librairy imports */
import React, { useState, useEffect } from "react"
import axios from 'axios'

/* components imports */
import Button from '../Button'
import PopUpUser from "./PopUpUser"

/* css imports */
import '../../css/cssViewsAdmin/ViewArticle.scss'
import '../../css/cssViewsAdmin/tableAdmin.scss'


function ViewArticle() {
  const [article, setArticle]=useState(null)

  useEffect(() => {
    function getArticle() {
    axios.get(".php/list/getArticle.php)
              .then(response => {setArticle(respose.data)})
              }
    getArticle();
  }, [])
}

/*function Image() {
  let image_product = null
  if(product != null){
    image_product = product.map(prod =>
      <span>{prod.i}</span>
      );
      }
      return image_article
      }*/

function Title() {
  let title_article = null
  if(article != null){
    title_article = article.map(art =>
      <span>{art.nom}</span>
    );
  }
  return title_article
}

  /*function Desc() {
  let desc_article = null
  if(article != null){
    desc_article = article.map(art =>
      <p>{art.desc}</p>
    );
  }
  return desc_article
  }*/

function Calendar(){
  <td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>
}
    
return (
  <div className="ViewArticle">
    <span id="image">
      //<ImageProduct />
    </span>
    <span id="title">
      <Title />
    </span>
    <span id="desc">
      //<descArticle />
    </span>
  </div>

  <div className="productCalendar">
    //<Calendar />
  </div>
  )
}

export default ViewArticle;
