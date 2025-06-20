import React, { useEffect, useState } from 'react';
import defaultImage from '/images/default-img.png'; // 기본 이미지

const BackgroundImageDiv = ({ imageUrl, className }) => {
    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setBgImage(imageUrl);
        img.onerror = () => setBgImage(defaultImage);
    }, [imageUrl]);

    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default BackgroundImageDiv;