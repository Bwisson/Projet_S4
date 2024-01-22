import '../css/Button.scss';
function Button(props) {
    let text = props.text;
    return (
        <button className={"Button"}>{ text }</button>
    );
}

export default Button;
