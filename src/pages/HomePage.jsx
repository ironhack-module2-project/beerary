import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";

const BASE_URL = "https://punkapi.online/v3";
const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

function HomePage(props) {
  const [randomBeer, setRandomBeer] = useState({});
  const [cellar, setCellar] = useState([]);
  const [loading, setLoading] = useState(true);

  // random beer api
  useEffect(() => {
    axios
      .get(`${BASE_URL}/beers/random`)
      .then((response) => {
        console.log(response.data);
        setRandomBeer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR on GET: ", error);
      });
  }, []);

  //Firebase api
  useEffect(() => {
    axios
      .get(`${API_URL}/beers.json`)
      .then((response) => {
        const data = response.data;
        if (data) {
          const formatted = Object.entries(data).map(([key, value]) => ({
            firebaseId: key,
            ...value,
          }));
          console.log(formatted);
          setCellar(formatted);
          setLoading(false);
        } else {
          setCellar([]);
          setLoading(false);
        }
      })
      .catch((error) => console.log("Error getting data from API_URL", error));
  }, []);

  if (loading)
    return (
      <span className="loading loading-spinner text-primary loading-xl"></span>
    );

  const fireBaseBeersIds = new Set(cellar.map((beer) => beer.id));

  return (
    <main>
      <div className="card w-100 bg-base-200 card-xl shadow-sm m-auto mb-5">
        <div className="card-body m-auto">
          <h2 className="card-title text-center">Welcome to the Birrioteca!</h2>
          <p>Discover Beers, collect them, Try them!</p>
          <Link to="/beers" className="justify-center card-actions">
            <button className="btn btn-secondary">More Beers</button>
          </Link>
        </div>
      </div>
      <h3 className="text-xl">Beer of the day</h3>
      <div className="flex justify-center">
        <div className="card w-96 p-5 bg-base-100 card-xs shadow-sm card-side glass">
          <figure>
            <img
              className="max-w-[200px] h-[394px]"
              src={`${BASE_URL}/images/${randomBeer.image}`}
              alt="beer"
            />
          </figure>
          {/* Eliminé la altura fija h-[394px] para que el contenido crezca */}
          <div className="card-body max-w-[200px] text-left">
            <h2 className="card-title text-xl">{randomBeer.name}</h2>
            <p className="max-h-[20px] italic text-base">
              {randomBeer.tagline}
            </p>
            <br />
            <p>{randomBeer.description}</p>
            <br />

            <div
              tabIndex={0}
              className="collapse bg-base-100 border border-base-300 max-w-[394px]"
            >
              <div className="collapse-title font-semibold">
                More Information
              </div>
              <div className="collapse-content text-left">
                <p>
                  <strong>Enjoy it more with:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {randomBeer.food_pairing?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <br />
                <p>
                  <strong>Brewer Tips:</strong>
                  <br />{" "}
                  {randomBeer.brewers_tips !== ""
                    ? randomBeer.brewers_tips
                    : "No brewer tips"}
                </p>
              </div>
            </div>

            <div className="justify-center card-actions">
              {!fireBaseBeersIds.has(randomBeer.id) && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    props.handleSubmit(randomBeer);
                    setCellar((prev) => [
                      ...prev,
                      { id: randomBeer.id, ...randomBeer },
                    ]);
                  }}
                >
                  Add Beer
                </button>
              )}
            </div>
            <Toast />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
