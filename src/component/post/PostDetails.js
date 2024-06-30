import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './css/PostDetails.css';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'board', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <div className='detail_post_container'>
            <div className='detail_post_area'>
            <h2 className='detail_post_title'>{id}</h2>
            <div className='detail_post_meta'>
              <p className='detail_post_author'>작성자 {post.author}</p>
              <p className='detail_post_time'>{post.time}</p>
            </div>
            <hr />
            <p className='detail_post_content'>{post.content}</p>
          </div>
          </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostDetails;
