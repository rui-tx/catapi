import { useContext, useEffect, useState, useRef } from "react";
import { useIntersection } from "../../hooks/useIntersection";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

import ToastContext from "../../contexts/ToastContext";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [cats, setCats] = useState([]);
  const [currentCat, setCurrentCat] = useState(null);
  const [currentCatInfo, setCurrentCatInfo] = useState(null);
  const { addToast } = useContext(ToastContext);
  const triggerRef = useRef(null);
  const currenCatRef = useRef(null);
  const isVisible = useIntersection(triggerRef, "0px");

  useEffect(() => {
    fetchCats();
  }, []);

  // useEffect(() => {
  //   if (isVisible) {
  //     fetchCats();
  //   }
  // }, [fetchCats, isVisible]);

  const handleCatInfo = (cat) => {
    addToast(cat.id + " - " + cat.url, "toast-success");
    setCurrentCat(cat);
    setCurrentCatInfo(fetchCatById(cat.id));
    //scrollToCurrentCat();
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
          setCats([...localCats, ...data]);
        } else {
          setCats(data);
        }

        localStorage.setItem("cats", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

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
        setCurrentCatInfo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Block blk="block-embossed" ref={currenCatRef}>
      {currentCat && currentCatInfo && (
        <div className="cat-info">
          <p>ID: {currentCat.id}</p>
          <p>URL: {currentCat.url}</p>
          <p>Width: {currentCat.width}</p>
          <p>Height: {currentCat.height}</p>
        </div>
      )}
      {currentCat && (
        <Block blk="block-embossed-center">
          <img
            src={currentCat.url}
            alt={currentCat.id}
            key={currentCat.id}
            width={currentCat.width}
            height={currentCat.height}
            styles={{
              cursor: "pointer",
              borderRadius: "0.5rem",
              width: "20%",
              height: "20%",
            }}
            onClick={() => setCurrentCat(null)}
          />
        </Block>
      )}
      <div className="images-wrapper">
        {cats.map((cat) => (
          <Block
            blk="block-embossed-center"
            key={cat.id + "1"}
            styles={{
              width: "100%",
              height: 0,
              paddingTop: "50%",
              position: "relative",
            }}
          >
            <img
              src={cat.url}
              alt={cat.id}
              key={cat.id}
              onClick={() => handleCatInfo(cat)}
              style={{ cursor: "pointer", borderRadius: "0.5rem" }}
              width={cat.width}
              height={cat.height}
              styles={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            />
          </Block>
        ))}
      </div>
      {loading ? (
        <Block blk="block-embossed-center">
          <p>Loading...</p>
        </Block>
      ) : (
        <Block blk="block-embossed-center" ref={triggerRef}>
          <Button onClick={fetchCats}>Load more...</Button>
        </Block>
      )}
    </Block>
  );
};

export default Home;

// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [cats, setCats] = useState([]);

// const fetchCats = () => {
//   console.log("Fetching cats...");
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   fetch("https://api.thecatapi.com/v1/images/search?limit=10", requestOptions)
//     .then((response) => response.text())
//     .then((result) => {
//       const data = JSON.parse(result);
//       if (!data) {
//         console.error("Fetch data failed: ", data);
//         return;
//       }
//       if (cats.length > 0) {
//         setCats([...cats, ...data]);
//       } else {
//         setCats(data);
//       }
//       setLoading(false);
//     })
//     .catch((error) => {
//       setLoading(false);
//       console.error(error);
//     });
// };

//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//       <div className="app">
//         <button onClick={fetchCats}>Fetch Cats</button>
//         <div className="images-wrapper">
//           {cats.map((cat) => (
//             <img src={cat.url} alt={cat.id} key={cat.id} />
//           ))}
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
