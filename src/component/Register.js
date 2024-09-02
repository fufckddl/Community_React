import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

import './css/Register.css';

function Register() {

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            // Firestore에서 닉네임 중복 확인
            const q = query(collection(db, "users"), where("displayName", "==", registerName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("닉네임이 이미 사용 중입니다. 다른 닉네임을 선택해주세요.");
                return; // 닉네임 중복 시 회원가입 진행 중단
            }

            // 닉네임이 중복되지 않은 경우
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = userCredential.user;
            
            if (user) {
                await updateProfile(user, { displayName: registerName });

                // Firestore에 사용자 정보 저장
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: user.email,
                    displayName: registerName,
                });

                navigate('/home');
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <div>
            <h1>회원가입 페이지</h1>
            <div className='Register'>
                <form className='RegisterForm' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>아이디</label>
                        <input 
                            type='email' 
                            placeholder='아이디 (이메일)' 
                            value={registerEmail}
                            onChange={(event) => setRegisterEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>비밀번호</label>
                        <input 
                            type='password' 
                            placeholder='비밀번호'
                            value={registerPassword}  
                            onChange={(event) => setRegisterPassword(event.target.value)} 
                        />
                    </div>
                    <div className='form-group'>
                        <label>닉네임</label>
                        <input 
                            type='text' 
                            placeholder='닉네임'
                            value={registerName}  
                            onChange={(event) => setRegisterName(event.target.value)} 
                        />
                    </div>
                    <button type="submit">가입하기</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Register;
