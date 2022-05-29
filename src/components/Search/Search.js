import { useState, React } from 'react'
import "./Search.css"

function Search() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState({
      name : "",
      img : "",
      hp : "",
      attack : "",
      defense : "",
      type : ""});
    //const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
  
    const pokemonSearch = async () => {
      //setIsLoading(true);
  
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result = await response.json();
  
        console.log("result is: ", JSON.stringify(result, null, 4));
  
        setPokemon({
          name : pokemonName,
          img : result.sprites.other.dream_world.front_default,
          hp : result.stats[0].base_stat,
          attack : result.stats[1].base_stat,
          defense : result.stats[2].base_stat,
          type : result.types[0].type.name
        });
      } catch (err) {
        setErr(err.message);
      } 
    };

  return (
    <>
    <div className="Search">
        <div className="title">
          <h1>PokeDex</h1>
          <input
            type="text"
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
          />
          <button id="search" onClick={pokemonSearch}>
            Pokemon Search
          </button>
          {err && <h6>{err}</h6>}
        </div>
        <div className="DisplayPokemon">
          <h1>{pokemon.name.toUpperCase()}</h1>
          <img src={pokemon.img} alt=""/>
          <h4>Type : {pokemon.type}</h4>
          <h4>HP : {pokemon.hp}</h4>
          <h4>Attack : {pokemon.attack}</h4>
          <h4>Defense : {pokemon.defense}</h4>
        </div>
      </div>
    </>
  )
}

export default Search

//<button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>