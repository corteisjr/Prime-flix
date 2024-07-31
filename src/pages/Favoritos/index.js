import { useEffect, useState } from "react";
import "./favoritos.css";
import { Link } from "react-router-dom";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const myFavorite = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(myFavorite) || []);
  }, []);

  function excluirFilmes(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="meus-filmes">
      <h1>Filmes Favoritos</h1>
      {filmes.length === 0 && (
        <span>Você não possui nenhum filme favorito :( !!</span>
      )}
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}> Ver detalhes</Link>
                <button onClick={() => excluirFilmes(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
