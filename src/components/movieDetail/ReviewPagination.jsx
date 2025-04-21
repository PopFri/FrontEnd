import React from 'react';
import '../../styles/movieDetail/ReviewPagination.css';

const ReviewPagination = ({ page, setPage, totalPage }) => {

    const blockSize = 5;
    const currentBlock = Math.floor((page - 1) / blockSize);
    const startPage = currentBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPage);

    const handlePrevBlock = () => {
        if (startPage > 1) setPage(startPage - 1);
    };

    const handleNextBlock = () => {
        if (endPage < totalPage) setPage(endPage + 1);
    };

    return (
        <div className="review-pagination-wrapper">
            <div className="review-pagination-content">

                {/* 이전 블록 */}
                {startPage > 1 && (
                    <button onClick={handlePrevBlock} className="review-pagination-button">
                        &lt;
                    </button>
                )}

                {/* 숫자 페이지 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const pageNum = startPage + i;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`review-pagination-button ${page === pageNum ? 'active' : ''}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* 다음 블록 */}
                {endPage < totalPage && (
                    <button onClick={handleNextBlock} className="review-pagination-button">
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewPagination;