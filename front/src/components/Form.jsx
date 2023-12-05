import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllGenres } from "../redux/Actions/actions";
import Validation from "../validation";
import axios from "axios";
import "../stylesheets/Form.css";

//* componente con las opciones para crear un juego nuevo y guardarlo en la DB
const Form = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);
  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: "",
    genres: [],
    image: "",
    released: "",
    rating: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    genres: [],
    image: "",
    released: "",
    rating: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property === "genres") {
      const genreName = event.target.value;
      if (form.genres.includes(genreName)) {
        const updatedGenres = form.genres.filter(
          (genre) => genre !== genreName
        );
        setForm({
          ...form,
          genres: updatedGenres,
        });
      } else {
        setForm({
          ...form,
          genres: [...form.genres, genreName],
        });
      }
      return;
    } else {
      setForm({
        ...form,
        [property]: value,
      });
    }
    setErrors(
      Validation({
        ...form,
        [property]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationForm = Validation(form);
    setErrors(validationForm);
    const hasErrors = Object.values(validationForm).some((error) => !!error);
    if (!hasErrors) {
      axios
        .post("http://localhost:3001/videogames", form)
        .then((response) => alert("Successfully created"))
        .catch((error) => alert("Error creating video game"));
    } else {
      alert("There are errors in the form. Cannot submit");
    }
  };
  return (
    <div className="formContainer">
      <div>
        <h1>Videogame Registration</h1>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="createGameForm"
        >
          <div>
            <div>
              <input
                value={form.name}
                type="text"
                name="name"
                autoComplete="name"
                onChange={changeHandler}
                placeHolder="Name"
              ></input>
            </div>
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <div>
              <input
                value={form.platforms}
                type="text"
                name="platforms"
                onChange={changeHandler}
                placeHolder="Platforms"
              ></input>
            </div>
            {errors.platforms && <p>{errors.platforms}</p>}
          </div>

          <div>
            <div>
              <select
                value={form.genres}
                name="genres"
                multiple
                onChange={changeHandler}
              >
                <option className="optionGenres" value="">
                  Genres
                </option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.genres && <p>{errors.genres}</p>}
          </div>

          <div>
            <div>
              <input
                value={form.rating}
                type="number"
                name="rating"
                step="0.1"
                onChange={changeHandler}
                placeHolder="Rating"
              ></input>
            </div>
            {errors.rating && <p>{errors.rating}</p>}
          </div>

          <div>
            <div>
              <input
                value={form.image}
                type="text"
                name="image"
                placeholder="Enter Image URL"
                onChange={changeHandler}
              />
            </div>
            {errors.image && <p>{errors.image}</p>}
          </div>

          <div c>
            <div>
              <input
                value={form.released}
                type="date"
                name="released"
                autoComplete="off"
                onChange={changeHandler}
              ></input>
            </div>
            {errors.released && <p>{errors.released}</p>}
          </div>

          <div>
            <div>
              <textarea
                value={form.description}
                name="description"
                rows="4"
                onChange={changeHandler}
                placeHolder="Description..."
              ></textarea>
            </div>
            {errors.description && <p>{errors.description}</p>}
          </div>
          <button className="createGameButton">Create Game</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
