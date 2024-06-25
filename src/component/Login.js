import React, { useState } from 'react';
import { auth } from '../firebase';
import './css/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 입력 값 유효성 검사
        if (loginEmail.trim() === '' || loginPassword.trim() === '') {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            console.log('성공');
            navigate('/home'); // 로그인 후 메인 홈으로 이동
        } catch (error) {
            console.log(error.message);
            setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <div className='Login'>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ID</label>
                        <input 
                            className='loginInput' 
                            type='text' 
                            placeholder='아이디' 
                            onChange={(event) => setLoginEmail(event.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            className='passwordInput' 
                            type='password' 
                            placeholder='password' 
                            onChange={(event) => setLoginPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
