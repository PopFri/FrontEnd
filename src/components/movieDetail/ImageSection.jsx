import React from 'react';
import '../../styles/movieDetail/ImageSection.css';

const ImageSection = ({ image }) => {
    return (
        <div className="image-wrapper">
            <h1 className="image-title">Images</h1>
            <div className="image-scroll-wrapper">
            {image.map((imgUrl, index) => (
                <div className="image-container" key={index}>
                    <img
                        key={index}
                        src={imgUrl}
                        alt={`movie-still-${index}`}
                        className="scrollable-image"
                    />
                </div>
            ))}
            </div>
        </div>
    );
};

export default ImageSection;