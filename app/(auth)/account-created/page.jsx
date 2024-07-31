'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AccountCreated = () => {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const email = user.emailAddresses[0].emailAddress

  let plan

  if (typeof window !== 'undefined') {
    plan = localStorage.getItem("selectedPlan") ? JSON.parse(localStorage.getItem("selectedPlan")) : null;
  }
  
  const url = plan.link + '?prefilled_email=' + email

  router.push(url)

  return (
    <div className="p-4">Redirecting to checkout...</div>
  )
}

export default AccountCreated
