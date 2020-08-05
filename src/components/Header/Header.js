import React from 'react';
import './Header.css';

import { Button, IconButton, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

const Header = ({ user, username, setPostForm, openModal, openSignInModal, openLogOut }) => { 

  return (
    <div className='app__header'>

      <div className='cont'>
        <nav className='app__header_nav'>
          <img 
            className='app__header_logo'
            src={'https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} 
            alt='instagram logo' 
          />
          
          {
            user
            ?
            <ul className='app__header_list'> 

              <li>
                <IconButton onClick={()=> setPostForm(true)} className='btn'>
                  <AddIcon />
                </IconButton>
              </li>
              <li onClick={()=> openLogOut(true)} >{username}</li>
              <li><Avatar onClick={()=> openLogOut(true)} /></li>

            </ul>
            :
            <ul className='app__header_list'>
              <li>
                <Button onClick={openSignInModal} className='btn'>
                  Sign in
                </Button>
              </li>
              <li>
                <Button onClick={openModal} className='btn'>
                  Sign up
                </Button>
              </li>
            </ul>
          }
          
        </nav>
      </div>
        
    </div>
  )
};

export default Header;
