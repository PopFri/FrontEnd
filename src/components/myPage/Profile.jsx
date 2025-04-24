import React, { useState } from 'react'
import backgroundSrc from '/images/myPageBackground.png'
import settingIconSrc from '/images/settingIcon.png'
import profileImgSrc from '/images/profileImg.png'
import "../../styles/myPage/profile.css";
import ResignModal from './resignModal';
import InitDataModal from './InitDataModal';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const user = {
      "name": "최선규",
      "email": "popfri.sw@gmail.com",
      "imageUrl" : profileImgSrc
  }
  const navigate = useNavigate();
  const logout = () => {
    //로그아웃 서버 요청
    
    navigate('/login');
  }

  const [isSetting, setSetting] = useState(false);
  const [isResign, setResign] = useState(false);
  const [isInitData, setInitData] = useState(false);
  return (
    <>
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
                        <button type="button" className='detail-danger'
                        onClick={()=>setResign(true)}>
                            회원 탈퇴
                        </button>
                        <button type="button" className='detail-danger'
                        onClick={()=>setInitData(true)}>
                            데이터 삭제
                        </button>
                        <button type="button" className='detail-cancel' onClick={()=>setSetting(false)}>취소</button>
                    </div>:
                    <button type="button" className='detail-logout'
                    onClick={()=>logout()}>
                        로그아웃
                    </button>
                }
            </div>
            {isSetting ? null : <img src={settingIconSrc} alt="" className='profile-setting' onClick={()=>setSetting(true)}/>}
        </div>
        {isResign ? <ResignModal setModal={setResign}/> : null }
        {isInitData ? <InitDataModal setModal={setInitData}/> : null }
    </>
  )
}
