import React, { useEffect, useState } from "react";
import "../../styles/discovery/recReview.css";
import backImgsrc from "/images/reviewBackground.png";
import resultBackImgsrc from "/images/recReviewBackground.png";
import like1Imgsrc from "/images/clickedLike.png";
import like2Imgsrc from "/images/likeIcon.png";
import { Link } from "react-router-dom";

export default function RecReview() {
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const [isSubmit, setIsSubmit] = useState(false);
    const [userInput, setInput] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const [reviewResult, setReviewResult] = useState({});

    const clickReview = (index) => {
        setIsSubmit(true);
        setInput(index);

        setReviewResult(reviewList[userInput]);
    };

    useEffect(() => {
          fetch(`${Server_IP}/api/v1/movie/recom/review`, {
            method: "GET",
            credentials: "include"
          })
            .then((response) => response.json())
            .then((data) => {
                setReviewList(data.result);
                localStorage.setItem("recReviewResult", JSON.stringify({
                    reviewList: reviewList,
                    userInput: userInput
                }));
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
            });
            console.log(reviewList);
    }, [isSubmit]);

    const movieUrl = `/movie`;

    return (
        <>
            {isSubmit ? (
                <div className="recReview-result">
                    <p className="result-title">
                        한줄평 영화 선택
                        <button className="recReview-button" > 
                            <img src="/images/recom_restart_button.png" alt="재시작" className="recReview-restart-icon" />
                        </button>
                    </p>
                    <Link
                        className="result-container"
                        to={movieUrl}
                        style={{
                            backgroundImage: `url(${resultBackImgsrc})`,
                        }}
                    >
                        <div
                            className="contanier-poster"
                            style={{
                                backgroundImage: `url(${reviewResult.imageUrl})`,
                            }}
                        />
                        <div className="container-detail">
                            <p className="detail-name">{reviewResult.movieName}</p>
                            <div className="detail-review">
                                <p className="review-text">
                                    {reviewResult.text}
                                </p>
                                <div className="review-user">
                                    <div className="user-like">
                                        <img
                                            className="like-img"
                                            src={like2Imgsrc}
                                            alt=""
                                        />
                                        <p className="like-cnt">
                                            {reviewResult.likeCnt}
                                        </p>
                                    </div>
                                    <div className="user-profile">
                                        <p className="profile-name">
                                            {reviewResult.userName}
                                        </p>
                                        <div
                                            className="profile-img"
                                            style={{
                                                backgroundImage: `url(${reviewResult.profileImg})`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ) : (
                <div className="home-recReview">
                    <p className="recReview-question">
                        Q. 확인하고 싶은 영화한줄평을 선택해주세요!
                    </p>
                    <div className="recReview-reviewList">
                        {Array.isArray(reviewResult) && reviewResult.map((review, index) => {
                            return (
                                <div
                                    className="reviewList-review"
                                    style={{
                                        backgroundImage: `url(${backImgsrc})`,
                                    }}
                                    onClick={() => clickReview(index)}
                                >
                                    <p className="review-text">{review.reviewContent}</p>
                                    <div className="review-detail">
                                        <div className="detail-like">
                                            <img
                                                className="like-img"
                                                src={like1Imgsrc}
                                                alt=""
                                            />
                                            <p className="like-cnt">
                                                {review.likeCnt}
                                            </p>
                                        </div>
                                        <div className="detail-profile">
                                            <p className="profile-name">
                                                {review.userName}
                                            </p>
                                            <div
                                                className="profile-img"
                                                style={{
                                                    backgroundImage: `url(${review.profileImg})`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
