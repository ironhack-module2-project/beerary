import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://punkapi.online/v3";

function BeerList() {
  const [beers, setBeers] = useState([]);
  const totalPages = 14;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return (
      <span className="loading loading-spinner text-primary loading-xl"></span>
    );

  return (
    <div>
      <h2 className="text-4xl p-4">List of beers</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {beers.map((beer) => {
          return (
            <div key={beer.id} className="card bg-base-100 shadow-xl">
              <figure className="max-h-48 overflow-hidden">
                <img src={`${BASE_URL}/images/${beer.image}`} alt="beer" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{beer.name}</h2>
                <p>{beer.tagline}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Add Beer</button>
                  <button className="btn btn-secondary">More details</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
