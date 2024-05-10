/* Librairy imports */
import React, { useState } from "react";
import axios from "axios"
import Button from "../Button.js";

/* css imports */
import "../../css/cssViewUser/ModifInfo.scss";

function ModifInfo({setDataModified}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === 'email') {
      // Faites quelque chose avec l'email et le mot de passe
      let form_data = new FormData()
      form_data.append("mail", email)
      form_data.append("mdp", password)
      axios.post("./php/update/updateUserMail.php", form_data)
          .then(response => {setDataModified(response.data)})
    } else if (selectedOption === 'password') {
      // Faites quelque chose avec les mots de passe
      let form_data = new FormData()
      form_data.append("oldMdp", password)
      form_data.append("newMdp", newPassword)
      form_data.append("confirmNewMdp", confirmNewPassword)
      axios.post("./php/update/updateUserPassword.php", form_data)
          .then(response => {setDataModified(response.data)})
    }
  };

  return (
    <div className="container">
      <h2>Modifier les informations</h2>
      <div className="options">
        <input type="radio" id="email" name="option" value="email" onChange={() => handleOptionChange('email')} />
        <label htmlFor="email"> Changer email</label>
        <br />
        <input type="radio" id="password" name="option" value="password" onChange={() => handleOptionChange('password')} />
        <label htmlFor="password"> Changer mot de passe</label>
      </div>
      {selectedOption === 'email' && (
        <div className="inputs">
          <input type="text" placeholder="Nouvel email" value={email} onChange={handleEmailChange} />
          <br />
          <input type="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />
        </div>
      )}
      {selectedOption === 'password' && (
        <div className="inputs">
          <input type="password" placeholder="Ancien mot de passe" value={password} onChange={handlePasswordChange} />
          <br />
          <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={handleNewPasswordChange} />
          <br />
          <input type="password" placeholder="Confirmer nouveau mot de passe" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
        </div>
      )}
      <Button onSmash={handleSubmit} text={"Confirmer"} bgColor={"#2882ff"}/>
    </div>
  );
}

export default ModifInfo;