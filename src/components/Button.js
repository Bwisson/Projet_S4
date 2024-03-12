import '../css/Button.scss';
function Button({ text, bgColor, onSmash }) {
    if (bgColor == null){
        bgColor = "#c4a6ff";
    }
    return (
        <button onClick={onSmash} className={"Button"} style={{backgroundColor: bgColor}} >{ text }</button>
    );
}

export default Button;
