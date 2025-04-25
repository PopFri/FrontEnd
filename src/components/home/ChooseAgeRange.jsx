import React from 'react';
import '../../styles/home/ChooseAgeRange.css';


const ChooseAgeRange = ({ageRange, setAgeRange}) => {
    let age10Color = "#FFFFFF", age20Color = "#FFFFFF", age30Color = "#FFFFFF", age40Color = "#FFFFFF";
    switch (ageRange) {
        case "10":
            age10Color = "#1ED863"
            break;
        case "20":
            age20Color = "#1ED863"
            break;
        case "30":
            age30Color = "#1ED863"
            break;
        case "40":
            age40Color = "#1ED863"
            break;
        default:
            break;
    }
    return (
        <div className="age-range-wrapper">
            <div className="age-range-button-wrapper">
            <button className="age-range-button" onClick={() => setAgeRange('10')} style={{color: `${age10Color}`}}>10대</button>
            <button className="age-range-button" onClick={() => setAgeRange('20')} style={{color: `${age20Color}`}}>20대</button>
            <button className="age-range-button" onClick={() => setAgeRange('30')} style={{color: `${age30Color}`}}>30대</button>
            <button className="age-range-button" onClick={() => setAgeRange('40')} style={{color: `${age40Color}`}}>40대+</button>
            </div>
        </div>
    );
};

export default ChooseAgeRange;