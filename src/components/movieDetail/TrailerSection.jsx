import React from 'react';
import YouTube from 'react-youtube';
import '../../styles/movieDetail/TrailerSection.css';

const TrailerSection = ({videoId}) => {
  
    return (
        <div className="trailer-wrapper">
            <h1 className="video-title">Trailer</h1>
            <div className="video-wrapper">
            {videoId.map((video, index) => (
                <div key={index} className="video-container">
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
                    />
                </div>
            ))}
            </div>
        </div>
    );
};
export default TrailerSection;