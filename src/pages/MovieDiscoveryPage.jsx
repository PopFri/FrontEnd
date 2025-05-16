import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import '../styles/discoveryFilm/MovieDiscoveryPage.css';
import DiscoveryMovie from '../components/discoveryFilm/DiscoveryMovie';
import DiscoveryResult from '../components/discoveryFilm/DiscoveryResult';
import '../styles/common.css'

const MovieDiscoveryPage = () => {
    const [result, setResult] = useState("search");
    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState(null);
    const [listName, setListName] = useState(null);
    const [movieCount, setMovieCount] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);

    useEffect(() => {
        fetch('/data/movieDiscoveryData.json')
            .then((response) => response.json())
            .then((data) => {
                const movieList = data.result.movies;
                const listName = data.result.list_name;
                setListName(listName);
                setMovieList(movieList);
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
            });
    }, []);

    useEffect(() => {
        if (movieList.length === 0) return; // 데이터 아직 없음
        if (movieCount >= movieList.length) {
            setResult("result");
            fetch('/data/movieDiscoveryResultData.json',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedMovies),
                })
                .then((response) => response.json())
                .then((data) => {
                    const resultList = data.result;
                    setResultList(resultList);
                })
                .catch((error) => {
                    console.error('Error fetching movie data:', error);
                });
        } else {
            setResult("search");
            const movie = movieList[movieCount];
            setMovie(movie);
        }
        console.log(selectedMovies);
    }, [movieCount, movieList.length]);

    const renderSerchOrResurt = (result) => {
        if (result === "search") {
            return <DiscoveryMovie movie={movie} listName={listName} setMovieCount={setMovieCount} setSelectedMovies={setSelectedMovies} />;
        } else {
            return <DiscoveryResult resultList={resultList} />;
        }
    }

    return (
        <div className="discovery-wrapper">
            <Header />
            <div className="discovery-title">
                Discovery Film
            </div>
            {renderSerchOrResurt(result)}
        </div>
    );
}
export default MovieDiscoveryPage;