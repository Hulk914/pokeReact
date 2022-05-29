import { useState } from "react";
import "./App.css";
import DisplayPokemon from "./components/DisplayPokemon/DisplayPokemon";
import Search from "./components/Search/Search";


function App() {
  const [showList, setshowList] = useState(true);
  const changeView = (viewName) => {
    if (viewName === 'list') {
      setshowList(true);
    } else {
      setshowList(false);
    }
  }

  return (
    <div className="App">
      <Search setView={changeView} />
      {showList ? <DisplayPokemon /> : ''}
    </div>
  );
}

export default App;
