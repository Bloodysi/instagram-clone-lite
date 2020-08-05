import React, { useState, forwardRef } from 'react';

import { Input, Button } from '@material-ui/core';
import { useStyles, getModalStyle } from './formStyles'

const SignInForm = forwardRef(({ onSignIn }, ref) => {

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (

    <div ref={ref} style={modalStyle} className={classes.paper}>
      <form className='signForm' onSubmit={(e)=> onSignIn(e, {email, password })}>
        <center>

          <img 
            src='https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
            alt='instagram logo' 
            className='b-10'
          />

        </center>
        <center className='column'>

          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className='b-10'
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className='b-10'
          />

          <Button
            type='submit'
            color='secondary'
          >
            Sign In
          </Button>
          
        </center>
      </form>
        </div>
  )
});

export default SignInForm;
