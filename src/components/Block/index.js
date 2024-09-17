import styles from "./styles.css";

const Block = ({ children, blk }) => {
  if (blk) {
    return <div className={`block ${blk}`}>{children}</div>;
  }
  return <div className="block">{children}</div>;
};

export default Block;
