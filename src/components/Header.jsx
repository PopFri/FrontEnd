import React from 'react'
import logo from '/images/popfriLogo.png'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const profileImg = "default.png"
  const location = useLocation();

  let homeColor = "#FFFFFF", discoveryColor = "#FFFFFF", rankColor = "#FFFFFF";
  switch (location.pathname) {
    case "/home":
        homeColor = "#1ED863"
        break;

    case "/discovery":
        discoveryColor = "#1ED863"
        break;

    case "/rank":
        rankColor = "#1ED863"
        break;

    default:
        break;
  }

  return (
    <div className='header'>
        <img src={logo} alt="" />
        <div className='header-link'>
            <Link to="/home" className='link-container' style={{borderBottomColor: `${homeColor}`}}>
                <p className='contianer-text' style={{color: `${homeColor}`}}>홈</p>
            </Link>
            <Link to="/discovery" className='link-container' style={{borderBottomColor: `${discoveryColor}`}}>
                <p className='contianer-text' style={{color: `${discoveryColor}`}}>탐색</p>
            </Link>
            <Link to="/rank" className='link-container' style={{borderBottomColor: `${rankColor}`}}>
                <p className='contianer-text' style={{color: `${rankColor}`}}>랭킹</p>
            </Link>
        </div>
        <Link to="/mypage" className='header-profile' style={{backgroundImage: `url(${profileImg})`}}/>
    </div>
  )
}
