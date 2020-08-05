import React, { useState } from 'react';
import './PostForm.css';
import { Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import firebase from 'firebase';
import { storage, db } from '../../firebase';

const PostForm = ({ username, active, setPostForm }) => {

  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error => {
        alert(error.message)
      }),
      ()=> {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              caption: caption,
              username
            })

            setImage(null)
            setCaption('')
            setProgress(0)
          })
      }

    )
  }

  return (
    <div className={`postForm ${active ? 'postFormActive' : 'postFormDesactive'}`}>

      <IconButton className='post__close-btn' onClick={()=> setPostForm(false)}>
        <CloseIcon color='secondary' />
      </IconButton>

      <h1 className='b-10 postForm__title'>Upload Post</h1>

      <input 
        type='file'
        onChange={(e)=> handleChange(e)} 
        className='w-50 post__file'
      />

      <textarea
        placeholder='Enter a caption...' 
        value={caption} 
        onChange={(e)=> setCaption(e.target.value)}
        className='post__caption w-50 postForm__input'
      />      

      <progress value={progress} max='100' className='w-50'/>
      
      <Button onClick={handleUpload} disabled={!image}>
        Upload
      </Button>
      
    </div>
  )
}

export default PostForm
