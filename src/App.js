import { useState } from "react";
import "./App.css";
import DisplayPokemon from "./components/DisplayPokemon/DisplayPokemon";
import Search from "./components/Search/Search";
import { Routes, Route } from 'react-router-dom'


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const selectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log('pokemomn', pokemon);
  }

  return (
    <div className="App">
      <Search selectPokemon={selectPokemon} />
      <Routes>
        <Route path="/search-result" element={<SearchResult pokemon={selectedPokemon}></SearchResult>}></Route>
        <Route path="/" element={<DisplayPokemon />}></Route>
      </Routes>
    </div>
  );
}

function SearchResult({ pokemon }) {
  return (
    <>
      {pokemon && pokemon.name ? <div className="DisplayPokemon">
        <h1>{pokemon.name.toUpperCase()}</h1>
        <img src={pokemon.img} alt="" />
        <h4>Type : {pokemon.type}</h4>
        <h4>HP : {pokemon.hp}</h4>
        <h4>Attack : {pokemon.attack}</h4>
        <h4>Defense : {pokemon.defense}</h4>
      </div> : null}
    </>
  );
}

export default App;
