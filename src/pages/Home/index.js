import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const memoizedCats = useMemo(() => cats, [cats]);

  useEffect(() => {
    if (localStorage.getItem("cats")) {
      const localCatsShuffled = JSON.parse(localStorage.getItem("cats"));
      // localCatsShuffled.sort(() => Math.random() - 0.5);
      // localStorage.setItem("cats", JSON.stringify(localCatsShuffled));
      setCats(localCatsShuffled);
      setLoading(false);
    } else {
      fetchCats();
    }
  }, []);

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

  const handleImageClick = (cat) => {
    navigate(`/cat/${cat}`);
  };

  return (
    <Block blk="block-embossed">
      <p>Welcome to the Cat API</p>
      <p>Feel free to browse the gallery</p>
    </Block>
  );
};

export default Home;
