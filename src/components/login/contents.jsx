import React from 'react'
import '../../styles/login/contents.css'
import logoImgsrc from '/images/pofriLogoLogin.png'
import btnKakaoLoginsrc from '/images/btnKakaoLogin.png'
import btnGoogleLoginsrc from '/images/btnGoogleLogin.png'
import btnNaverLoginsrc from '/images/btnNaverLogin.png'

export default function Contents() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;

  return (
    <div className='login-contents'>
      <div className='contents-title'>
        <p className='title-introduce'>나만의 팝콘친구</p>
        <img src={logoImgsrc} alt="" />
        <p className='title-detail'>사용자 맞춤 영화 추천 서비스</p>
      </div>
      <div className='contents-button'>
        <a href={Server_IP + "/oauth2/authorization/kakao"}> 
          <img src={btnKakaoLoginsrc} alt="" />
        </a>
        <a href={Server_IP + "/oauth2/authorization/google"}> 
          <img src={btnGoogleLoginsrc} alt="" />
        </a>
        <a href={Server_IP + "/oauth2/authorization/naver"}> 
          <img src={btnNaverLoginsrc} alt="" />
        </a>
      </div>
    </div>
  )
}
