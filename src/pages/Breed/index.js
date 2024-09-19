import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Select from "../../components/Select";
import "./styles.css";

const Breed = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [breedIds, setBreedIds] = useState("");
  const [currentBreedToShow, setCurrentBreedToShow] = useState(null);
  const [facts, setFacts] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const memoizedCats = useMemo(() => cats, [cats]);
  const memoizedBreeds = useMemo(() => breeds, [breeds]);

  const api_key = process.env.REACT_APP_CAT_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetchBreeds();

    setCurrentBreedToShow(breeds.find((breed) => breed.id === id));
  }, [id]);

  const fetchBreeds = () => {
    if (sessionStorage.getItem("breeds")) {
      const localBreeds = JSON.parse(sessionStorage.getItem("breeds"));
      setBreeds(localBreeds);
      setLoading(false);
      return;
    }

    const url = `https://api.thecatapi.com/v1/breeds`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", api_key);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }

        setBreeds(data);
        sessionStorage.setItem("breeds", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const fetchBreedFact = () => {
    const url = `https://api.thecatapi.com/v1/breeds/:${id}/facts`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", api_key);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }

        const newFacts = [...facts, ...data];
        setFacts(newFacts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleBreedInput = (breedId) => {
    navigate(`/breed/${breedId}`);
  };

  return (
    <Block>
      {!loading && (
        <div className="breed-selector">
          <Block>
            <Select
              value={id}
              onChange={(e) => handleBreedInput(e.target.value)}
            >
              <option value="">Learn more about...</option>
              {memoizedBreeds?.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </Select>
          </Block>
        </div>
      )}
      <div className="breed-page">
        {id && (
          <div className="breed-container">
            <div className="breed-image">
              <img
                onClick={() =>
                  navigate(`/cat/${currentBreedToShow?.image?.id}`)
                }
                src={currentBreedToShow?.image?.url}
                alt={currentBreedToShow?.name}
              />
            </div>
            <div className="breed-info">
              <h1 className="breed-title">{currentBreedToShow?.name}</h1>
              <p>
                <strong>Origin:</strong> {currentBreedToShow?.origin}
              </p>
              <p>
                <strong>Temperament:</strong> {currentBreedToShow?.temperament}
              </p>
              <p>
                <strong>Life Span:</strong> {currentBreedToShow?.life_span}{" "}
                years
              </p>
              <p>
                <strong>Weight (Imperial):</strong>{" "}
                {currentBreedToShow?.weight?.imperial} lbs
              </p>
              <p>
                <strong>Weight (Metric):</strong>{" "}
                {currentBreedToShow?.weight?.metric} kg
              </p>
              <p>
                <strong>Description:</strong> {currentBreedToShow?.description}
              </p>
              {/* Other breed information here */}
              <p>
                <strong>Wikipedia:</strong>
                <a
                  href={currentBreedToShow?.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </p>
              <div className="breed-facts">
                <h2>Facts</h2>
                <Button onClick={fetchBreedFact}>Fetch more facts</Button>
                {facts.map((fact) => (
                  <p key={fact.id}>
                    <strong>{fact.fact}</strong>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Block>
  );
};

export default Breed;
