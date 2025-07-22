import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";
const BASE_URL = "https://punkapi.online/v3";

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
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{modalBeer.name}</h3>
          <figure className="text-center">
            <img
              className="max-w-[200px] h-[394px]"
              src={`${BASE_URL}/images/${modalBeer.image}`}
              alt="beer"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title text-xl">{modalBeer.name}</h2>
            <p className="max-h-[20px] italic text-base">{modalBeer.tagline}</p>
            <br />
            <p>{modalBeer.description}</p>
            <br />
          </div>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>

    </div>
  );
}

export default Cellar;
