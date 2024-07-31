'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { plans } from "@/utils/constants"

const Pricing = () => {
  const [plan, setPlan] = useState(plans[0])

  const handlePlanChange = () => {
    if (plan.title === 'Monthly') {
      setPlan(plans[1])
    } else {
      setPlan(plans[0])
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

        <a href={`/sign-up?forceRedirectUrl=${plan.link}`} className="w-full">
          <Button>
            Get Started
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Pricing