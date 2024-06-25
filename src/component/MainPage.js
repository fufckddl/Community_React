import { useEffect, useState } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import './css/MainPage.css';
import myImg from './img/userImg.png';
import { useNavigate } from "react-router-dom";

function MainPage() {
    const auth2 = getAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []); // 빈 배열로 의존성을 제거하여 한 번만 호출되도록 설정

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <div className="html">
            {user && (
                <div className="subMenu">
                    <div className="imageContainer">
                        <img src={myImg} alt="User" className="myImg" />
                    </div>
                    <p className="myId">아이디 : {user?.email}</p>
                    <button className="logOut" onSubmit={logout} onClick={handleLogoutClick}>로그아웃</button>
                </div>
            )}
        </div>
    );
}

export default MainPage;