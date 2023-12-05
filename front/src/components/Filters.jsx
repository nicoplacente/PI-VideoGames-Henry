import "../stylesheets/Filters.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabeticalOrder,
  fiterVideoGames,
  getAllGenres,
  getAllVideoGames,
  getCreated,
  getUnCreated,
  ratingOrder,
} from "../redux/Actions/actions";

const Filters = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const handleFilter = (e) => {
    dispatch(fiterVideoGames(e.target.value));
  };

  const handleCreatedButton = () => {
    dispatch(getCreated());
  };
  const handleUnCreatedButton = () => {
    dispatch(getUnCreated());
  };

  const handleAllGames = () => {
    dispatch(getAllVideoGames());
  };

  const handleSort = (e) => {
    dispatch(alphabeticalOrder(e.target.value));
  };

  const ratingHandler = (e) => {
    dispatch(ratingOrder(e.target.value));
  };
  return (
    <div className="filtersContainer">
      <div>
        <h4>Filters</h4>
        <div>
          <button value="created" onClick={handleCreatedButton}>
            Created
          </button>
        </div>

        <div>
          <button value="uncreated" onClick={handleUnCreatedButton}>
            Uncreated
          </button>
        </div>

        <div>
          <button value="AllGames" onClick={handleAllGames}>
            All Games
          </button>
        </div>

        <div>
          <select name="rating" placeholder="Rating" onChange={ratingHandler}>
            <option value="">Sort by rating</option>
            <option value="Falling">5➡0</option>
            <option value="Upward">0➡5</option>
          </select>
        </div>

        <div>
          <select
            name="alphabetical"
            placeholder="Alphabetical"
            onChange={handleSort}
          >
            <option value="">Sort by name</option>
            <option value="Fall">Z-A</option>
            <option value="Up">A-Z</option>
          </select>
        </div>

        <div>
          <select name="select2" placeholder="Gender" onChange={handleFilter}>
            <option>Genre selection</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
