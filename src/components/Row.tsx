import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../css/Row.css";
import { API_KEY } from "../api/setting";
import Youtube from "react-youtube";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

const base_url: string = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const rowWidth = window.innerWidth;
  const playerWidth = rowWidth - 70;
  const playerHeight = playerWidth * 0.61;
  const opt: Options = {
    height: playerHeight.toString(),
    width: playerWidth.toString(),
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const trailerUrl = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        setTrailerUrl(trailerUrl.data.results[0]?.key);
      } catch {
        alert("Trailer not exists on YouTube.");
      }
    }
  };

  return (
    <div className="Row">
      <h2 className="Row-title">{title}</h2>
      <div className="Row-posters">
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opt} />}
    </div>
  );
};
