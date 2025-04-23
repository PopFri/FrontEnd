import React from 'react'
import reviewDummy from '../../../public/data/reviewDummy'
import movieDummy from '../../../public/data/movieDummy'
import resultBackImgsrc from "/images/recReviewBackground.png";
import likeImgsrc from "/images/likeIcon.png";
import btnCancelsrc from "/images/btnCancel.png";
import "../../styles/myPageHistory/reviewHistory.css";
import { Link } from 'react-router-dom';

export default function ReviewHistory() {
  return (
    <div className='myPageHistory-history'>
        <div className='history-title'>
            <p className='title-name'>My Review</p>
            <Link to="/mypage" style={{textDecoration: 'none'}}>
                <p className='title-more'>뒤로가기</p>
            </Link>
        </div>
        <div className='reviewHistory-result'>
            <p className='result-reviewCnt'>리뷰 {reviewDummy.result.length}개</p>
            <div className='result-reviewList'>
                {reviewDummy.result.map((review) => {
                    const movieUrl = `/movie`;
                    const date = 1;

                    return(
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
                                <div className='detail-title'>
                                    <p className="title-name">{movieDummy.result[review.movieId].name}</p>
                                    <img src={btnCancelsrc} alt="" className='title-delBtn' onClick={()=>{}}/>
                                </div>
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
                                        <p className='user-date'>
                                            {date}일 전
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </Link>
                    );
                })}
            </div>
        </div>
    </div>
  )
}
