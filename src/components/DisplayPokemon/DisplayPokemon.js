import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination"
import PokemonCards from "../PokemonCards/PokemonCards"
import "./DisplayPokemon.css"

function DisplayPokemon() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  //const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await res.json();

    //setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line
  }, []);

  console.log(allPokemons.length);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPokemons.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="cards-container">
        {currentPosts.map((pokemonStats, index) => (
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
      <Pagination postsPerPage={postsPerPage} totalPosts={allPokemons.length}/>
    </>
  );
}

export default DisplayPokemon;
