import React, { useState } from "react";
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import line3 from './img/line3.png';

function Home(){

    const navigate = useNavigate();
    const [isOpen, setMenu] = useState(false); //메뉴 초기값 false 설정

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleRegisterClick = () => {
        navigate('/register');
    };
    const handlePostClick = () => {
        navigate('/allpost');
    };
    const handleMenuClick = () => {
        setMenu(isOpen => ! isOpen); //on, off 개념 boolean
    }
    return (
        <div className="Home">
            <div className="toggleMenu">
                <ul>
                    <li><img className="menu" src={line3} alt="메뉴바" onClick={handleMenuClick}/></li>
                </ul>
                <ul className={isOpen ? 'show-menu' : 'hide-menu'}>
                    <li>메뉴1
                        <ul>
                            <li>메뉴1_1</li>
                            <li>메뉴1_2</li>
                            <li>메뉴1_3</li>
                        </ul>
                    </li>
                    <li>메뉴2
                        <ul>
                            <li>메뉴2_1</li>
                            <li>메뉴2_2</li>
                            <li>메뉴2_3</li>
                        </ul>
                    </li>
                    <ul>
                        <li>
                            <button className='login' onClick={handleLoginClick}>로그인</button>
                            <button className='register' onClick={handleRegisterClick}>회원가입</button>
                        </li>
                    </ul>
                </ul>
            </div>
            
            <div className="MenuBar">
                <button className="home_post" onClick={handlePostClick}>게시판</button>
                
                
            </div>
    </div>
    );
}

export default Home;