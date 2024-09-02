import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";

function MyPost() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const handlePostId = (postid) => {
        navigate(`/post/${postid}`)
    }

    useEffect(() => {
        //현재 사용자 불러옴
        const auth = getAuth();
        //현재 사용자 상태를 감지하고 'user'상태를 설정
        //auth = Firebase Authentication 인스턴스
        //콜백함수: currentUser를 인자로 받음
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //사용자가 존재하면 setUser를 사용해 user업데이트하고, fetchUserPosts함수 호출하고
            //인자에 현재 사용자 이메일(아이디)를 넣음
            if (currentUser) {
                setUser(currentUser);
                fetchUserPosts(currentUser.displayName);
            //사용자를 찾을 수없다면 user를 초기화하고 post를 빈배열로 설정
            //사용자가 로그아웃하면 null로 처리
            } else {
                setUser(null);
                setPosts([]);
            }
        });
        //메모리 누수 방지 및 불필요한 이벤트 리스너가 남지 않도록함.
        return () => unsubscribe();
        //useEffect의 두번 째 인자인 의존성 배열인 []는 []안의 값이 변경될때마다
        //useEffect 훅이 다시 실행되도록함, 하지만 일반적으로 []안의 값은 변경되지 않아
        //useEffect 훅은 컴포넌트가 처음 마운트 될때 한번만 실행됨.
    }, []);

    const fetchUserPosts = async (userName) => {
        if(!userName) return;
        //qurery함수는 Firesotre의 콜랙션 함수와 where조건을 사용해서 특정 조건에 맞는
        //문서를 검색하는 쿼리를 생성(board컬랙션에서 author필드가 userEmail과 동일한 문서 찾음)
        const q = query(collection(db, 'board'), where('author', '==', userName));
        //getDocs는 주어진 쿼리를 실행해서 해당 조건에 맞는 문서의 스냅샵을 가져옴
        const querySnapshot = await getDocs(q);
        //querySnapshot에서 문서를 순회하여 각 문서의 id와 데이터를 추출하고, 이를 배열로 변환해
        //userPosts에 저장함, 그 후 setPosts함수를 사용하여 posts 상태 업데이트
        const userPosts = querySnapshot.docs.map(doc => ({
            //doc.data에는 id값이 없으므로 userPosts에서  id를 추가하는 것임! (... <-)
            id: doc.id, //문서의 id를 포함
            ...doc.data() //문서의 모든 데이터 포함
        }));
        setPosts(userPosts);
    };

    return (
        <div>
        <div className="all_post_area">
            <ol className="all_post_lists">
                <h1>내 게시글</h1>
                {posts.map(post => (
                    <div className="all_post_block">
                        <li className="all_post_title" onClick={() => handlePostId(post.id)}>제목: {post.title || post.id}</li>
                        <li className="all_post_time">작성시간: {post.time}</li>
                        <li className="all_post_author">작성자: {post.author}</li>
                    </div>
                        
                    ))}
                    </ol>
        </div>
    </div>
    );
}

export default MyPost;
