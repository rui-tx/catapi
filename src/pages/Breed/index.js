import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
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
    <Block blk="block-embossed">
      {!loading && (
        <div>
          <span>Learn more about </span>
          <select
            type="text"
            value={id}
            onChange={(e) => handleBreedInput(e.target.value)}
          >
            {memoizedBreeds?.map((breed) => (
              <option key={breed.id} value={breed.id}>
                {breed.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <Block blk="block-embossed">
          <div>
            <h2>{currentBreedToShow?.name}</h2>
            <img
              src={currentBreedToShow?.image?.url}
              alt={currentBreedToShow?.name}
              width={currentBreedToShow?.image?.width}
              height={currentBreedToShow?.image?.height}
              style={{ borderRadius: "0.5rem", width: "100%", margin: "auto" }}
            />
            <p>
              <strong>Origin:</strong> {currentBreedToShow?.origin}
            </p>
            <p>
              <strong>Temperament:</strong> {currentBreedToShow?.temperament}
            </p>
            <p>
              <strong>Life Span:</strong> {currentBreedToShow?.life_span} years
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
            <p>
              <strong>Affection Level:</strong>{" "}
              {currentBreedToShow?.affection_level}
            </p>
            <p>
              <strong>Adaptability:</strong> {currentBreedToShow?.adaptability}
            </p>
            <p>
              <strong>Child Friendly:</strong>{" "}
              {currentBreedToShow?.child_friendly}
            </p>
            <p>
              <strong>Dog Friendly:</strong> {currentBreedToShow?.dog_friendly}
            </p>
            <p>
              <strong>Energy Level:</strong> {currentBreedToShow?.energy_level}
            </p>
            <p>
              <strong>Grooming:</strong> {currentBreedToShow?.grooming}
            </p>
            <p>
              <strong>Health Issues:</strong>{" "}
              {currentBreedToShow?.health_issues}
            </p>
            <p>
              <strong>Intelligence:</strong> {currentBreedToShow?.intelligence}
            </p>
            <p>
              <strong>Shedding Level:</strong>{" "}
              {currentBreedToShow?.shedding_level}
            </p>
            <p>
              <strong>Social Needs:</strong> {currentBreedToShow?.social_needs}
            </p>
            <p>
              <strong>Stranger Friendly:</strong>{" "}
              {currentBreedToShow?.stranger_friendly}
            </p>
            <p>
              <strong>Vocalisation:</strong> {currentBreedToShow?.vocalisation}
            </p>
            <p>
              <strong>Hypoallergenic:</strong>{" "}
              {currentBreedToShow?.hypoallergenic ? "Yes" : "No"}
            </p>
            <p>
              <strong>Wikipedia:</strong>{" "}
              <a
                href={currentBreedToShow?.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </p>
          </div>
        </Block>
        <Block blk="block-embossed">
          <h2>Facts</h2>
          <button onClick={fetchBreedFact}>Fetch more facts</button>
        </Block>
        <div>
          {facts.map((fact) => (
            <p key={fact.id}>
              <strong>{fact.fact}</strong>
            </p>
          ))}
        </div>
      </div>
    </Block>
  );
};

export default Breed;
