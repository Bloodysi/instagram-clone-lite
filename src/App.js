import React, { useState, useEffect } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import './App.css';

import Header from './components/Header/Header';
import Post from './components/Post/Post';
import SignUpForm from './components/authenticationForm/SignUpForm';
import SignInForm from './components/authenticationForm/SignInForm';
import PostForm from './components/PostForm/PostForm'
import Modal from '@material-ui/core/Modal';
import LogOut from './components/authenticationForm/LogOut';

import { db, auth } from './firebase';

function App() {
 
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openLogOut, setOpenLogOut] = useState(false)
  const [postForm, setPostForm] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')

  console.log(username)

  useEffect(()=> {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        setUser(authUser)

        if(authUser.displayName !== null){
          setUsername(authUser.displayName)
        }else{          
          return authUser.updateProfile({
            displayName: username
          })
        }

      }else{
        setUser(null)
      }
    })
  }, [username])

  useEffect(()=> {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
    })
  }, [])

  const openModal = () => {
    setOpen(true)
  }

  const openSignInModal = () => {
    setOpenSignIn(true)
  }

  const openLogOutModal = () => {
    setOpenLogOut(true)
  }

  const handleSignUp = (e, data) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(data.email, data.password)
    .catch(error => alert(error.message))

    setOpen(false)
  }

  const handleSignIn = (e, data) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(data.email, data.password)
    .catch(error => alert(error.message))
    setOpenSignIn(false)
  }


  return (
    <div className="app">

      {/* MODALS */}

      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <SignUpForm onSignUp={handleSignUp} username={username} setUsername={setUsername} />
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <SignInForm onSignIn={handleSignIn}/>
      </Modal>

      <Modal
        open={openLogOut}
        onClose={()=> setOpenLogOut(false)}
      >
        <LogOut openLogOut={setOpenLogOut} setUsername={setUsername} />
      </Modal>

      {/* HEADER */}

      <Header 
        openModal={openModal} 
        openSignInModal={openSignInModal} 
        openLogOut={openLogOutModal}
        user={user}
        username={username}
        setPostForm={setPostForm}
        />

      {/* BODY */}
      {
        user?.displayName
        ?
        <PostForm username={username} active={postForm} setPostForm={setPostForm} />
        :
        null
      }
      
      <div className='cont'>

        <div className='app__posts'>

          <div className='app__posts-leftside'>
            {
              posts.map(({id, post}) => (
                <Post
                  key={id}
                  postId={id}
                  username= {post.username}
                  caption= {post.caption}
                  imageUrl= {post.imageUrl}
                  user_username={username}
                />              
              ))
            }
          </div>
          
          <div className='app__posts-rightside'>
            <InstagramEmbed 
              url='https://www.instagram.com/p/B_uf9dmAGPw/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
