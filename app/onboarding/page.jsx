import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Onboarding = () => {

  return (
    <SignedIn>
      <div className='p-4'>
        <h1>Onboarding</h1>
      </div>
    </SignedIn>
  )
}

export default Onboarding