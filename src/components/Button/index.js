import { ButtonStyles } from "../ButtonStyles";
import Block from "../Block";

const Button = ({ ...props }) => {
  const { children, btn = "default" } = props;

  return (
    <Block>
      <ButtonStyles
        btn={btn}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled} //{...(props.disabled && { disabled: true })}
      >
        {children}
      </ButtonStyles>
    </Block>
  );
};

export default Button;
