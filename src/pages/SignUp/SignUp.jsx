import React, { useState } from 'react'; // Asegúrate de importar useState
import './SignUp.css';
import SignUpForm from '../../Components/SignUpForm/SignUpForm'

function SignUp() {
  ;

  return (
    <>
      <div className='sign-up-form-container'>
        <SignUpForm />
      </div>

    </>
  );
}

export default SignUp;
