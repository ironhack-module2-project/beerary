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
            <img
              className="max-w-[200px] h-[394px]"
              src={`${BASE_URL}/images/${randomBeer.image}`}
              alt="beer"
            />
          </figure>
          {/* Eliminé la altura fija h-[394px] para que el contenido crezca */}
          <div className="card-body max-w-[200px] text-left">
            <h2 className="card-title text-xl">{randomBeer.name}</h2>
            <p className="max-h-[20px] italic text-base">{randomBeer.tagline}</p>
            <br />
            <p>{randomBeer.description}</p>
            <br />

            <div
              tabIndex={0}
              className="collapse bg-base-100 border border-base-300 max-w-[394px]"
            >
              <div className="collapse-title font-semibold">More Information</div>
              <div className="collapse-content text-left">
                <p><strong>Enjoy it more with:</strong></p>
                <ul className="list-disc list-inside">
                  {randomBeer.food_pairing?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <br />
                <p><strong>Brewer Tips:</strong> {randomBeer.brewer_tips}</p>
              </div>
            </div>

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
