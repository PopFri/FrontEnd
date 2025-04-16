import React from 'react';
import '../../styles/movieDetail/CreditsSection.css';


const CreditsSection = ({actors, actorImages}) => {
  
    return (
        <div className="credits-wrapper">
            <h1 className="credits-title">Credits</h1>
            <div className="credits-container">
                {actors.map((actor, index) => (
                <div key={index} className="actor-card">
                    <img
                    src={actorImages[index]}
                    alt={actor.name}
                    className="actor-image"
                    />
                    <p className="actor-name">{actors[index]}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CreditsSection;