import React, { useState } from 'react';
import '../../styles/movieDetail/ReviewSection.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

const ReviewSection = ({ reviews, totalReview, fetchReviews, movieId, sort, setSort, user, title, imageUrl }) => {
    const [showSortModal, setShowSortModal] = useState(false);
    const [inputText, setInputText] = useState('');
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    dayjs.extend(relativeTime);
    dayjs.locale('ko');

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

    const handleLike = async (reviewId) => {
        try {
            await fetch(`${Server_IP}/api/v1/movie/review/like`, {
                method: 'POST',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer` },
                body: JSON.stringify({ reviewId: reviewId, userId: user.userId }),
            });
            fetchReviews();
        } catch (err) {
            console.error('좋아요 실패:', err);
        }
    };

    const handleDislike = async (reviewId) => {
        try {
            await fetch(`${Server_IP}/api/v1/movie/review/dislike`, {
                method: 'POST',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer` },
                body: JSON.stringify({ reviewId: reviewId, userId: user.userId }),
            });
            fetchReviews();
        } catch (err) {
            console.error('싫어요 실패:', err);
        }
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) return;
        try {
            const res = await fetch(`${Server_IP}/api/v1/movie/review`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer`
                },
                body: JSON.stringify({ movieId: movieId, reviewContent: inputText, movieName: title, posterUrl: imageUrl }),
            });
            const data = await res.json();

            if (!res.ok || !data.isSuccess) {
                alert(data.message); // 여기서 경고창 뜨는 거
                return;
            }

            setInputText("");
            fetchReviews();

        } catch (err) {
            console.error("리뷰 작성 실패:", err);
            alert("리뷰 작성 중 오류가 발생했습니다.");
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
                                src={review.userImageUrl}
                                alt="profile"
                                className="review-avatar"
                            />
                            <div className="review-user">
                                <span className="review-name">{review.userName}</span>
                                <span className="review-email">{review.userEmail}</span>
                            </div>
                            <span className="review-date">
                                {dayjs(review.createdAt).fromNow()}
                            </span>
                        </div>
                        <div className="review-content-wrapper">
                            <p className="review-text">{review.reviewContent}</p>
                            <div className="review-actions">
                                <button className="like-button" onClick={() => handleLike(review.reviewId)} >
                                    <span className="like">
                                    <img
                                        src={
                                            review.likeStatus === "like"
                                            ? "/images/clickedLike.png"
                                            : "/images/likeIcon.png"
                                        }
                                        alt="like"
                                    />
                                    </span>
                                </button>
                                <span className="like-count" style={{color: review.likeStatus === "like" ? "#32ff87" : "#FFFFFF"}}>{review.likeCount}</span>
                                <button className="dislike-button">
                                    <span className="dislike" onClick={() => handleDislike(review.reviewId)}>
                                    <img
                                        src={
                                            review.likeStatus === "dislike"
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