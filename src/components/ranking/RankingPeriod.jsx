import React from 'react';
import '../../styles/ranking/RankingPeriod.css';

const RankingPeriod = ({platform, rankingPeriod, setRankingPeriod}) => {
    let dayColor = "#FFFFFF", weekColor = "#FFFFFF", monthColor = "#FFFFFF";
    switch (rankingPeriod) {
        case "day":
            dayColor = "#1ED863"
            break;
        case "week":
            weekColor = "#1ED863"
            break;
        case "month":
            monthColor = "#1ED863"
            break;
        default:
            break;
    }

    const periodButtons = () => {
        switch (platform) {
            case "boxoffice":
                return (
                    <div className="ranking-period-button-wrapper">
                        <button className="ranking-period-button" onClick={() => setRankingPeriod('day')} style={{color: `${dayColor}`}}>일간</button>
                        <button className="ranking-period-button" onClick={() => setRankingPeriod('week')} style={{color: `${weekColor}`}}>주간</button>
                    </div>
                );
            case "popfri":
                return (
                    <div className="ranking-period-button-wrapper">
                        <button className="ranking-period-button" onClick={() => setRankingPeriod('day')} style={{color: `${dayColor}`}}>일간</button>
                        <button className="ranking-period-button" onClick={() => setRankingPeriod('week')} style={{color: `${weekColor}`}}>주간</button>
                        <button className="ranking-period-button" onClick={() => setRankingPeriod('month')} style={{color: `${monthColor}`}}>월간</button>
                    </div>
                );
            default:
                return null;
        };
    };

    return (
        <div className="ranking-period-wrapper">
            {periodButtons()}
        </div>
    );
}
export default RankingPeriod;