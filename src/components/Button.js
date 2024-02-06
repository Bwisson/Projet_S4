import '../css/Button.scss';
function Button({ text, onSmash }) {
    return (
        <button onClick={onSmash} className={"Button"}>{ text }</button>
    );
}

export default Button;
