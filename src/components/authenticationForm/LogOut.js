import React, { useState, forwardRef } from 'react';

import { auth } from '../../firebase';
import { Button } from '@material-ui/core';
import { useStyles, getModalStyle } from './formStyles'

const LogOut = forwardRef((props, ref) => {

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  const handleLogOut = () => {
    auth.signOut()
    props.openLogOut(false)
    props.setUsername('')
  }

  return (
    <div ref={ref} style={modalStyle} className={`${classes.paper} center-center column modal__mobile`}>
      <h3 className='b-10' >Press the button for leave</h3>
      <Button 
        color='secondary' 
        variant='contained'
        onClick={()=> handleLogOut()}>Log Out</Button>
    </div>
  )
})

export default LogOut;
