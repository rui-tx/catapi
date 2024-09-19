import { BlockStyles } from "../BlockStyles";
const Block = ({ children, blk }) => {
  return <BlockStyles className={blk}>{children}</BlockStyles>;
};

export default Block;
