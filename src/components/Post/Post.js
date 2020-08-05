import React, { useState, useEffect } from 'react';
import './Post.css';

import { db } from '../../firebase';
import Avatar from '@material-ui/core/Avatar';

const Post = ({ postId, username, caption, imageUrl, user_username }) => {

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(()=> {
    db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, comment: doc.data() })))
    })
  }, [postId])


  const postComment = e => {
    e.preventDefault()
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user_username
    })
    .catch(error => alert(error.message))
    setComment('')
  }

  return (
    <div className='post'>

      <div className='post__header'>
        <Avatar 
          className='post__avatar' 
          alt={username} 
          src="/static/images/avatar/1.jpg" 
        />
        <h4 className='post__header-username'>{username}</h4>
      </div>

      <img 
        className='post__image'
        src={imageUrl}
        alt='' 
      />

      <h4 className='post__text'><strong>{username}:</strong> {caption}</h4>

      <div className='post__commentBox'>
        {
          comments.map(({id, comment}) => (
            <h4 key={id} className='post__text'><strong>{comment.username}:</strong> {comment.text}</h4>
          ))
        }
      </div>

      {
        user_username 
        && (
          <form className='post__commentForm' onSubmit={(e)=> postComment(e)}>
            <input 
              className='post__commentForm-input' 
              type='text' placeholder='write a comment...' 
              value={comment} 
              onChange={(e)=> setComment(e.target.value)}
            />
            <button disabled={!comment} className='post__commentForm-button' type='submit'>Post</button>
          </form>
        )
      }
      
    </div>
  )
};

export default Post;
