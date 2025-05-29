import React, { useState, useEffect } from 'react'
import resultBackImgsrc from "/images/recReviewBackground.png";
import likeImgsrc from "/images/likeIcon.png";
import btnCancelsrc from "/images/btnCancelRed.png";
import "../../styles/myPageHistory/reviewHistory.css";
import { Link } from 'react-router-dom';
import ReviewDelModal from './ReviewDelModal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

export default function ReviewHistory() {
    const [isModal, setModal] = useState(false)
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [reviewList, setReviewList] = useState([]);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    dayjs.extend(relativeTime);
    dayjs.locale('ko');

    const handleDeleteReview = async(reviewId) => {
        try {
            await fetch(`${Server_IP}/api/v1/movie/review/${reviewId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            setDeleteReviewId(null);
            setModal(false);
            window.location.reload();
        } catch (err) {
            console.error('회원탈퇴 실패:', err);
        }
    };

    useEffect(() => {
        fetch(`${Server_IP}/api/v1/user/review`, {
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => {
                const reviewList = data.result;
                setReviewList(reviewList);
            })
            .catch((error) => {
                console.error('Error fetching review data:', error);
            });
    }, []);
    return (
        <>
            <div className='myPageHistory-history'>
                <div className='history-title'>
                    <p className='title-name'>My Review</p>
                    <Link to="/mypage" style={{textDecoration: 'none'}}>
                        <p className='title-more'>뒤로가기</p>
                    </Link>
                </div>
                <div className='reviewHistory-result'>
                    <p className='result-reviewCnt'>리뷰 {reviewList.length}개</p>
                    <div className='result-reviewList'>
                        {reviewList.map((review) => {
                            const movieUrl = `/movie/${review.movieId}`;

                            return(
                            <div className="reviewList-container"
                                to={movieUrl}
                                style={{
                                    backgroundImage: `url(${resultBackImgsrc})`,
                                }}
                            > 
                                    <Link
                                        className="contanier-poster"
                                        to={movieUrl}
                                        style={{
                                            backgroundImage: `url(${review.posterUrl})`,
                                        }}
                                    />
                                    <div className="container-detail">
                                        <div className='detail-title'>
                                            <Link to={movieUrl} style={{textDecoration: 'none'}}>
                                                <p className="title-name">{review.movieName}</p>
                                            </Link>
                                            <img src={btnCancelsrc} alt="" className='title-delBtn' 
                                            onClick={()=>{
                                                setModal(true);
                                                setDeleteReviewId(review.reviewId);
                                            }}/>
                                        </div>
                                        <div className="detail-review">
                                            <p className="review-text">
                                                {review.reviewContent}
                                            </p>
                                            <div className="review-user">
                                                <div className="user-like">
                                                    <img
                                                        className="like-img"
                                                        src={likeImgsrc}
                                                        alt=""
                                                    />
                                                    <p className="like-cnt">
                                                        {review.likeCount}
                                                    </p>
                                                </div>
                                                <p className='user-date'>
                                                    {dayjs(review.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {isModal ? <ReviewDelModal setModal={setModal} handleDeleteReview={handleDeleteReview} deleteReviewId={deleteReviewId}/> : <></>}
        </>
    )
}
