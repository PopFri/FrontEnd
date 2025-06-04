import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PosterSection from "../components/movieDetail/PosterSection";
import '../styles/movieDetail/MovieDetailPage.css';
import OverviewSection from '../components/movieDetail/OverviewSection';
import CreditsSection from '../components/movieDetail/CreditsSection';
import TrailerSection from '../components/movieDetail/TrailerSection';
import ImageSection from '../components/movieDetail/ImageSection';
import ReviewSection from '../components/movieDetail/ReviewSection';
import ReviewPagination from '../components/movieDetail/ReviewPagination';
import Header from '../components/Header'
import '../styles/common.css'
import LoadingPage from './LoadingPage';

const MovieDetailPage = () => {
    //movie
    const { movieId } = useParams();
    const [user, setUser] = useState(null);
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    //navigate
    const navigate = useNavigate();

    //posterSection
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState(null);
    const [directing, setDirecting] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [runtime, setRuntime] = useState(null);
    const [providers, setProviders] = useState(null);

    //overviewSection
    const [overView, setOverView] = useState(null);
    const [genres, setGenres] = useState(null);

    //creditsSection
    const [actorImages, setActorImages] = useState([]);
    const [actors, setActors] = useState([]);
    const [actorsCharacter, setActorsCharacter] = useState([]);

    //trailerSection
    const [videoId, setVideoIds] = useState([]);

    //imageSection
    const [image, setImage] = useState([]);

    //reviewSection
    const [review, setReview] = useState([]);
    const [totalReview, setTotalReveiw] = useState(0);

    //reviewPagination
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    //reviewPatch
    const [sort, setSort] = useState('recent'); // 'recent' 또는 'like'

    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = () => {
        const url = `${Server_IP}/api/v1/movie/review/${movieId}/${sort}/${page}`;
        fetch(url, {
            method: 'GET',
            credentials: "include" 
        })
            .then(res => res.json())
            .then(data => {
            setReview(data.result.reviews);
            setTotalReveiw(data.result.totalReview);
            setTotalPage(data.result.totalPage);
            })
            .catch(err => console.error('리뷰 불러오기 실패:', err));
    };

    const loadUserData = async () => {
        try {
            const userRes = await fetch(`${Server_IP}/api/v1/user`, {
            method: 'GET',
            credentials: 'include'
            });
            const userData = await userRes.json();
        
            setUser(userData.result);
        } catch {
            navigate('/login');
        }
    };

    useEffect(() => {
        const loadPage = async () => {
            try {
                await loadUserData(); // 로그인 정보 확인

                const res = await fetch(`${Server_IP}/api/v1/movie/${movieId}`, {
                    credentials: "include"
                });

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();

                const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

                // posterSection
                const backgroundImageUrl = baseImageUrl + data.result.backgroundImageUrl;
                const poster = baseImageUrl + data.result.imageUrl;
                const title = data.result.title;
                const directing = data.result.directing;
                const releaseDate = data.result.release_date;
                const runtime = data.result.runtime;
                const providers = data.result.providers;

                setBackgroundImageUrl(backgroundImageUrl);
                setImageUrl(poster);
                setTitle(title);
                setDirecting(directing);
                setReleaseDate(releaseDate);
                setRuntime(runtime);
                setProviders(providers);

                // overviewSection
                setOverView(data.result.overView);
                setGenres(data.result.genres);

                // creditsSection
                setActors(data.result.cast.map(actor => actor.name));
                setActorsCharacter(data.result.cast.map(actor => actor.character));
                setActorImages(data.result.cast.map(image => baseImageUrl + image.profile_path));

                // trailerSection
                setVideoIds(data.result.videos.map(video => video.key));

                // imageSection
                setImage(data.result.images.map(image => baseImageUrl + image.file_path));
                setIsLoading(false);
                await fetch(`${Server_IP}/api/v1/user/movie/visit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ movieId: movieId, movieName: title, imageUrl: data.result.imageUrl}),
                });

            } catch (error) {
                console.error('Error loading page:', error);
            }
        };

        loadPage();
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [page, sort]);

    return (
        <div className="movie-detail-wrapper">
            <Header user={user}/>
            {isLoading ? 
            (
            <LoadingPage /> 
        ): (
                <div>
                    <PosterSection backgroundImageUrl={backgroundImageUrl} imageUrl={imageUrl} title={title} directing={directing} releaseDate={releaseDate} runtime={runtime} providers={providers} />
                    <OverviewSection overView={overView} genres={genres} />
                    <CreditsSection  actors={actors} actorsCharacter={actorsCharacter} actorImages={actorImages} />
                    <TrailerSection videoId={videoId} />
                    <ImageSection image={image} />
                    <ReviewSection reviews={review} totalReview={totalReview} fetchReviews={fetchReviews} movieId={movieId} sort={sort} setSort={setSort} user={user} title={title} imageUrl={imageUrl}/>
                    <ReviewPagination page={page} setPage={setPage} totalPage={totalPage} />  
                </div>
            )
            }
        </div>
    );
}
export default MovieDetailPage;