import React from 'react';
import '../styles/loadingPage.css';
import '../styles/common.css'

const LoadingPage = () => {

    return (
        <div className="loading-page">
            <div className="loading-content">
                <img src="/images/logoPopcorn.png" alt="로딩 중" className="loading-spinner" />
                <p className="loading-text">로딩 중...</p>
            </div>
        </div>
    );
}
export default LoadingPage;