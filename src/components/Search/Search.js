import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"

const initialState = {
  name: "",
  img: "",
  hp: "",
  attack: "",
  defense: "",
  type: ""
};

function Search({ selectPokemon }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(initialState);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const showList = () => {
    setPokemon(initialState);
    selectPokemon(initialState);
    navigate('/');
  }

  const pokemonSearch = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      const pokemon = {
        name: pokemonName,
        img: result.sprites.other.dream_world.front_default,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        type: result.types[0].type.name
      };

      setPokemon(pokemon);
      selectPokemon(pokemon);
      navigate('/search-result');
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
          <button id="clear" onClick={showList}>
            Show List
          </button>
          {err && <h6>{err}</h6>}
        </div>
      </div>
    </>
  )
}

export default Search

//<button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>