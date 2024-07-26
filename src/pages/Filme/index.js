import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadfilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "16c1e04c46e386aeb8e034d89df053f6",
            language: "pt-br",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("NOT FOUND");
        });
    }
    loadfilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [id]);

  if (loading) {
    return (
      <div className="filme-info">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <di className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h2>Sinopse</h2>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average}</strong>
    </di>
  );
}

export default Filme;
