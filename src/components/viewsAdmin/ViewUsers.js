/* css imports */
import '../../css/ViewUsers.scss'

/* components imports */
import Button from '../Button'

/* SELECT id, nom, prenom, login, mail FROM 'User' */
const users = [
    {"id" : 2, "nom": "chatelain", "prenom": "Timéo", "login": "Tim", "mail": "timtim@gmail.com"},
    {"id" : 1, "nom": "roi", "prenom": "Nathan", "login": "pupuce", "mail": "pupuce@gmail.com"}
]

function List(){
    const list_users = users.map(user =>
        <tr>
            <td id={"userLastName"}>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.login}</td>
            <td>{user.mail}</td>
            <td id={user.id}><Button text={"Voir les réservations"} bgColor={"#2882ff"}/></td>
        </tr>
);

    return list_users
}

function ViewUsers() {

    return (
        <div className="ViewUsers">
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
                    <List/>
                </tbody>
            </table>
        </div>

    )
}

export default ViewUsers;