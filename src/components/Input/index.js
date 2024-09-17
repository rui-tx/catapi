import Block from "../Block";
import "./styles.css";

const Input = ({ type, placeholder, value, onChange, required }) => {
  return (
    <Block>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </Block>
  );
};

export default Input;
