import React from 'react'
import backImgsrc from '/images/loginBackground.png'
import '../styles/login/login.css'
import Contents from '../components/login/contents'

export default function Login() {
  return (
    <div className='login' style={{backgroundImage: `url(${backImgsrc})`}}>
      <Contents />
    </div>
  )
}
