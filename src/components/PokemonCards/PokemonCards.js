import React from "react";
import "./PokemonCards.css";

function PokemonCards({ name, image, type, hp, attack, defense }) {
  return (
    <>
      <div className="card">
        <div className="card__title">
        <h2>{name}</h2>
        </div>
        <div className="card__image">
            <img src={image} alt="name" />
        </div>
        <div className="card__body">
            <h4>Type: {type}</h4>
            <h4>HP: {hp}</h4>
            <h4>Attack: {attack}</h4>
            <h4>Defense: {defense}</h4>
        </div>
        
      </div>
    </>
  );
}

export default PokemonCards;
