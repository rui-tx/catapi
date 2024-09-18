import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSwipe from "../../hooks/useSwipe";
import useApi from "../../hooks/useApi";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

import ToastContext from "../../contexts/ToastContext";
import AuthContext from "../../contexts/AuthContext";

function Cat() {
  const [loading, setLoading] = useState(true);
  const [catList, setCatList] = useState(localStorage.getItem("cats"));
  const [cat, setCat] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteId, setFavouriteId] = useState(null);
  const [showHeart, setShowHeart] = useState(false);
  const { id } = useParams();
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => setCat(getNextCat()),
    () => setCat(getPreviousCat())
  );

  // just for testing
  const api_key = process.env.REACT_APP_CAT_API_KEY;

  useEffect(() => {
    setIsFavourite(false);
    fetchCatById(id);
    fetchFavouriteCats();
  }, [id]);

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

  const fetchFavouriteCats = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", api_key);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "/v1/favourites?sub_id=" + user + "&order=DESC&attach_image=1",
      requestOptions
    )
      .then((response) => {
        if (response.status !== 200) {
          switch (response.status) {
            case 401:
              addToast(
                "You need to set your API key to see your favourites 😔",
                "toast-error"
              );
              setLoading(false);
              return;
            case 403:
              addToast(
                "You are not allowed to see your favourites 😔",
                "toast-error"
              );
              setLoading(false);
              return;
            default:
              addToast("Something went wrong... 😔", "toast-error");
              console.error(response);
              setLoading(false);
              return;
          }
        }
        return response.text();
      })
      .then((result) => {
        if (!result) {
          return;
        }
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }
        for (let c of data) {
          if (c.image_id === id) {
            setIsFavourite(true);
            setFavouriteId(c.id);
            break;
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFavourite = () => {
    if (isFavourite) {
      handleDeleteFavourite();
      return;
    }

    if (!isLoggedIn) {
      addToast("You need to login to favourite a cat 😔", "toast-error");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", api_key);

    const raw = '{\n	"image_id":"' + cat.id + '",\n	"sub_id": "' + user + '"\n}';
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/v1/favourites", requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          switch (response.status) {
            case 401:
              addToast(
                "You need to set your API key to favourite a cat 😔",
                "toast-error"
              );
              return;
            case 403:
              addToast(
                "You are not allowed to favourite this cat 😔",
                "toast-error"
              );
              return;
            default:
              addToast("Something went wrong... 😔", "toast-error");
              console.error(response);
              return;
          }
        }
        return response.text();
      })
      .then((result) => {
        if (!result) return;

        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }

        // const newCat = {
        //   id: cat.id,
        //   url: cat.url,
        //   favouriteId: cat.id,
        // };

        // setCat(newCat);
        setIsFavourite(true);
        setFavouriteId(data.id);

        setShowHeart(true);
        setTimeout(() => {
          setShowHeart(false);
        }, 1000);

        addToast("Favourited 😊", "toast-success");
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteFavourite = () => {
    if (!isLoggedIn) {
      addToast("You need to login to use favourite features 😔", "toast-error");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", api_key);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("/v1/favourites/" + favouriteId, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          switch (response.status) {
            case 401:
              addToast(
                "You need to set your API key to use this feature 😔",
                "toast-error"
              );
              return;
            case 403:
              addToast(
                "You are not allowed to use this feature 😔",
                "toast-error"
              );
              return;
            default:
              addToast("Something went wrong... 😔", "toast-error");
              console.error(response);
              return;
          }
        }
        return response.text();
      })
      .then((result) => {
        if (!result) return;

        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          return;
        }

        setIsFavourite(false);
        setFavouriteId(null);

        addToast("Cat is not your favourite anymore... 😔", "toast-success");
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVote = (vote) => {
    if (vote === "up") {
      addToast("Upvoted 😊", "toast-success");
    } else {
      addToast("Downvoted 😔", "");
    }
    setCat(getNextCat());
  };

  const getNextCat = () => {
    const cats = JSON.parse(catList);
    const currentIndex = cats.findIndex((cat) => cat.id === id);
    const nextCat = cats[currentIndex + 1];
    if (!nextCat) {
      addToast(
        "Yey! You got to the bottom of the list 😊. Load more cats from the Home page.",
        "toast-success"
      );
    }

    return nextCat
      ? navigate(`/cat/${nextCat.id}`)
      : navigate(`/cat/${cats[0].id}`);
  };

  const getPreviousCat = () => {
    const cats = JSON.parse(catList);
    const currentIndex = cats.findIndex((cat) => cat.id === id);
    const previousCat = cats[currentIndex - 1];
    return previousCat
      ? navigate(`/cat/${previousCat.id}`)
      : navigate(`/cat/${cats[cats.length - 1].id}`);
  };

  return (
    <Block>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-page">
          <div
            className="product-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="product-image">
              <img
                src={cat?.url}
                alt={`Cat '${cat?.id}'`}
                style={{ borderRadius: "0.5rem" }}
                {...(!isFavourite && { onClick: handleFavourite })}
              />
              {showHeart && <div className="heart-animation">❤️</div>}
              <div className="image-overlay">
                <button
                  className="overlay-button"
                  onClick={() => setCat(getPreviousCat())}
                >
                  👈
                </button>
                <button
                  className="overlay-button"
                  onClick={() => handleVote("down")}
                >
                  👎
                </button>
                {!isFavourite ? (
                  <button className="overlay-button" onClick={handleFavourite}>
                    ❤️
                  </button>
                ) : (
                  <button className="overlay-button" onClick={handleFavourite}>
                    💔
                  </button>
                )}

                <button
                  className="overlay-button"
                  onClick={() => handleVote("up")}
                >
                  👍
                </button>

                <button
                  className="overlay-button"
                  onClick={() => setCat(getNextCat())}
                >
                  👉
                </button>
              </div>
            </div>
            <div className="product-info">
              <h1 className="book-title">
                {cat?.breeds && cat?.breeds.length > 0
                  ? cat?.breeds[0].name
                  : ""}
              </h1>
              <p className="book-description">
                {cat?.width} x {cat?.height}
              </p>
              {cat?.breeds &&
                cat?.breeds.map((b, index) => (
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
//<Button onClick={() => navigate(`/home/${cat.id}`)}>🏠</Button>
{
  /* <div className="action-buttons">
<Button onClick={() => handleVote("down")}>👎</Button>
<Button btn="fancy" onClick={handleFavourite}>
  ❤️
</Button>
<Button onClick={() => handleVote("up")}>👍</Button>
</div>
<div className="action-buttons">
<Button onClick={() => setCat(getPreviousCat())}>
  Previous
</Button>
<Button onClick={() => navigate(`/`)}>🏠</Button>
<Button onClick={() => setCat(getNextCat())}>Next</Button>
</div> */
}
export default Cat;

// setLoading(true);
// const myHeaders = new Headers();
// myHeaders.append("x-api-key", api_key);
// myHeaders.append("Content-Type", "application/json");
// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };
// const apiResponse = useApi(
//   "https://api.thecatapi.com/v1/images/" + id,
//   requestOptions
// );

// if (!apiResponse.success) {
//   switch (apiResponse.status) {
//     case 401:
//       addToast(
//         "You need to set your API key to see your favourites 😔",
//         "toast-error"
//       );
//       setLoading(false);
//       return;
//     case 403:
//       addToast(
//         "You are not allowed to see your favourites 😔",
//         "toast-error"
//       );
//       setLoading(false);
//       return;
//     default:
//       addToast("Something went wrong... 😔", "toast-error");
//       console.error(apiResponse);
//       setLoading(false);
//       return;
//   }
// }
// setCat(apiResponse.data);
// setLoading(false);
// return apiResponse.data;
