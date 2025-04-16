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

const MovieDetailPage = () => {
    //movie
    const { id } = useParams();

    //navigate
    const navigate = useNavigate();

    //token
    const token = localStorage.getItem('token');

    //posterSection
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [runtime, setRuntime] = useState(null);
    const [providers, setProviders] = useState(null);

    //overviewSection
    const [overView, setOverView] = useState(null);
    const [genres, setGenres] = useState(null);

    //creditsSection
    const [actorImages, setActorImages] = useState([]);
    const [actors, setActors] = useState([]);

    //trailerSection
    const [videoId, setVideoIds] = useState([]);

    //imageSection
    const [image, setImage] = useState([]);

    //reviewSection
    const [review, setReview] = useState([]);

    //reviewPagination
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);

    useEffect(() => {
        // if (!token) {
        //     alert('로그인이 필요합니다.');
        //     navigate('/login');
        // }
      
        fetch('/data/movieDetailData.json')
            .then(res => res.json())
            .then(data => {
                const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

                //posterSection
                const backgroundImageUrl = baseImageUrl + data.result.backgroundImageUrl;
                const poster = baseImageUrl + data.result.imageUrl;
                const title = data.result.title;
                const releaseDate = data.result.release_date;
                const runtime = data.result.runtime;
                const providers = data.result.providers;
                setProviders(providers); // 상태 업데이트
                setTitle(title); // 상태 업데이트
                setReleaseDate(releaseDate); // 상태 업데이트
                setRuntime(runtime); // 상태 업데이트
                setBackgroundImageUrl(backgroundImageUrl); // 상태 업데이트
                setImageUrl(poster); // 상태 업데이트
                setProviders(providers);

                //overviewSection
                const overView = data.result.overView;
                const genres = data.result.genres;
                setOverView(overView); // 상태 업데이트
                setGenres(genres); // 상태 업데이트

                // creditsSection
                const actors = data.result.cast.slice(0, 5).map(actor => actor.name);
                const actorImages = data.result.cast.slice(0, 5).map(image => baseImageUrl + image.profile_path);
                setActorImages(actorImages);
                setActors(actors);

                // trailerSection
                const videoId = data.result.videos.slice(0, 2).map(video => video.key);
                setVideoIds(videoId);

                // imageSection
                const image = data.result.images.slice(0, 6).map(image => baseImageUrl + image.file_path);
                setImage(image);

                // reviewSection
                const review = data.result.review;
                setReview(review);

        })
        .catch(err => {
            console.error('Error fetching movie details:', err);
        });

        fetch('/data/movieReviewData.json' /* {page} */)
            .then(res => res.json())
            .then(data => {
                // reviewSection
                const review = data.result.review;
                setReview(review);

        })
        .catch(err => {
            console.error('Error fetching review list:', err);
        });
        }, []);

    return (
        <div className="movie-detail-wrapper">
            <PosterSection backgroundImageUrl={backgroundImageUrl} imageUrl={imageUrl} title={title} releaseDate={releaseDate} runtime={runtime} providers={providers} />
            <OverviewSection overView={overView} genres={genres} />
            <CreditsSection  actors={actors} actorImages={actorImages} />
            <TrailerSection videoId={videoId} />
            <ImageSection image={image} />
            <ReviewSection reviews={review} />
            <ReviewPagination page={page} setPage={setPage} hasNext={hasNext} />  
        </div>
    );
}
export default MovieDetailPage;