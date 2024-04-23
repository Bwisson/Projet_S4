

/* css imports */
import '../../css/cssViewUser/Object.scss'

/* components imports */
import Button from '../Button'

function Object(){

    return(
        <div className="Object">
            <div className={"leftSide"}>
                <div className="imgCard"></div>
                <h2>Test</h2>
                <article>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam nisi libero, lacinia ac maximus ut, pellentesque eget sapien.
                        Quisque semper nibh at neque hendrerit, ut egestas lacus mollis.
                        Phasellus molestie nisl non neque bibendum, ac fermentum lectus porttitor.
                        Vivamus ornare dolor nec lectus sollicitudin, in consequat mi tempor.
                        Nam sit amet sollicitudin justo.
                    </p>
                </article>
            </div>

            <div className={"rightSide"}>
                <div className={"calendar"}></div>
                <Button text={"Réserver"}></Button>
            </div>
        </div>
    )
}

export default Object