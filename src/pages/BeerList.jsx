import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

const BASE_URL = "https://punkapi.online/v3";
const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

function BeerList(props) {
  const [beers, setBeers] = useState([]);
  const [cellar, setCellar] = useState([]);
  const totalPages = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalBeer, setModalBeer] = useState({});
  const [loading, setLoading] = useState(true);

  // Beers api
  useEffect(() => {
    axios
      .get(`${BASE_URL}/beers?page=1`)
      .then((response) => {
        const beersArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        console.log(beersArr);
        setBeers(beersArr);
        setLoading(false);
      })
      .catch((error) => console.log("ERROR on GET of list: ", error));
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

  const handlePageClick = (page) => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/beers?page=${page}`)
      .then((response) => {
        const beersArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        console.log(beersArr);
        setBeers(beersArr);
        setLoading(false);
      })
      .catch((error) => console.log("Error on GET new page: ", error));

    setCurrentPage(page);
  };

  const openModal = (beer) => {
    setModalBeer(beer);
    document.getElementById("my_modal_3").showModal();
  };

  if (loading)
    return (
      <span className="loading loading-spinner text-primary loading-xl"></span>
    );

  const fireBaseBeersIds = new Set(cellar.map((beer) => beer.id));

  return (
    <div>
      <h2 className="text-4xl p-4 m-4">List of beers</h2>
      {/* Pagination */}
      <div className="join">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`join-item btn ${currentPage === pageNum ? "btn-primary" : ""
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      {/* grid of beers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {beers.map((beer) => {
          return (
            <div key={beer.id} className="card bg-base-100 shadow-xl glass">
              <figure className="max-h-48 overflow-hidden">
                <img src={`${BASE_URL}/images/${beer.image}`} alt="beer" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{beer.name}</h2>
                <p>{beer.tagline}</p>
                <div className="card-actions justify-center">
                  {!fireBaseBeersIds.has(beer.id) && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        props.handleSubmit(beer);
                        setCellar((prev) => [
                          ...prev,
                          { id: beer.id, ...beer },
                        ]);
                      }}
                    >
                      Add Beer
                    </button>
                  )}
                  <button
                    className="btn btn-secondary"
                    onClick={() => openModal(beer)}
                  >
                    More Details
                  </button>
                </div>
              </div>
              <Toast />
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-4">{modalBeer.name}</h3>

          {/* Imagen + Descripción */}
          <div className="flex flex-col sm:flex-row gap-6">
            <figure className="flex-shrink-0 text-center">
              <img
                className="max-w-[200px] h-[394px] object-contain mx-auto"
                src={`${BASE_URL}/images/${modalBeer.image}`}
                alt={modalBeer.name}
              />
            </figure>
            <div className="card-body text-left mt-6">
              <p className="italic text-base">{modalBeer.tagline}</p>
              <br />
              <p>{modalBeer.description}</p>
            </div>
          </div>

          {/* Acordeones */}
          <div className="join join-vertical mt-6">

            {/* Food Pairing Accordion */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="beer-accordion" defaultChecked />
              <div className="collapse-title font-semibold">🍽️ Enjoy it more with...</div>
              <div className="collapse-content text-sm text-gray-300 text-left">
                <ul className="list-disc list-inside ml-4">
                  {modalBeer.food_pairing?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* More Info Accordion */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="beer-accordion" />
              <div className="collapse-title font-semibold">📊 More Info</div>
              <div className="collapse-content text-sm text-gray-300 whitespace-pre-line text-left space-y-6">

                {/* Stats */}
                <div>
                  <h4 className="font-semibold text-base">Stats</h4>
                  <ul className="list-disc list-inside ml-4">
                    <li>ABV: {modalBeer.abv}%</li>
                    <li>IBU: {modalBeer.ibu}</li>
                    <li>EBC: {modalBeer.ebc}</li>
                    <li>SRM: {modalBeer.srm}</li>
                    <li>pH: {modalBeer.ph}</li>
                    <li>Attenuation Level: {modalBeer.attenuation_level}</li>
                    <li>Target FG: {modalBeer.target_fg}</li>
                    <li>Target OG: {modalBeer.target_og}</li>
                    <li>Volume: {modalBeer.volume?.value} {modalBeer.volume?.unit}</li>
                    <li>Boil Volume: {modalBeer.boil_volume?.value} {modalBeer.boil_volume?.unit}</li>
                    <li>First Brewed: {modalBeer.first_brewed}</li>
                  </ul>
                </div>

                {/* Brewer's Tips */}
                {modalBeer.brewers_tips && (
                  <div>
                    <h4 className="font-semibold text-base">Brewer’s Tips</h4>
                    <p className="ml-4">{modalBeer.brewers_tips}</p>
                  </div>
                )}

                {/* Method */}
                <div>
                  <h4 className="font-semibold text-base">Method</h4>
                  <p className="ml-4">
                    <strong>Fermentation Temp:</strong> {modalBeer.method?.fermentation?.temp?.value}°{modalBeer.method?.fermentation?.temp?.unit}
                  </p>
                  <h5 className="font-medium ml-4 mt-2">Mash Temps:</h5>
                  <ul className="list-disc list-inside ml-8">
                    {modalBeer.method?.mash_temp?.map((step, i) => (
                      <li key={i}>
                        {step.temp?.value}°{step.temp?.unit}, {step.duration ?? "unknown"} min
                      </li>
                    ))}
                  </ul>
                  {modalBeer.method?.twist && (
                    <p className="ml-4 mt-2"><strong>Twist:</strong> {modalBeer.method.twist}</p>
                  )}
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-base">Ingredients</h4>
                  <p className="ml-4"><strong>Yeast:</strong> {modalBeer.ingredients?.yeast}</p>

                  <h5 className="font-medium ml-4 mt-2">Malt:</h5>
                  <ul className="list-disc list-inside ml-8">
                    {modalBeer.ingredients?.malt?.map((m, i) => (
                      <li key={i}>{m.name} - {m.amount?.value} {m.amount?.unit}</li>
                    ))}
                  </ul>

                  <h5 className="font-medium ml-4 mt-2">Hops:</h5>
                  <ul className="list-disc list-inside ml-8">
                    {modalBeer.ingredients?.hops?.map((h, i) => (
                      <li key={i}>
                        {h.name} ({h.amount?.value} {h.amount?.unit}) - add: {h.add}, attribute: {h.attribute}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contributed by */}
                {modalBeer.contributed_by && (
                  <div>
                    <h4 className="font-semibold text-base">Contributed by</h4>
                    <p className="ml-4">{modalBeer.contributed_by}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="py-4 text-sm text-center text-gray-400">Press ESC or ✕ to close</p>
        </div>
      </dialog>

      {/* Pagination */}
      <div className="join">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`join-item btn ${currentPage === pageNum ? "btn-primary" : ""
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BeerList;
