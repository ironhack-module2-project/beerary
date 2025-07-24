function StarRating({ beerId, rating, max = 5 }) {
  return (
    <div className="rating">
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1;
        return (
          <input
            key={value}
            type="radio"
            name={`rating-${beerId}`}
            className="mask mask-star-2 bg-orange-400"
            aria-label={`${value} star`}
            checked={value === rating}
            readOnly
          />
        );
      })}
    </div>
  );
}

export default StarRating;
