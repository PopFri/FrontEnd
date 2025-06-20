import React from 'react';
import '../../styles/discoveryFilm/DiscoveryMovie.css';
import YouTube from 'react-youtube';

const DiscoveryMovie = ({movie, listName, setMovieCount, setSelectedMovies}) => {
    const toggleMovie = (movie) => {
        setSelectedMovies((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            return exists
                ? prev.filter((m) => m.id !== movie.id)
                : [...prev, movie];
        });
    };

    const handleBadButtonClick = () => {
        setMovieCount((prevCount) => prevCount + 1);
    }
    const handleSkipButtonClick = () => {
        setMovieCount((prevCount) => prevCount + 1);
    }
    const handleGoodButtonClick = () => {
        setMovieCount((prevCount) => prevCount + 1);
    }

    return (
        <div className="discovery-movie-wrapper">
            <div className="discovery-list-name">
                <span className="discovery-list-name-text">{listName}</span>
            </div>
            <div className="discovery-trailer-wrapper">
                <YouTube
                    videoId={movie?.videos[0]?.key} // 비디오 ID
                    className="discovery-video"
                    opts={{
                        height: '386.1',
                        width: '685.57',
                        playerVars: {
                            autoplay: 0,
                            controls: 1,
                            modestbranding: 1,
                            showinfo: 0,
                            rel: 0,
                        },
                    }}
                />
            </div>
            <div className="discovery-image-wrapper">
                <img
                    className="discovery-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie?.imageUrl}`}
                    alt={movie?.title}
                />
                <div className="discovery-image-container">
                    <p className="discovery-image-title">주요 장면</p>
                    <div className="discovery-image-list">
                        {movie?.images?.slice(0, 8).map((image, index) => (
                        <img
                            key={index}
                            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                            alt={`movie-image-${index}`}
                            className="discovery-image"
                        />
                        ))}

                        {Array.from({ length: 8 - (movie?.images?.length || 0) })
                        .slice(0, 8)
                        .map((_, index) => (
                            <div key={`empty-${index}`} className="discovery-image empty-image" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="discovery-movieinfo-wrapper">
                <div className="discovery-movie-title">
                    {movie?.title}
                </div>
                <div className="discovery-overview">
                    {movie?.overView}
                </div>
                <div className="discovery-movie-genres">
                    {movie?.genres?.map((genre, index) => (
                        <span key={index} className="discovery-genre">
                            #{genre.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="button-panel">
                <div className="button-container">
                    <button className="side-button bad-button" onClick={handleBadButtonClick}>
                        <span className="button-text">Bad</span>
                    </button>
                </div>
                <div className="button-container">
                    <button className="side-button skip-button" onClick={handleSkipButtonClick}>
                        <span className="button-text">Skip</span>
                    </button>
                </div>
                <div className="button-container">
                    <button
                        className="side-button good-button"
                        onClick={() => {
                            toggleMovie({ id: movie.movieId, name: movie.title, imageUrl: movie.imageUrl });
                            handleGoodButtonClick();
                        }}
                    >
                        <span className="button-text">Good</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DiscoveryMovie;