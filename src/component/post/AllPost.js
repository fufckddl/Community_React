import React, { useState, useEffect } from "react";
import {
    collection,
    getDocs,
} from 'firebase/firestore';
import { db } from "../../firebase";
import './css/AllPost.css';
import { useNavigate } from "react-router-dom";


function AllPost(){
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const fetchPost = async () => {
        const postCollectionRef = collection(db, 'board');
        const postSnap = await getDocs(postCollectionRef);

        const data = postSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        setPosts(data);
    }
    const handlePostId = (postid) => {
        navigate(`/post/${postid}`)
    }
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div>
            <div className="all_post_area">
                <ol className="all_post_lists">
                    <h1>전체 게시글</h1>
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

/**
 *             <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.id}</h2> {/* 제목을 표시하려면 post.id 대신 post.title 사용 }
                            <p>{post.content}</p>
                            <p>{post.time}</p>
                            <p>{post.author}</p>
                        </li>
                    ))}
                </ul>
                */

export default AllPost;