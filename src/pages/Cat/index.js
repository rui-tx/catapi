import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Block from "../../components/Block";
import "./styles.css";

function Cat() {
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const newCat = fetchCatById(id);
  }, []);

  const fetchCatById = (id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://api.thecatapi.com/v1/images/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }
        setCat(data);
        setLoading(false);
        return data;
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Block blk="block-embossed-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cat-info">
          <h1>Cat Page </h1>

          <img src={cat.url} alt={cat.id} key={cat.id} />
          <p>ID: {cat.id}</p>
          <p>URL: {cat.url}</p>
          <p>Width: {cat.width}</p>
          <p>Height: {cat.height}</p>
        </div>
      )}
    </Block>
  );
}

export default Cat;
