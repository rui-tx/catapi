import Block from "../Block";
import "./styles.css";

const Select = ({ children, name, id, onChange }) => {
  return (
    <Block>
      <select className="select" name={name} id={id} onChange={onChange}>
        {children}
      </select>
    </Block>
  );
};

export default Select;
