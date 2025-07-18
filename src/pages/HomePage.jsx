import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://punkapi.online/v3";

function HomePage() {
  const [randomBeer, setRandomBeer] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/beers/random`)
      .then((response) => {
        setRandomBeer(response.data);
      })
      .catch((error) => {
        console.log("ERROR on GET: ", error);
      });
  }, []);

  const addZeros = (beerId) => {
    let modifiedId = beerId;
    if (beerId <= 9) {
      modifiedId = `00${beerId}`;
    } else if (beerId <= 99) {
      modifiedId = `0${beerId}`;
    }

    return modifiedId;
  };

  return (
    <main>
      <h2>This is the home page</h2>
      <div className="flex justify-center">
        <div className="card w-96 bg-base-100 card-xs shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{randomBeer.name}</h2>
            <h2 className="card-title">ID: {randomBeer.id}</h2>
            {}
            <img src={`${BASE_URL}/images/${randomBeer.image}`} alt="" />
            <p>{randomBeer.tagline}</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
