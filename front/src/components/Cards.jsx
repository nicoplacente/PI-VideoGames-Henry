import Card from "./Card";
import "../stylesheets/Cards.css";
import { useSelector } from "react-redux";

const Cards = () => {
  const videoGames = useSelector((state) => state.videoGames);
  return (
    <div className="cardsContainer">
      {videoGames?.map((game) => (
        <Card
          id={game.id}
          key={game.id}
          name={game.name}
          platforms={game.platforms}
          genres={game.genres}
          image={game.image}
          released={game.released}
          rating={game.rating}
        />
      ))}
    </div>
  );
};

export default Cards;
