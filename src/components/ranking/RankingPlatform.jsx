import React from 'react';
import '../../styles/ranking/RankingPlatform.css';

const RankingPlatform = ({platform, setPlatform}) => {
    let boxofficeColor = "#FFFFFF", netflixColor = "#FFFFFF", popfriColor = "#FFFFFF";
    switch (platform) {
        case "boxoffice":
            boxofficeColor = "#1ED863"
            break;

        case "netflix":
            netflixColor = "#1ED863"
            break;

        case "popfri":
            popfriColor = "#1ED863"
            break;  
        
        default:
            break;
    }

    return (
        <div className="ranking-platform-wrapper">
            <button className="ranking-platform-button" style={{borderColor: `${boxofficeColor}`, color: `${boxofficeColor}`}} onClick={() => setPlatform('boxoffice')}>Box Office</button>
            <button className="ranking-platform-button" style={{borderColor: `${netflixColor}`, color: `${netflixColor}`}} onClick={() => setPlatform('netflix')}>Netflix</button>
            <button className="ranking-platform-button" style={{borderColor: `${popfriColor}`, color: `${popfriColor}`}} onClick={() => setPlatform('popfri')}>PopFri</button>
        </div>
    );
}
export default RankingPlatform;