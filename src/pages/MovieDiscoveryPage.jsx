import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import '../styles/discovery/MovieDiscoveryPage.css';
import DiscoveryMovie from '../components/discovery/DiscoveryMovie';
import DiscoveryResult from '../components/discovery/DiscoveryResult';
import '../styles/common.css'

const MovieDiscoveryPage = () => {
    const [result, setResult] = useState("search");
    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState(null);
    const [listName, setListName] = useState(null);
    const [movieCount, setMovieCount] = useState(0);

    useEffect(() => {
        fetch('data/movieDiscoveryData.json')
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
        } else {
            setResult("search");
            const movie = movieList[movieCount];
            setMovie(movie);
        }
    }, [movieCount, movieList.length]);

    const renderSerchOrResurt = (result) => {
        if (result === "search") {
            return <DiscoveryMovie movie={movie} listName={listName} setMovieCount={setMovieCount} />;
        } else {
            return <DiscoveryResult />;
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