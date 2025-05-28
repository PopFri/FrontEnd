import React, { useEffect, useState } from 'react';
import resultBackImgsrc from "/images/recReviewBackground.png";
import likeImgsrc from "/images/likeIcon.png";
import "../../styles/myPage/review.css";
import { Link } from 'react-router-dom';

export default function ReviewHistory() {
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const movieUrl = `/movie`;
    const [reviewList, setReviewList] = useState([]);

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
        <div className='myPage-review'>
            <div className='review-title'>
                <p className='title-name'>My Review</p>
                <Link to="review" style={{textDecoration: 'none'}}>
                <p className='title-more'>더보기</p>
                </Link>
            </div>
            <div className="review-reviewList">
            {reviewList.map((review) => {
                return (
                    <Link className="reviewList-container"
                        to={movieUrl + `/${review.movieId}`}
                        style={{
                            backgroundImage: `url(${resultBackImgsrc})`,
                        }}
                    > 
                            <div
                                className="contanier-poster"
                                style={{
                                    backgroundImage: `url(${review.posterUrl})`,
                                }}
                            />
                            <div className="container-detail">
                                <p className="detail-name">{review.movieName}</p>
                                <div className="detail-review">
                                    <p className="review-text">
                                        {review.reviewContent && review.reviewContent.length > 50
                                            ? review.reviewContent.slice(0, 50) + "..."
                                            : review.reviewContent}
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
                                    </div>
                                </div>
                            </div>
                    </Link>
                )               
            })}
            </div>
        </div>
    )
}
