import Button from "../Button";
import React from "react";

function ViewObjects() {

    // function List(){
    //     const list_users = users.map(user =>
    //         <tr>
    //             <td id={"userLastName"}>{user.nom}</td>
    //             {/*<td>{user.prenom}</td>*/}
    //             {/*<td>{user.login}</td>*/}
    //             {/*<td>{user.mail}</td>*/}
    //             {/*<td id={user.id}><Button onSmash={showingPopUp} text={"Voir les réservations"} bgColor={"#2882ff"}/></td>*/}
    //         </tr>
    //     );
    //
    //     return list_users
    // }
    return (
        <div className="ViewObjects">
            <table>
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Login</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Réservations</th>
                </tr>
                </thead>
                <tbody>
                {/*<List/>*/}
                </tbody>
            </table>
        </div>
    )
}

export default ViewObjects;