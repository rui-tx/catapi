import Block from "../Block";
import "./styles.css";

const Button = ({ ...props }) => {
  const { children, btn } = props;
  const buttonType = btn || "default";
  const buttonClass = "button " + buttonType;

  return (
    <Block>
      <button
        className={buttonClass}
        type={props.type}
        onClick={props.onClick}
        {...(props.disabled && { disabled: true })}
      >
        {children}
      </button>
    </Block>
  );
};

export default Button;
