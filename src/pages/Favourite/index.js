import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

import AuthContext from "../../contexts/AuthContext";
import ToastContext from "../../contexts/ToastContext";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    fetchFavouriteCats();
  }, []);

  // just for testing
  const api_key = process.env.REACT_APP_CAT_API_KEY;

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
      "/v1/favourites?limit=20&sub_id=" + user + "&order=DESC&attach_image=1",
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
        console.log(result);
        const data = JSON.parse(result);
        if (!data) {
          console.error("Fetch data failed: ", data);
          setLoading(false);
          return;
        }

        const newCats = data.map((cat) => {
          return {
            id: cat.image.id,
            url: cat.image.url,
            favouriteId: cat.id,
          };
        });

        const updatedCats = [...cats, ...newCats];
        setCats(updatedCats);
        localStorage.setItem("cats", JSON.stringify(updatedCats));
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
      <div className="images-wrapper">
        {cats.map((cat) => (
          <Block blk="block-embossed-center" key={cat.id + cat.url}>
            <img
              id={cat.id}
              src={cat.url}
              alt={cat.id}
              key={cat.id}
              onClick={() => handleImageClick(cat.id)}
              // width={cat.width}
              // height={cat.height}
              style={{
                cursor: "pointer",
                borderRadius: "0.5rem",
              }}
            />
          </Block>
        ))}
      </div>
    </Block>
  );
};

export default Favourite;
