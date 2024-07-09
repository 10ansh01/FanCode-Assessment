import React, { useEffect, useState, useCallback } from "react";
import styles from "./MovieCard.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../../utilityComponents/Modal";

interface MovieCardTypes {
  title: string;
  genreIds: number[];
  movieId: number;
  overview: string;
  backdropPath: string;
  withModalVariation?: boolean;
}

const MovieCard: React.FC<MovieCardTypes> = ({
  title,
  genreIds,
  movieId,
  overview,
  backdropPath,
  withModalVariation,
}) => {
  const [cast, setCast] = useState<any[]>([]);
  const [director, setDirector] = useState<string | undefined>();
  const genres = useSelector((state: any) => state.genres);

  const fetchCast = useCallback(async (id: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          params: {
            api_key: "2dca580c2a14b55200e784d157207b4d",
          },
        }
      );

      const directorInfo = response.data.crew.find(
        (member: any) => member.job === "Director"
      );

      setDirector(directorInfo?.name);
      setCast(response.data.cast);
    } catch (error) {
      console.error("Error fetching cast data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCast(movieId);
  }, [movieId, fetchCast]);

  const getGenreNames = () => {
    return genreIds
      .map((id) => genres.find((genre: any) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const renderCast = () => {
    if (cast.length === 0) return null;

    return (
      <>
        {cast.slice(0, 2).map((actor) => (
          <div key={actor.id} className={styles.actorName}>
            {actor.name}
          </div>
        ))}
        {cast.length > 2 && (
          <div key="remaining" className={styles.remainingCastCount}>
            +{cast.length - 2} {cast.length - 2 === 1 ? "other" : "others"}
          </div>
        )}
      </>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={styles.movieCard}
      style={{
        backgroundImage: backdropPath
          ? `url(https://image.tmdb.org/t/p/original${backdropPath})`
          : undefined,
      }}
    >
      {withModalVariation ? (
        <div className={styles.movieCardContent}>
          <p style={{ margin: 0, fontWeight: 600 }}>{title}</p>
          <div className={styles.director}> Director: {director}</div>
          <button
            className={styles.movieDetailModalTrigger}
            onClick={openModal}
          >
            See more &#8594;
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            backdrop={backdropPath}
            title={title}
          >
            <p>
              <b>Description:</b> {overview}
            </p>
            <p>
              <b>Genres:</b> {getGenreNames()}
            </p>
            <div className={styles.cast}>
              {" "}
              <b>Cast:</b> {renderCast()}
            </div>
            <div className={styles.director}>
              {" "}
              <b>Director:</b> {director}
            </div>
          </Modal>
        </div>
      ) : (
        <div className={styles.movieCardContent}>
          <p>{title}</p>
          <p>Description: {overview}</p>
          <p>Genres: {getGenreNames()}</p>
          <div className={styles.cast}>Cast: {renderCast()}</div>
          <div className={styles.director}> Director: {director}</div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
