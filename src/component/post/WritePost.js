import React, { useState, useEffect } from 'react';
import './css/WritePost.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase'; // storage 가져오기
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

function WritePost() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, `images/`);

    const auth2 = getAuth();
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth2]);

    useEffect(() => {
        listAll(imageListRef).then((resource) => {
            resource.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;

        try {
            let imageUrl = '';

            if (selectedImage) {
                const storageRef = ref(storage, `images/${selectedImage.name}`);
                await uploadBytes(storageRef, selectedImage);
                imageUrl = await getDownloadURL(storageRef);
                setImageList((prev) => [...prev, imageUrl]);
            }

            const docRef = doc(db, 'board', title);
            const data = {
                content: content,
                time: formattedDate,
                author: user.displayName || 'Anonymous',
                imageUrl: imageUrl,  // 이미지 URL 추가
            };

            await setDoc(docRef, data);
            console.log('Document written with ID: ', title);

            setImageList([]);
            setSelectedImage(null);
            setTitle('');
            setContent('');
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
                    <div className='image_select'>
                        <label className='label_input_file' for='input-file' >사진 업로드</label>
                        <input
                            type='file'
                            id='input-file'
                            style={{display:'none'}}
                            accept='.jpg, .png, .jpeg'
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </div>
                    {selectedImage && (
                        <div>
                            <p>선택된 파일: {selectedImage.name}</p>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="미리보기"
                                style={{ width: '100px', height: '100px' }}
                            />
                        </div>
                    )}
                    <button type="submit" className="submit">제출</button>
                </fieldset>
            </form>
        </div>
    );
}

export default WritePost;
