import React, { useState, useEffect } from 'react';
import './css/WritePost.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function WritePost() {
    const auth2 = getAuth();
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate =  useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth2]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;

        try {
            const docRef = doc(db, 'board', title);
            const data = {
                content: content,
                time: formattedDate,
                author: user?.email || 'Anonymous'
            };
            await setDoc(docRef, data);
            console.log('Document written with ID: ', docRef.id); //콘솔에는 제목 출력(문서id)
            navigate('/home');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="post">
                    <label>제목</label>
                    <input
                        type="text"
                        className="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>내용</label>
                    <textarea
                        className="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" className="submit">제출</button>
                </fieldset>
            </form>
        </div>
    );
}

export default WritePost;
