import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { clearDetail, getDetailVideoGame } from "../redux/Actions/actions";
import "../stylesheets/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailVideoGame(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [id]);

  const genres = detail.genres;

  return (
    <div className="detailContainer">
      <div>
        <h1>{detail.name}</h1>
        <div>
          <img src={detail.image} alt={detail.name} />
          <div className="detailInfoContainer">
            <div className="detailId">
              {" "}
              <h3>ID</h3> <p>{detail.id}</p>
            </div>
            <div className="detailPlatforms">
              <h3>Platforms</h3> <p>{detail.platforms}</p>
            </div>
            <div className="detailGenres">
              <h3>Genres</h3>
              <div className="genresDetailMap">
                {genres?.map((genre) => {
                  return <p>{genre}</p>;
                })}
              </div>
            </div>
            <div className="detailRating">
              <h3>Rating </h3>
              <p>
                {detail.rating}
                <svg
                  stroke="currentColor"
                  fill="#FFD700"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                </svg>
              </p>
            </div>
            <div className="detailReleased">
              <h3>Released</h3> <p>{detail.released}</p>
            </div>
            <div className="descriptionContainer">
              <h3>Description</h3>
              <p className="description">{detail.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
