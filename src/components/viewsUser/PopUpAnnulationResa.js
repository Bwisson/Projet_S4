import React from 'react';
import Button from '../Button';
import "../../css/PopUpAnnulationResa.scss";

const PopUpAnnulationResa = ({onCancel, onConfirm}) => {
    return (
      <div className="pop-up-container">
        <div className="pop-up">
          <h2>Confirmation d'annulation</h2>
          <p>Etes-vous sûr de vouloir envoyer une demande d'annulation pour cette réservation ?</p>
          <div className="button-container">
            <Button onSmash={onConfirm} text={"Confirmer"} bgColor={"#2882ff"}/>
            <Button onSmash={onCancel} text={"Retour"} bgColor={"#2882ff"}/>
          </div>
        </div>
      </div>
    );
  };

export default PopUpAnnulationResa;