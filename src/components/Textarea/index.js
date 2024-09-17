import Block from "../Block";
import "./styles.css";

const Textarea = ({ placeholder, value, onChange, rows, disabled }) => {
  return (
    <Block>
      <textarea
        className="textarea-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required
      />
    </Block>
  );
};

export default Textarea;
