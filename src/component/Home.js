import React from "react";
import './css/Home.css';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleRegisterClick = () => {
        navigate('/register');
    };
    return (
        <div className="Home">
            <div className='RegisterButton'>
                <button className='login' onClick={handleLoginClick}>로그인</button>
                <button className='register' onClick={handleRegisterClick}>회원가입</button>
            </div>
    </div>
    );
}

export default Home;