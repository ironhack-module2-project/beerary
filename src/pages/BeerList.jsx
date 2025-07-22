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
              className={`join-item btn ${
                currentPage === pageNum ? "btn-primary" : ""
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

      {/* Pagination */}
      <div className="join">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`join-item btn ${
                currentPage === pageNum ? "btn-primary" : ""
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
