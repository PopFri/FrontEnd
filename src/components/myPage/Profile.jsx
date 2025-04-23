import React, { useState } from 'react'
import backgroundSrc from '/images/myPageBackground.png'
import settingIconSrc from '/images/settingIcon.png'
import profileImgSrc from '/images/profileImg.png'
import "../../styles/myPage/profile.css";

export default function Profile() {
  const user = {
      "name": "최선규",
      "email": "popfri.sw@gmail.com",
      "imageUrl" : profileImgSrc
  }
  const [isSetting, setSetting] = useState(false)
  return (
    <div className='myPage-profile' style={{backgroundImage: `url(${backgroundSrc})`}}>
        <div className='profile-img' style={{backgroundImage: `url(${user.imageUrl})`}}></div>
        <div className='profile-detail'>
            <div className='detail-text'>
                <p className='text-name'>{user.name}</p>
                <p className='text-email'>{user.email}</p>
            </div>
            {
                isSetting ?
                <div className='detail-button'>
                    <button type="button" className='detail-danger'>회원 탈퇴</button>
                    <button type="button" className='detail-danger'>데이터 삭제</button>
                    <button type="button" className='detail-cancel' onClick={()=>setSetting(false)}>취소</button>
                </div>:
                <button type="button" className='detail-logout'>로그아웃</button>
            }
        </div>
        {isSetting ? <></> : <img src={settingIconSrc} alt="" className='profile-setting' onClick={()=>setSetting(true)}/>}
    </div>
  )
}
