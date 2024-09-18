import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";
import { BsDatabaseDown } from "react-icons/bs";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 5;
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "DESC";
  const hasBreeds = searchParams.get("has_breeds") || "";
  const breedIds = searchParams.get("breed_ids") || "";
  const categoryIds = searchParams.get("category_ids") || "";
  const subIds = searchParams.get("sub_ids") || "";

  const navigate = useNavigate();
  const memoizedCats = useMemo(() => cats, [cats]);
  const memoizedBreeds = useMemo(() => breeds, [breeds]);

  useEffect(() => {
    setLoading(true);
    fetchCats();
  }, [limit, page, order, hasBreeds, breedIds, categoryIds, subIds]);

  useEffect(() => {
    setLoading(true);
    fetchBreeds();
  }, []);

  const api_key = process.env.REACT_APP_CAT_API_KEY;

  const fetchBreeds = () => {
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const fetchCats = () => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=${order}&has_breeds=${hasBreeds}&breed_ids=${breedIds}&category_ids=${categoryIds}&sub_ids=${subIds}`;
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

        setCats(data);
        localStorage.setItem("cats", JSON.stringify(data));
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

  const handleNextPage = () => {
    setSearchParams({
      limit,
      page: parseInt(page) + 1,
      order,
      has_breeds: hasBreeds,
      breed_ids: breedIds,
      category_ids: categoryIds,
      sub_ids: subIds,
    });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({
        limit,
        page: parseInt(page) - 1,
        order,
        has_breeds: hasBreeds,
        breed_ids: breedIds,
        category_ids: categoryIds,
        sub_ids: subIds,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formParams = new URLSearchParams({
      limit,
      page,
      order,
      has_breeds: hasBreeds,
      breed_ids: breedIds,
      category_ids: categoryIds,
      sub_ids: subIds,
    });

    setSearchParams(formParams);
  };

  return (
    <Block blk="block-embossed">
      <form onSubmit={handleSubmit} disabled={loading}>
        <label>
          Limit:
          <select
            type="number"
            value={limit}
            onChange={(e) =>
              setSearchParams({
                limit: e.target.value,
                page,
                order,
                has_breeds: hasBreeds,
                breed_ids: breedIds,
                category_ids: categoryIds,
                sub_ids: subIds,
              })
            }
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </label>
        <br />

        <label style={{ display: "none" }}>
          Page:
          <input
            style={{ display: "none" }}
            type="number"
            value={page}
            disabled
            onChange={(e) =>
              setSearchParams({
                limit,
                page: e.target.value,
                order,
                has_breeds: hasBreeds,
                breed_ids: breedIds,
                category_ids: categoryIds,
                sub_ids: subIds,
              })
            }
          />
        </label>
        <br />
        <label>
          Order:
          <select
            value={order}
            onChange={(e) =>
              setSearchParams({
                limit,
                page,
                order: e.target.value,
                has_breeds: hasBreeds,
                breed_ids: breedIds,
                category_ids: categoryIds,
                sub_ids: subIds,
              })
            }
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
            <option value="RND">Random</option>
          </select>
        </label>
        <br />
        <label>
          Cat has breed:
          <select
            value={hasBreeds}
            onChange={(e) =>
              setSearchParams({
                limit,
                page,
                order,
                has_breeds: e.target.value,
                breed_ids: breedIds,
                category_ids: categoryIds,
                sub_ids: subIds,
              })
            }
          >
            <option value="">Any</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        <br />
        {hasBreeds === "1" && (
          <label>
            Breed:
            <select
              type="text"
              value={breedIds}
              onChange={(e) =>
                setSearchParams({
                  limit,
                  page: 1,
                  order,
                  has_breeds: hasBreeds,
                  breed_ids: e.target.value,
                  category_ids: categoryIds,
                  sub_ids: subIds,
                })
              }
            >
              {memoizedBreeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <br />
        <label style={{ display: "none" }}>
          Category IDs:
          <input
            style={{ display: "none" }}
            type="text"
            value={categoryIds}
            onChange={(e) =>
              setSearchParams({
                limit,
                page,
                order,
                has_breeds: hasBreeds,
                breed_ids: breedIds,
                category_ids: e.target.value,
                sub_ids: subIds,
              })
            }
          />
        </label>
        <br />
        <label style={{ display: "none" }}>
          Uploader IDs:
          <input
            style={{ display: "none" }}
            type="text"
            value={subIds}
            onChange={(e) =>
              setSearchParams({
                limit,
                page,
                order,
                has_breeds: hasBreeds,
                breed_ids: breedIds,
                category_ids: categoryIds,
                sub_ids: e.target.value,
              })
            }
          />
        </label>
        <br />
        <button type="submit">Search</button>
        <button onClick={handlePreviousPage} disabled={page <= 1 || loading}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={limit - cats.length !== 0 || loading}
        >
          Next
        </button>
        <div>
          <p> Page {page} </p>
          {limit - cats.length !== 0 && (
            <p>
              <strong>Last Page</strong>
            </p>
          )}
        </div>
      </form>
      {loading ? (
        <Block blk="block-embossed-center">
          <p>Loading...</p>
        </Block>
      ) : (
        <Block blk="block-embossed-center">
          <div className="cat-list">
            {memoizedCats.map((cat) => (
              <Block blk="block-embossed" key={cat.id + cat.url}>
                <img
                  className="cat"
                  id={cat.id}
                  src={cat.url}
                  alt={cat.id}
                  key={cat.id}
                  onClick={() => handleImageClick(cat.id)}
                  width={cat.width}
                  height={cat.height}
                />
              </Block>
            ))}
          </div>
        </Block>
      )}
    </Block>
  );
};

export default Search;
