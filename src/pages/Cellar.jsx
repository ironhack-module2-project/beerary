import axios from "axios";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

const API_URL = "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";
const BASE_URL = "https://punkapi.online/v3";

const showToastDelete = () => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "alert alert-error";
  toast.innerHTML = "<span>Beer Deleted</span>";

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

function Cellar() {
  const [cellar, setCellar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalBeer, setModalBeer] = useState({})


  const handleDelete = (id) => {

    axios
      .delete(`${API_URL}/beers/${id}.json`)
      .then(() => {
        console.log("succes on Delete")
        axios
          .get(`${API_URL}/beers.json`)
          .then((response) => {
            const data = response.data;
            if (data) {
              const formatted = Object.entries(data).map(([key, value]) => ({
                firebaseId: key,
                ...value,
              }));
              console.log(formatted)
              setCellar(formatted);
              setLoading(false)
            } else {
              setCellar([])
              setLoading(false)
            }
            showToastDelete();
          })
          .catch((error) =>
            console.log("Error getting data from API_URL", error)
          );
      })
      .catch((error) => console.log("ERROR on DELETE element", error))

  }

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
          console.log(formatted)
          setCellar(formatted);
          setLoading(false)
        } else {
          setCellar([])
          setLoading(false)
        }
      })
      .catch((error) =>
        console.log("Error getting data from API_URL", error)
      );
  }, []);

  const openModal = (beer) => {
    setModalBeer(beer);
    document.getElementById("my_modal_3").showModal();
  };

  if (loading)
    return (
      <span className="loading loading-spinner text-primary loading-xl"></span>

    );




  return (
    <div className="flex justify-center">
      <div className="carousel carousel-vertical rounded-box h-[32rem] overflow-y-auto w-full max-w-md p-2">

        {cellar.length === 0 && <p className="text-white p-4">NO BEERS STORED</p>}
        {cellar && cellar.map((beer) => (
          <div key={beer.id} className="carousel-item mb-4 ">
            <div className="glass flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-base-200 rounded-lg w-full shadow-md">
              <img
                src={`${BASE_URL}/images/${beer.image}`}
                alt={beer.name}
                className="w-24 h-24 object-contain rounded"
              />
              <div className="flex flex-col text-center sm:text-left">
                <h2 className="text-lg font-bold">{beer.name}</h2>
                <p className="italic text-sm text-gray-400">{beer.tagline}</p>
                <button className="btn btn-primary btn-sm mt-2 self-center sm:self-start" onClick={() => openModal(beer)}>
                  Show More
                </button>
                <button className="btn btn-secondary btn-sm mt-2 self-center sm:self-start" onClick={() => handleDelete(beer.firebaseId)}>Delete</button>
              </div>
            </div>

          </div>
        ))
        }
      </div>
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
      <Toast/>
        
    </div>
  );
}

export default Cellar;
