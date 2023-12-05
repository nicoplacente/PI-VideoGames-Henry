import "../stylesheets/Landing.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [keyPress, setKeyPress] = useState(false);
  const handleKeyPress = () => {
    setKeyPress(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleKeyPress);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div className="containerLanding">
      {keyPress ? navigate("/home") : ""}
      <div className="slider">
        <ul>
          <li>
            <img
              src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/kh/KHDZ1QE7U7EY1666055554463.jpg"
              alt="call of duty"
            />
          </li>
          <li>
            <img
              src="https://store-images.s-microsoft.com/image/apps.3117.14492969036550054.5a1d40f5-fe0d-427a-bd14-9a9ed15a423c.f601beb2-973f-47de-ad1a-ccec296ee4d1?q=90&w=480&h=270"
              alt="gta 5"
            />
          </li>
          <li>
            <img
              src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/02/guia-todos-trucos-consejos-minecraft.jpg?tf=3840x"
              alt="minecraft"
            />
          </li>
          <li>
            <img
              src="https://phantom-marca.unidadeditorial.es/04d687a87115211d9a759c74116d5826/resize/828/f/jpg/assets/multimedia/imagenes/2023/03/17/16790510953870.jpg"
              alt="csgo"
            />
          </li>
          <li>
            <img
              src="https://store-images.s-microsoft.com/image/apps.3774.63922543011545658.b811c016-7bf5-44e1-8dbe-39de98149fe7.eda087ef-0645-4040-b8bf-bbd3fed4d29a?q=90&w=480&h=270"
              alt="need for speed"
            />
          </li>
        </ul>
      </div>
      <header className="headerLanding">
        <h1>VideoGames</h1>
        <p className="keyLanding">Press any key to continue</p>
      </header>
    </div>
  );
};

export default Landing;
