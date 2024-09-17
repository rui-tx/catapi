import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Block from "../../components/Block";
import "./styles.css";

function Cat() {
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState(null);
  const { id } = useParams();

  // just for testing
  const api_key = "";

  useEffect(() => {
    const newCat = fetchCatById(id);
  }, []);

  const fetchCatById = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", api_key);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
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
    <Block>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-page">
          <div className="product-container">
            <div className="product-image">
              <img src={cat.url} alt={`Cat '${cat.id}'`} />
            </div>
            <div className="product-info">
              <h1 className="book-title">
                {cat.breeds && cat.breeds.length > 0
                  ? cat.breeds[0].name
                  : cat.id}
              </h1>
              <p className="book-description">
                {cat.width} x {cat.height}
              </p>
              {cat.breeds &&
                cat.breeds.map((b, index) => (
                  <div key={index}>
                    <p>
                      <strong>Breed Name: </strong>
                      {b.name}
                    </p>
                    <p>
                      <strong>Origin: </strong>
                      {b.origin}
                    </p>
                    <p>
                      <strong>Temperament: </strong>
                      {b.temperament}
                    </p>
                    <p>
                      <strong>Average life span: </strong>
                      {b.life_span} years
                    </p>
                    <p>
                      <strong>Typical weight: </strong>
                      {b.weight.metric} kgs
                      <strong> Imperial: </strong>
                      {b.weight.imperial} pounds
                    </p>
                    <p></p>
                    <p>
                      <strong>
                        <a href={b.wikipedia_url}>Wikipedia</a>
                      </strong>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Block>
  );
}

export default Cat;
