import React from 'react'
import {Redirect} from 'react-router-dom'

export default function Login() {
  function renderRedirect() {
    //Condition for validate user y/o save cookie autentication
    return 'Login'
  }

  return <div>{renderRedirect()}</div>
}
