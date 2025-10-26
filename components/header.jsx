import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  const {isLoading} =useStoreUser();
  return (
    <header className="fixed top-0 w-full border-b bg-amber-400 backdrop-blur z-50 supports-[backdrop-filter]:bg-amber-100">     
      <SignedOut>
              <SignInButton/>
            <SignUpButton>
                <Button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </Button>
            </SignUpButton>
      </SignedOut>
      <SignedIn>
            <UserButton />
      </SignedIn>
      </header>
  )
}

export default Header