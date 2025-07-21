import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://punkapi.online/v3";

function HomePage() {
  const [randomBeer, setRandomBeer] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/beers/random`)
      .then((response) => {
        console.log(response.data);
        setRandomBeer(response.data);
      })
      .catch((error) => {
        console.log("ERROR on GET: ", error);
      });
  }, []);

  return (
    <main>
      <h3>Beer of the day</h3>
      <div className="flex justify-center">
        <div className="card w-96 bg-base-100 card-xs shadow-sm card-side">
          <figure>
            <img src={`${BASE_URL}/images/${randomBeer.image}`} alt="beer" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Name:{randomBeer.name}</h2>
            <p>Tagline: {randomBeer.tagline}</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">Add Beer</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default HomePage;
