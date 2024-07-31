'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { plans } from "@/utils/constants"

function setLocalStorage(key, content) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, content)
  }
}

function getLocalStorage(key) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key)
    return data
  }
}

const Pricing = () => {
  const [plan, setPlan] = useState(plans[0])

  if (!getLocalStorage('selectedPlan')) {
    setLocalStorage('selectedPlan', JSON.stringify(plans[0]))
  }

  const handlePlanChange = () => {
    if (plan.title === 'Monthly') {
      setPlan(plans[1])
      setLocalStorage('selectedPlan', JSON.stringify(plans[1]))
    } else {
      setPlan(plans[0])
      setLocalStorage('selectedPlan', JSON.stringify(plans[0]))
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <Button variant='secondary' onClick={handlePlanChange}>
          {plan.title === 'Monthly' ? 'Switch to Yearly' : 'Switch to Monthly'}
        </Button>
      </div>

      <div className="flex flex-col w-[200px] text-center gap-2">
        <p>{plan.title}</p>
        <p>£{plan.price} per {plan.duration.replace('/', '')}</p>

        <a href={`/sign-up`} className="w-full">
          <Button>
            Get Started
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Pricing