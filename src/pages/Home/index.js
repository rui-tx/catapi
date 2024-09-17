import { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Cat from "../Cat";
import "./styles.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cats")) {
      const localCatsShuffled = JSON.parse(localStorage.getItem("cats"));
      localCatsShuffled.sort(() => Math.random() - 0.5);
      localStorage.setItem("cats", JSON.stringify(localCatsShuffled));
      setCats(localCatsShuffled);
      setLoading(false);
    } else {
      fetchCats();
    }
  }, []);

  const handleCatInfo = () => {
    return <Cat />;
  };

  const fetchCats = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://api.thecatapi.com/v1/images/search?limit=10", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }

        if (localStorage.getItem("cats")) {
          const localCats = JSON.parse(localStorage.getItem("cats"));
          const updatedCats = [...localCats, ...data];
          setCats(updatedCats);
          localStorage.setItem("cats", JSON.stringify(updatedCats));
        } else {
          setCats(data);
          localStorage.setItem("cats", JSON.stringify(data));
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Block blk="block-embossed">
      <div className="images-wrapper">
        {cats.map((cat) => (
          <Block
            blk="block-embossed-center"
            key={cat.id + cat.url}
            styles={{
              width: "100%",
              height: 0,
              paddingTop: "50%",
              position: "relative",
            }}
          >
            <Link className="book-link" to={`/cat/${cat.id}`}>
              <img
                src={cat.url}
                alt={cat.id}
                key={cat.id}
                onClick={() => handleCatInfo(cat)}
                style={{ cursor: "pointer", borderRadius: "0.5rem" }}
                width={cat.width}
                height={cat.height}
                styles={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
              />
            </Link>
          </Block>
        ))}
      </div>
      {loading ? (
        <Block blk="block-embossed-center">
          <p>Loading...</p>
        </Block>
      ) : (
        <Block blk="block-embossed-center">
          <Button onClick={fetchCats}>Load more...</Button>
        </Block>
      )}
    </Block>
  );
};

export default Home;
