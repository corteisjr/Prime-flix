import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadfilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "16c1e04c46e386aeb8e034d89df053f6",
          language: "pt-br",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
    }
    loadfilmes();
  }, []);
  return (
    <di className="container">
      <di className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </di>
    </di>
  );
}

export default Home;
