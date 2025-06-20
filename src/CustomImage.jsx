import React from 'react';
import defaultImage from '/images/default-img.png'; 

const CustomImage = ({ src, alt, ...props }) => {
    const handleError = (e) => {
        e.target.src = defaultImage;
    };

    return <img src={src} alt={alt} onError={handleError} {...props} />;
};

export default CustomImage;