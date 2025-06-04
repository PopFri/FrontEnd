import React, { useState } from 'react'
import backgroundSrc from '/images/myPageBackground.png'
import settingIconSrc from '/images/settingIcon.png'
import "../../styles/myPage/profile.css";
import ResignModal from './ResignModal';
import InitDataModal from './InitDataModal';
import { useNavigate } from 'react-router-dom';

export default function Profile({user}) {
    const Server_IP = import.meta.env.VITE_SERVER_IP;
    const navigate = useNavigate();
    const logout = async() => {
        try {
            await fetch(`${Server_IP}/api/v1/user/logout`, {
                method: 'DELETE',
                credentials: 'include',
            });
            navigate('/login');
        } catch (err) {
            console.error('로그아웃 실패:', err);
        }
        navigate('/login');
    }
    
    const handleDeleteAccount = async() => {
        try {
            await fetch(`${Server_IP}/api/v1/user`, {
                method: 'DELETE',
                credentials: 'include',
            });
            navigate('/login');
        } catch (err) {
            console.error('회원탈퇴 실패:', err);
        }
    };

    const handleDeleteData = async() => {
        try {
            await fetch(`${Server_IP}/api/v1/user/data`, {
                method: 'DELETE',
                credentials: 'include',
            });
            window.location.reload();
        } catch (err) {
            console.error('데이터 삭제 실패:', err);
        }
    };


    const [isSetting, setSetting] = useState(false);
    const [isResign, setResign] = useState(false);
    const [isInitData, setInitData] = useState(false);
    return (
        <>
            {user && (
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
                                onClick={() => setResign(true)}>
                                    회원 탈퇴
                                </button>
                                <button type="button" className='detail-danger'
                                onClick={() => setInitData(true)}>
                                    데이터 삭제
                                </button>
                                <button type="button" className='detail-cancel' onClick={()=>setSetting(false)}>취소</button>
                            </div>:
                            <button type="button" className='detail-logout'
                            onClick={() => logout()}>
                                로그아웃
                            </button>
                        }
                    </div>
                    {isSetting ? null : <img src={settingIconSrc} alt="" className='profile-setting' onClick={()=>setSetting(true)}/>}
                </div>
            )}
            {isResign ? <ResignModal setModal={setResign} handleDeleteAccount={handleDeleteAccount}/> : null }
            {isInitData ? <InitDataModal setModal={setInitData} handleDeleteData={handleDeleteData}/> : null }
        </>
    )
}
