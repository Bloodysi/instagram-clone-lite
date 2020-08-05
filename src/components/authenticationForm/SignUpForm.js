import React, { useState, forwardRef } from 'react'

import { Input, Button } from '@material-ui/core';
import { useStyles, getModalStyle } from './formStyles'

const SignUpForm = forwardRef(({ onSignUp, username, setUsername }, ref) => {

  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalStyle] = useState(getModalStyle);

  return (

    <div ref={ref} style={modalStyle} className={classes.paper}>
          <form className='signForm' onSubmit={(e)=> onSignUp(e, { username ,email, password })}>
            <center>
              <img 
                src='https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' 
                alt='instagram logo' 
                className='b-10'
              />
            </center>

            <center className='column'>

              <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                className='b-10'
              />

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
                Sign up
              </Button>

            </center>
          </form>
        </div>
  )
})

export default SignUpForm
