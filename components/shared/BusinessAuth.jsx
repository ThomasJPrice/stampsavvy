'use client'

import { createClient } from "@/utils/supabase/client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import toast from "react-hot-toast"

const supabase = createClient()

async function signInWithEmail() {
  // sign in
}

const BusinessAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signUpWithEmail() {
    const data = {
      email: email,
      password: password
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    if(error) {
      toast.error(`Error signing up: ${error}`)
    } else {
      toast.success('Successfully signed up!')
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2 items-start">
      <Input type='email' placeholder='Email' className="max-w-[300px]" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Input type='password' placeholder='Password' className="max-w-[200px]" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={signUpWithEmail}>Sign Up</Button>
    </div>
  )
}

export default BusinessAuth