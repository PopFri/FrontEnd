import React from 'react';
import '../styles/loadingPage.css';
import '../styles/common.css'

const LoadingPage = ({page}) => {

    return (
        <>
            {page === 'rec' ?
                <div className="loading-page-rec">
                    <div className="loading-content-rec">
                        <img src="/images/logoPopcorn.png" alt="로딩 중" className="loading-spinner" />
                        <p className="loading-text">추천 영화를 불러오는 중...</p>
                    </div>
                </div>
            : 
                <div className="loading-page">
                    <div className="loading-content">
                        <img src="/images/logoPopcorn.png" alt="로딩 중" className="loading-spinner" />
                        <p className="loading-text">로딩 중...</p>
                    </div>
                </div>
            }
        </>
    );
}
export default LoadingPage;