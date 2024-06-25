// component/Register.js
import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

import './css/Register.css';

function Register() {

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    //const [registerName, setRegisterName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
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
                            onChange={(event) => setRegisterEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>비밀번호</label>
                        <input 
                            type='password' 
                            placeholder='비밀번호'  
                            onChange={(event) => setRegisterPassword(event.target.value)} 
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
