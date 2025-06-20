import React from 'react';
import '../../styles/movieDetail/CreditsSection.css';
import CustomImage from '../../CustomImage';

const CreditsSection = ({actors, actorsCharacter, actorImages}) => {
  
    return (
        <div className="credits-wrapper">
            <h1 className="credits-title">Credits</h1>
            <div className="credits-container">
                {actors.map((actor, index) => (
                <div key={index} className="actor-card">
                    <CustomImage
                    src={actorImages[index]}
                    alt={actor.name}
                    className="actor-image"
                    />
                    <p className="actor-name">{actors[index]}</p>
                    <p className="actor-character">{actorsCharacter[index]}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CreditsSection;