import React from 'react';
import '../../styles/movieDetail/PosterSection.css';


const PosterSection = ({backgroundImageUrl, imageUrl, title, directing, releaseDate, runtime, providers}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
      };

    return (
        <div className="poster-wrapper">
            {/* 배경 이미지 */}
            {backgroundImageUrl && (
                <img
                    src={backgroundImageUrl}
                    alt="배경 이미지"
                    className="background-image"
                />
            )}
            <div className="poster-image-wrapper">
                {/* 앞에 보이는 포스터 이미지 */}
                <div className="poster-container">
                    {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="앞 포스터"
                        className="poster-image"
                    />
                    )}
                </div>
                <div className="overlay-provider-wrapper">
                    {/* 배경 위에 글자 */}
                    <div className="overlay-text">
                        <h1 className="title">{title}</h1>
                        <p className="description">{title} ({releaseDate ? formatDate(releaseDate) : ''}) {runtime}분</p>
                        <p className="director">감독:{directing}</p>
                    </div>

                    {/* 제공업체 */}
                    <div className="provider-container">
                        {providers && providers.map((provider) => (
                            <img
                                key={provider.provider_id}
                                src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                alt={provider.provider_name}
                                className="provider-logo"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PosterSection;