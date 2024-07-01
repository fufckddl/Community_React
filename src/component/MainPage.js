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

    const handlewritePost = () => {
        navigate('/writepost');
    }
    const handlemyPost = () => {
        navigate('/mypost');
    }
    const handleAllPost = () => {
        navigate('/allpost');
    }
    const handlemyInfo = () => {
        navigate('/myinfo');
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth2]); // 빈 배열로 의존성을 제거하여 한 번만 호출되도록 설정

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
                    <p className="myId">닉네임 : {user.displayName}</p>
                    <button className="logOut" onSubmit={logout} onClick={handleLogoutClick}>로그아웃</button>
                    <button className="writePost" onClick={handlewritePost}>글 작성</button>
                    <button className="myPost" onClick={handlemyPost}>내 글</button>
                    <button className="allPost" onClick={handleAllPost}>전체 글</button>
                    <button className="myInfo" onClick={handlemyInfo}>내 정보</button>
                </div>
            )}
        </div>
    );
}

export default MainPage;
