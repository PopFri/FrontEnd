import React, { useState, useEffect, useRef } from 'react'
import '../../styles/login/contents.css'
import { useNavigate } from 'react-router-dom'
import logoImgsrc from '/images/pofriLogoLogin.png'
import btnKakaoLoginsrc from '/images/btnKakaoLogin.png'
import btnGoogleLoginsrc from '/images/btnGoogleLogin.png'
import btnNaverLoginsrc from '/images/btnNaverLogin.png'

export default function Contents() {
  const Server_IP = import.meta.env.VITE_SERVER_IP;
  const [user, setUser] = React.useState(null);
  const [inputBirth, setInputBirth] = useState('');
  const [gender, setGender] = useState('');
  const [isValid, setIsValid] = useState(false);
  const signUp = useRef(false);
  const navigate = useNavigate();

  const isValidDate = (value) => {
    if (value.length !== 8) return false;

    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10);
    const day = parseInt(value.substring(6, 8), 10);

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const formatToDashDate = (birth) => {
    return `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
  };

  const loadUserData = async () => {
    try {
        const userRes = await fetch(`${Server_IP}/api/v1/user`, {
        method: 'GET',
        credentials: 'include'
        });
        const userData = await userRes.json();
    
        setUser(userData.result);
        console.log(userData.result);
        if(userData.result.gender === null || userData.result.birth === null) {
            signUp.current = true;
        }else {
            signUp.current = false;
            navigate('/home');
        }
    } catch {
        signUp.current = false;
        navigate('/login');
    }
  };

  const infoSubmit = async () => {
    if (!isValid) return alert("유효하지 않은 생년월일입니다.");
    if(gender === '') return alert("성별을 선택해주세요.");
    try {
        fetch(`${Server_IP}/api/v1/user`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gender: gender, birth: formatToDashDate(inputBirth) }),
        });
        navigate('/home');
    } catch {
        alert("정보 입력 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
      loadUserData();
  }, []);

  return (
    <div className='login-contents'>
      <div className='contents-title'>
        <p className='title-introduce'>나만의 팝콘친구</p>
        <img src={logoImgsrc} alt="" />
        <p className='title-detail'>사용자 맞춤 영화 추천 서비스</p>
      </div>
      { signUp.current ? (
        <div className='contents-signup'>
          <p className='signup-title'>정보 입력</p>
          <p className='signup-detail'>회원님의 성별/나이를 입력해 주세요</p>
          <div className='signup-user-profile'>
            <img src={user.imageUrl} alt="프로필 이미지" />
          </div>
          <div className='signup-user-info'>
            <div className='signup-user-name'>
              <p className='signup-user-name-title'>이름</p>
              <div className="signup-user-name-text">{user.name}</div>
            </div>
            <div className='signup-user-gender'>
              <p className='signup-user-gender-title'>성별</p>
              <div className='signup-user-gender-option'>
                <div className='signup-user-gender-button' 
                  onClick={() => setGender('female')}
                  style={{borderColor: gender === 'female' ? '#1ED863' : 'transparent'}}
                >
                  여성
                </div>
                <div className='signup-user-gender-button' 
                  onClick={() => setGender('male')}
                  style={{borderColor: gender === 'male' ? '#1ED863' : 'transparent'}}
                >
                  남성
                </div>
              </div>
            </div>
            <div className='signup-user-birth'>
              <p className='signup-user-birth-title'>생년월일</p>
              <input 
                className="signup-user-birth-write"
                value={inputBirth}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 8) {
                    setInputBirth(value);

                    // 8자 입력 시 유효한 날짜인지 검사
                    if (value.length === 8) {
                      setIsValid(isValidDate(value));
                    } else {
                      setIsValid(true);
                    }
                  }
                }}
                placeholder="ex) 20020314"
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === 'Enter') e.preventDefault();
                }}
              />
            </div>
          </div>
          <div className='signup-button' onClick={() => {infoSubmit(); window.location.reload();}}>
            가입하기
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
}