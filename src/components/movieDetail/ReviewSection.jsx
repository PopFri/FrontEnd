import React, { useState } from 'react';
import '../../styles/movieDetail/ReviewSection.css';

const ReviewSection = ({ reviews }) => {
    const [showSortModal, setShowSortModal] = useState(false);

    const toggleSortModal = () => {
        setShowSortModal(prev => !prev);
    };

    return (
        <div className="review-wrapper">
            <h1 className="review-title">Review</h1>
            <div className="review-header">
                <p className="review-count">리뷰 {reviews.length}개</p>
                <div className="review-sort-wrapper">
                    <img src="images/reviewsortIcon.png" alt="sort" className="sort-icon" /> 

                    <button className="review-sort" onClick={toggleSortModal}>
                        정렬기준
                    </button>
                    {showSortModal && (
                        <div className="sort-modal">
                            <div onClick={() => { setShowSortModal(false); }} className="sort-option-new">최신순</div>
                            <div onClick={() => { setShowSortModal(false); }} className="sort-option-like">좋아요순</div>
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
                <input className="review-write" placeholder="텍스트를 입력해주세요." />
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
                                <button className="like-button">
                                    <span className="like">
                                        <img src="images/likeIcon.png" alt="like" />
                                    </span>
                                </button>
                                <span className="like-count">{review.like}</span>
                                <button className="dislike-button">
                                    <span className="dislike">
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