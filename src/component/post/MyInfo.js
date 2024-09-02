import React, {useEffect, useState} from "react";
import { auth } from "../../firebase";
import {
    getAuth,
    onAuthStateChanged,
    updatePassword,
    signOut
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";


function MyInfo (){
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwerror, setError] = useState('');
    const auth2 = getAuth();

    const logout = async() => {
        await signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth2]); 

    const handleNewPassword = async(event) => {
        event.preventDefault();
        try{
            if(user){
                if(newPassword.length < 6)
                {
                    setError('6자리 이상 입력해주세요.');
                }else {
                    updatePassword(user, newPassword);
                    setError('변경 성공');
                    logout();
                    navigate('/');
                }
            }else{
                setError('사용자 확인 불가');
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <h1>내정보</h1>

            <ol>
                <li>닉네임: {user.displayName}</li>
                <li>아이디: {user.email}</li>
            </ol>
            <form onSubmit={handleNewPassword}>
                <input type="password" onChange={event => { setNewPassword(event.target.value)}} />
                <button type="submit">비밀번호 변경</button>
            </form>

            <form>
                <button>프로필 사진 변경</button>
            </form>
               
            {pwerror && <p className="error">{pwerror}</p>}
        </div>
    );

}

export default MyInfo;