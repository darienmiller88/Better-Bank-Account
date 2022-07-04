import React, { useState } from 'react'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm';

export default function FormWrapper() {
    const [isSigningIn, setIsSigningIn] = useState(true);   

    return (
        <>
            {
                isSigningIn
                ?
                <SigninForm changeToSignup={() => setIsSigningIn(!isSigningIn)} />
                :
                <SignupForm changeToSignin={() => setIsSigningIn(!isSigningIn)} />
            }
        </>
    )
}
