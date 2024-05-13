/* Library imports */
/* css imports */
import '../css/Button.scss';

function Button({ id, text, bgColor, onSmash, value }) {
    if (bgColor == null){
        bgColor = "#c4a6ff";
    }
    return (
        <button  id={id} onClick={onSmash} value={value} className={"Button"} style={{backgroundColor: bgColor}} >{ text }</button>
    );
}

export default Button;
