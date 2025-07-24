import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

function EditBeer() {
  const [beer, setBeer] = useState({});
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const { beerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/beers/${beerId}.json`)
      .then((response) => {
        setBeer(response.data);
        setRating(+response.data.rating);
        setReview(response.data.review);
      })
      .catch((error) => console.log("Error on Get beer: ", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDetails = {
      ...beer,
      rating: +rating,
      review: review,
    };

    axios
      .put(`${API_URL}/beers/${beerId}.json`, newDetails)
      .then((response) => {
        navigate("/cellar");
      })
      .catch((error) => console.log("ERROR updating beer: ", error));
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl">Rate Beer</legend>

          <label className="label">Your Rating</label>
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRating(e.target.value)}
          />

          <label className="label">Your Review</label>
          <textarea
            className="textarea h-24"
            placeholder="it was awesome!!"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button className="btn btn-accent m-4">Rate it!</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditBeer;
