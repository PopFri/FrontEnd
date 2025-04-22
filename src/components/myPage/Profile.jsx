import React from 'react'
import backgroundSrc from '/images/myPageBackground.png'
import settingIconSrc from '/images/settingIcon.png'
import profileImgSrc from '/images/profileImg.png'
import "../../styles/myPage/profile.css";

export default function Profile(props) {
    const user = {
        "name": "최선규",
        "email": "popfri.sw@gmail.com",
        "imageUrl" : profileImgSrc
    }

  return (
    <div className='myPage-profile' style={{backgroundImage: `url(${backgroundSrc})`}}>
        <div className='profile-img' style={{backgroundImage: `url(${user.imageUrl})`}}></div>
        <div className='profile-detail'>
            <div className='detail-text'>
                <p className='text-name'>{user.name}</p>
                <p className='text-email'>{user.email}</p>
            </div>
            <button type="button" className='detail-logout'>로그아웃</button>
        </div>
        <img src={settingIconSrc} alt="" className='profile-setting' onClick={()=>props.setSetting}/>
    </div>
  )
}
