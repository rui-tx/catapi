import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Block blk="block-embossed">
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist.</p>
        <Button btn="success">
          <Link className="home-link" to="/">
            Go back to homepage
          </Link>
        </Button>

        <Button onClick={goBack}>Go Back</Button>
      </div>
    </Block>
  );
}

export default NotFound;
