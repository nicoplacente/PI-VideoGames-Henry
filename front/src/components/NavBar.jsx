import "../stylesheets/NavBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../redux/Actions/actions";

const NavBar = ({ handleSideBar, handleToggleClick }) => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [errors, setErrors] = useState("");

  const inputChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getGameByName(searchName));
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   dispatch(getGameByName(searchName)).catch((error) => {
  //     setErrors(error.message);
  //   });
  // };
  return (
    <nav className="navContainer">
      <button
        className="sideBar"
        onClick={() => {
          handleToggleClick();
          handleSideBar();
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 12 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
          ></path>
        </svg>
      </button>
      <form className="searchContainer">
        <input
          type="search"
          placeholder="Search game..."
          className="search"
          onChange={inputChange}
        />
        <button onClick={handleSearch} className="searchButton">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
