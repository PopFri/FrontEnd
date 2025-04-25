import React from 'react'
import "../../styles/discovery/discoveryFilm.css";
import arrowsrc from "/images/discoveryArrow.png";
import { Link } from 'react-router-dom';

export default function DiscoveryFilm() {
  return (
    <div className='discovery-discoveryFilm'>
        <Link to='discoveryfilm' className='discoveryFilm-link' style={{textDecoration: 'none'}}>
            <p className='link-text'>Discovery Film</p>
            <img src={arrowsrc} alt="" className='link-arrow'/>
        </Link>
    </div>
  )
}
