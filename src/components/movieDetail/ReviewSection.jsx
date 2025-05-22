import React, { useEffect, useState } from 'react';
import '../../styles/movieDetail/ReviewSection.css';

const ReviewSection = ({ reviews, totalReview, fetchReviews, movieId, token, sort, setSort, user, title, imageUrl }) => {
    const [showSortModal, setShowSortModal] = useState(false);
    const [inputText, setInputText] = useState('');
    const [userReviewStatus, setUserReviewStatus] = useState({});
    const Server_IP = import.meta.env.VITE_SERVER_IP;

    useEffect(() => {
        if (!Array.isArray(reviews)) return;

        const loadReviewStatus = async () => {
            const newStatus = {};
            for (let review of reviews) {
                try {
                    const res = await fetch(`data/${review.id}review.json`);
                    const data = await res.json();
                    newStatus[review.id] = data.result;
                } catch (err) {
                    console.error(`리뷰 ${review.id} 상태 불러오기 실패`, err);
                }
            }
            setUserReviewStatus(newStatus);
        };

        if (reviews.length > 0) {
            loadReviewStatus();
        }
    }, [reviews]);

    let recentColor = "#656363", likeColor = "#656363";
    switch (sort) {
        case "recent":
            recentColor = "#1ED863"
            break;

        case "like":
            likeColor = "#1ED863"
            break;

        default:
            break;
    }

    let recentFontColor = "#ffffff", likeFontColor = "#ffffff";
    switch (sort) {
        case "recent":
            recentFontColor = "#000000"
            break;

        case "like":
            likeFontColor = "#000000"
            break;

        default:
            break;
    }

    const toggleSortModal = () => {
        setShowSortModal(prev => !prev);
    };

    const handleLike = async () => {
        try {
            await fetch(`${Server_IP}/api/v1/movie/review/like`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchReviews();
        } catch (err) {
            console.error('좋아요 실패:', err);
        }
    };

    const handleDislike = async () => {
        try {
            await fetch(`${Server_IP}/api/v1/movie/review/dislike`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchReviews();
        } catch (err) {
            console.error('싫어요 실패:', err);
        }
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) return;
        const payload = {
            content: inputText,
            movieId: movieId,
            userId: user.id,
            movieName: title,
            posterUrl: imageUrl
        };

        console.log('보내는 JSON:', JSON.stringify(payload));
        try {
            await fetch(`${Server_IP}/api/v1/movie/review`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ movieId: movieId, reviewContent: inputText, movieName: title, posterUrl: imageUrl }),
            });
            setInputText('');
            fetchReviews();
        } catch (err) {
            console.error('리뷰 작성 실패:', err);
        }
    };

    return (
        <div className="review-wrapper">
            <h1 className="review-title">Review</h1>
            <div className="review-header">
                <p className="review-count">리뷰 {totalReview}개</p>
                <div className="review-sort-wrapper">
                    <img src="/images/reviewsortIcon.png" alt="sort" className="sort-icon" /> 
                    <button className="review-sort" onClick={toggleSortModal}>
                        정렬기준
                    </button>
                    {showSortModal && (
                        <div className="sort-modal">
                            <div onClick={() => { setShowSortModal(false); setSort('recent')}} style={{backgroundColor: `${recentColor}`, color: `${recentFontColor}`}} className="sort-option-recent"><p>최신순</p></div>
                            <div onClick={() => { setShowSortModal(false); setSort('like')}} style={{backgroundColor: `${likeColor}`, color: `${likeFontColor}`}} className="sort-option-like"><p>추천순</p></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="review-write-wrapper">
                {user && (
                    <img
                        src={user.imageUrl}
                        alt="profile"
                        className="review-user-avatar"
                    />
                )}
                <input 
                    className="review-write" 
                    placeholder="텍스트를 입력해주세요."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>

            <div className="review-list">
                {Array.isArray(reviews) && reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <div className="review-user-wrapper">
                            <img
                                src={review.imageUrl}
                                alt="profile"
                                className="review-avatar"
                            />
                            <div className="review-user">
                                <span className="review-name">{review.name}</span>
                                <span className="review-email">{review.email}</span>
                            </div>
                            <span className="review-date">
                                {review.date}
                            </span>
                        </div>
                        <div className="review-content-wrapper">
                            <p className="review-text">{review.content}</p>
                            <div className="review-actions">
                                <button className="like-button" onClick={() => handleLike(review.id)} >
                                    <span className="like">
                                    <img
                                        src={
                                            userReviewStatus[review.id] === "like"
                                            ? "/images/clickedLike.png"
                                            : "/images/likeIcon.png"
                                        }
                                        alt="like"
                                    />
                                    </span>
                                </button>
                                <span className="like-count" style={{color:  userReviewStatus[review.id] === "like" ? "#32ff87" : "#FFFFFF"}}>{review.like}</span>
                                <button className="dislike-button">
                                    <span className="dislike" onClick={() => handleDislike(review.id)}>
                                    <img
                                        src={
                                            userReviewStatus[review.id] === "dislike"
                                            ? "/images/clickedDislike.png"
                                            : "/images/dislikeIcon.png"
                                        }
                                        alt="dislike"
                                    />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;