import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

const VoteHistory = () => {
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchVotes();
    console.log(votes);
  }, []);

  const api_key = process.env.REACT_APP_CAT_API_KEY;

  const fetchVotes = () => {
    const url = `https://api.thecatapi.com/v1/votes/`;
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

        setVotes(data);
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Votes</h2>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Image ID</th>
                <th>Sub ID</th>
                <th>Created At</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      style={{ cursor: "pointer" }}
                      src={item.image.url}
                      alt={item.image_id}
                      width="100"
                      onClick={() => handleImageClick(item.image_id)}
                    />
                  </td>
                  <td>{item.image_id}</td>
                  <td>{item.sub_id}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Block>
  );
};

export default VoteHistory;
