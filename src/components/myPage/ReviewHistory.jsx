import React from 'react'
import reviewDummy from '../../../public/data/reviewDummy'
import movieDummy from '../../../public/data/movieDummy'
import resultBackImgsrc from "/images/recReviewBackground.png";
import likeImgsrc from "/images/likeIcon.png";
import "../../styles/myPage/review.css";
import { Link } from 'react-router-dom';

export default function ReviewHistory() {
  const movieUrl = `/movie`;

  return (
    <div className='myPage-review'>
        <div className='review-title'>
            <p className='title-name'>My Review</p>
            <Link to="review" style={{textDecoration: 'none'}}>
              <p className='title-more'>더보기</p>
            </Link>
        </div>
        <div className="review-reviewList">
          {reviewDummy.result.map((review) => {
              return (
                  <Link className="reviewList-container"
                      to={movieUrl}
                      style={{
                          backgroundImage: `url(${resultBackImgsrc})`,
                      }}
                  > 
                        <div
                            className="contanier-poster"
                            style={{
                                backgroundImage: `url(${movieDummy.result[review.movieId].imageUrl})`,
                            }}
                        />
                        <div className="container-detail">
                            <p className="detail-name">{movieDummy.result[review.movieId].name}</p>
                            <div className="detail-review">
                                <p className="review-text">
                                    {review.text}
                                </p>
                                <div className="review-user">
                                    <div className="user-like">
                                        <img
                                            className="like-img"
                                            src={likeImgsrc}
                                            alt=""
                                        />
                                        <p className="like-cnt">
                                            {review.likeCnt}
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
