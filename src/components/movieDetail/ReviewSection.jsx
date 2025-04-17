import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/movieDetail/ReviewSection.css';

const ReviewSection = ({ reviews, totalReview, fetchReviews, movieId, token, setSort }) => {
    const navigate = useNavigate;
    const [showSortModal, setShowSortModal] = useState(false);
    const [inputText, setInputText] = useState('');
    const [user, setUser] = useState(null);

    const toggleSortModal = () => {
        setShowSortModal(prev => !prev);
    };

    const handleLike = async (reviewId) => {
        try {
            await fetch(`/api/reviews/${reviewId}/like`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchReviews();
        } catch (err) {
            console.error('좋아요 실패:', err);
        }
    };

    const handleDislike = async (reviewId) => {
        try {
            await fetch(`/api/reviews/${reviewId}/dislike`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchReviews();
        } catch (err) {
            console.error('싫어요 실패:', err);
        }
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) return;
        try {
            await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ content: inputText, movieId , userId: user.id}),
            });
            setInputText('');
            fetchReviews();
        } catch (err) {
            console.error('리뷰 작성 실패:', err);
        }
    };

    // const loadUserData = async (token) => {
    //     try {
    //       const userRes = await fetch(`/api/user/load`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //         credentials: 'include'
    //       });
      
    //       // 🔁 Access Token 만료 시 refresh 시도
    //       if (userRes.status === 401) {
    //         const refreshRes = await fetch(`/api/auth/refresh`, {
    //           method: 'POST',
    //           credentials: 'include'
    //         });
      
    //         if (!refreshRes.ok) throw new Error('리프레시 토큰도 만료됨');
      
    //         const refreshData = await refreshRes.json();
    //         const newAccessToken = refreshData.accessToken;
    //         localStorage.setItem('accessToken', newAccessToken);
      
    //         // 🔁 재시도
    //         return loadUserData(newAccessToken);
    //       }
      
    //       const userData = await userRes.json();
      
    //       setUser(userData);
    //     } catch (err) {
    //       console.error(" 에러 발생:", err.message);
    //       console.error("전체 에러 객체:", err);
    //       navigate('/login');
    //     }
    //   };

    // useEffect(() => {
    //     loadUserData;
    // });
    
    return (
        <div className="review-wrapper">
            <h1 className="review-title">Review</h1>
            <div className="review-header">
                <p className="review-count">리뷰 {totalReview}개</p>
                <div className="review-sort-wrapper">
                    <img src="images/reviewsortIcon.png" alt="sort" className="sort-icon" /> 

                    <button className="review-sort" onClick={toggleSortModal}>
                        정렬기준
                    </button>
                    {showSortModal && (
                        <div className="sort-modal">
                            <div onClick={() => { setShowSortModal(false); setSort('recent')}} className="sort-option-new">최신순</div>
                            <div onClick={() => { setShowSortModal(false); setSort('like')}} className="sort-option-like">좋아요순</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="review-write-wrapper">
                <img
                    src="images/popfriLogo.png"
                    alt="profile"
                    className="review-user-avatar"
                />
                <input 
                    className="review-write" 
                    placeholder="텍스트를 입력해주세요."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>

            <div className="review-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <img
                            src={review.imageUrl}
                            alt="profile"
                            className="review-avatar"
                        />
                        <div className="review-body">
                            <div className="review-top">
                                <div className="review-user">
                                    <span className="review-name">{review.name}</span>
                                    <span className="review-email">{review.email}</span>
                                </div>
                                <span className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                                        month: 'numeric',
                                        day: 'numeric',
                                    })}일
                                </span>
                            </div>
                            <p className="review-text">{review.content}</p>
                            <div className="review-actions">
                                <button className="like-button" onClick={() => handleLike(review.id)}>
                                    <span className="like">
                                        <img src="images/likeIcon.png" alt="like" />
                                    </span>
                                </button>
                                <span className="like-count">{review.like}</span>
                                <button className="dislike-button">
                                    <span className="dislike" onClick={() => handleDislike(review.id)}>
                                        <img src="images/dislikeIcon.png" alt="dislike" />
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