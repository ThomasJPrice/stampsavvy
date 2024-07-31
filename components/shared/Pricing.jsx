'use client'

import { useState } from "react"
import { Button } from "../ui/button"

export const plans = [
  // monthly
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_00g01X3cm2M13EQcMM'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1PiXyaLt42gOHyJ293dl44la'
        : '',
    price: 35,
    duration: '/month',
    title: 'Monthly'
  },

  // yearly
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_6oEbKF4gqfyNgrC145'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1PiZBoLt42gOHyJ2fJPcdFPB'
        : '',
    price: 350,
    duration: '/year',
    title: 'Yearly'
  }
]

const Pricing = ({ email }) => {
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

        <a href={plan.link + '?prefilled_email=' + email} className="w-full">
          <Button>
            Subscribe
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Pricing