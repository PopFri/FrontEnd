import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/discoveryFilm/MovieDiscoveryPage.css";
import DiscoveryMovie from "../components/discoveryFilm/DiscoveryMovie";
import DiscoveryResult from "../components/discoveryFilm/DiscoveryResult";
import "../styles/common.css";
import LoadingPage from "./LoadingPage";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const MovieDiscoveryPage = () => {
    const { trackPageView } = useMatomo();

    const [result, setResult] = useState("search");
    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState(null);
    const [listName, setListName] = useState(null);
    const [movieCount, setMovieCount] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loadUserData = async () => {
        try {
            const userRes = await fetch(`${Server_IP}/api/v1/user`, {
                method: "GET",
                credentials: "include",
            });
            const userData = await userRes.json();

            setUser(userData.result);
        } catch {
            navigate("/login");
        }
    };
    useEffect(() => {
        loadUserData();
        setIsLoading(true);
        const saved = localStorage.getItem("discoveryResult");
        if (saved) {
            const { resultList } = JSON.parse(saved);
            setResultList(resultList);
            setResult("result");
            setIsLoading(false);
            return;
        }
        fetch(`${Server_IP}/api/v1/movie/recom/discovery`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                const movieList = data.result.movies;
                const listName = data.result.date;
                setListName(listName);
                setMovieList(movieList);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movie data:", error);
            });
    }, []);

    useEffect(() => {
        if(user != null)
            trackPageView({
                customDimensions: [
                    {
                        id: 1,
                        value: null,
                    },
                    {
                        id: 2,
                        value: user != null ? user.birth : "null"
                    },
                    {
                        id: 3,
                        value: user != null ? user.gender : "null"
                    },
                ],
            });
    }, [user])
    useEffect(() => {
        if (movieList.length === 0) return;
        if (movieCount >= movieList.length) {
            setResult("result");
            fetch(`${Server_IP}/api/v1/movie/recom/user/discovery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedMovies),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    const resultList = data.result;
                    console.log("resultList", resultList);
                    setResultList(resultList);
                    localStorage.setItem(
                        "discoveryResult",
                        JSON.stringify({
                            resultList: resultList,
                        })
                    );
                })
                .catch((error) => {
                    console.error("Error fetching movie data:", error);
                });
        } else {
            setResult("search");
            const movie = movieList[movieCount];
            setMovie(movie);
        }
    }, [movieCount, movieList]);

    const renderSerchOrResult = (result) => {
        if (result === "search") {
            if (isLoading) {
                return <LoadingPage page={"movie"} />;
            }
            return (
                <DiscoveryMovie
                    movie={movie}
                    listName={listName}
                    setMovieCount={setMovieCount}
                    setSelectedMovies={setSelectedMovies}
                />
            );
        } else {
            return <DiscoveryResult resultList={resultList} />;
        }
    };

    return (
        <div className="discovery-wrapper">
            <Header user={user} />
            <div className="discovery-title">Discovery Film</div>
            {renderSerchOrResult(result)}
        </div>
    );
};
export default MovieDiscoveryPage;
