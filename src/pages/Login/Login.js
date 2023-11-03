import React from 'react'
import './Login.css'
import { FormLogin } from '../../components/Forms/FormLogin'

export const Login = () => {
  return (
    <>
    <div className="login-container">
        <div className="login-background-image"></div>
        <div className="login-form">
          <div>
            <FormLogin/>
          </div>
        </div>
    </div>
    </>
  )
}
