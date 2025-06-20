import React, { useState } from 'react';
import YouTube from 'react-youtube';
import '../../styles/movieDetail/TrailerSection.css';

const TrailerSection = ({videoId}) => {
    const [hasError, setHasError] = useState(false);
    
    const handleYouTubeError = () => {
        setHasError(true); // 유튜브 재생 에러 상태로 변경
    };
    
    return (
        <div className="trailer-wrapper">
            <h1 className="video-title">Trailer</h1>
            <div className="video-wrapper">
            {videoId.map((video, index) => (
                <div key={index} className="video-container">
                    {hasError ? (
                        <div className="trailer-section-error-message">
                            <p>🎬 트레일러를 재생할 수 없습니다.</p>
                            <p>해당 영상은 삭제되었거나 외부 사이트에서 재생이 제한된 영상일 수 있습니다.</p>
                        </div>
                    ) : (
                        <YouTube 
                            videoId={video} // 비디오 ID
                            className="youtube-video"
                            opts={{
                                height: '171.6',
                                width: '302.98',
                                playerVars: {
                                    autoplay: 0,
                                    controls: 1,
                                    modestbranding: 1,
                                    showinfo: 0,
                                    rel: 0,
                                },
                            }}
                            onError={handleYouTubeError}
                        />
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};
export default TrailerSection;