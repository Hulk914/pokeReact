import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination"
import PokemonCards from "../PokemonCards/PokemonCards"
import "./DisplayPokemon.css"

function DisplayPokemon() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  //const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')

  const changePage = (pageNo) => {
    console.log('in change page', pageNo);
    getAllPokemons((pageNo - 1) * 10);
  }

  const getAllPokemons = async (offset = 0) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
    const data = await res.json();

    console.log('response data', data);

    async function createPokemonObject(results) {
      const pokemonDetailList = await Promise.all(
        results.map(async (pokemon) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          return await res.json();
        })
      );
      console.log('poke details list', pokemonDetailList);
      setAllPokemons(pokemonDetailList);
    }
    createPokemonObject(data.results);
    setTotalCount(data.count);
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="cards-container">
        {allPokemons.map((pokemonStats, index) => (
          <PokemonCards
            key={index}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name.toUpperCase()}
            type={pokemonStats.types[0].type.name}
            hp={pokemonStats.stats[0].base_stat}
            attack={pokemonStats.stats[1].base_stat}
            defense={pokemonStats.stats[2].base_stat}
          />
        ))}
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts={totalCount} paginate={changePage} />
    </>
  );
}

export default DisplayPokemon;
