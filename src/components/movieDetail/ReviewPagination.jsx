import React from 'react';
import '../../styles/movieDetail/ReviewPagination.css';

const ReviewPagination = ({ page, setPage, hasNext }) => {

    const nextPage = page + 1;
    const prevePage = page - 1;
    return (
        <div className="review-pagination-wrapper">
            <div className="review-pagination-content">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="review-pagination-button"
                >
                    {prevePage}
                </button>
                <span className="review-page">{page}</span>
                <button
                    onClick={() => setPage((prev) => (hasNext ? prev + 1 : prev))}
                    disabled={!hasNext}
                    className="review-pagination-button"
                >
                    {nextPage}
                </button>
            </div>
        </div>
    );
};

export default ReviewPagination;