import { useContext, useEffect, useState, useRef, forwardRef } from "react";
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
  const firstBlockRef = useRef(null);
  const isVisible = useIntersection(triggerRef, "0px");

  const ForwardedBlock = forwardRef((props, ref) => (
    <Block {...props} innerRef={ref} />
  ));

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

  const scrollToFirstBlock = () => {
    if (firstBlockRef.current) {
      firstBlockRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("Scrolled to first block");
    }
  };

  const handleCatInfo = (cat) => {
    addToast(cat.id + " - " + cat.url, "toast-success");
    setCurrentCat(cat);
    setCurrentCatInfo(fetchCatById(cat.id));
    scrollToFirstBlock();

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
    <ForwardedBlock blk="block-embossed" ref={firstBlockRef}>
      {currentCat && currentCatInfo && (
        <div className="cat-info">
          <p>ID: {currentCat.id}</p>
          <p>URL: {currentCat.url}</p>
          <p>Width: {currentCat.width}</p>
          <p>Height: {currentCat.height}</p>

          <Block blk="block-embossed-center">
            <img
              src={currentCat.url}
              alt={currentCat.id}
              key={currentCat.id}
              styles={{
                cursor: "pointer",
                borderRadius: "0.5rem",
                maxWidth: "20%",
                maxHeight: "70vh",
              }}
              onClick={() => setCurrentCat(null)}
            />
          </Block>
        </div>
      )}
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
    </ForwardedBlock>
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
