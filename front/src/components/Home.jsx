import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideoGames, paginateGames } from "../redux/Actions/actions";
import "../stylesheets/Home.css";
import Cards from "./Cards";

const Home = () => {
  const dispatch = useDispatch();
  // const allGames = useSelector((state) => state.alLVideoGames);
  const paginate = (e) => {
    dispatch(paginateGames(e.target.name));
  };

  useEffect(() => {
    dispatch(getAllVideoGames());
  }, [dispatch]);

  return (
    <div>
      <Cards />
      <div className="paginateButtons">
        <button name="prev" onClick={paginate}>
          Prev
        </button>
        <button name="next" onClick={paginate}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
