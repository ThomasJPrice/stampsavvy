'use client'

import { createClient } from "@/utils/supabase/client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"

const supabase = createClient()

async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: 'thomasjprice2@gmail.com',
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
      emailRedirectTo: 'https://example.com/welcome',
    },
  })
}

const BusinessAuth = () => {
  const [email, setEmail] = useState('')

  return (
    <div className="flex gap-2 mt-4">
      <Input type='email' placeholder='Email' className="max-w-[300px]" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={signInWithEmail}>Submit</Button>
    </div>
  )
}

export default BusinessAuth