import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filmes-info.css";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          navigate("/", { replace: true });
          return;
        });
    }
    loadfilmes();

    return () => {
      console.log("COMPONENTE FOI DESMONTADO");
    };
  }, [id, navigate]);

  function handleSave() {
    const favoriteMovies = localStorage.getItem("@primeflix");
    let savedFilms = JSON.parse(favoriteMovies) || [];

    const hasFilm = savedFilms.some((savedFilm) => savedFilm.id === filme.id);

    if (hasFilm) {
      toast.warn("Este filme já está na lista!!");
      return;
    }

    savedFilms.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(savedFilms));
    toast.success("Filme salvo com sucesso!!");
  }

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

      <div className="area-buttons">
        <button onClick={handleSave}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
            target="_blank"
            rel="noreferrer"
          >
            Ver trailer
          </a>
        </button>
      </div>
    </di>
  );
}

export default Filme;
