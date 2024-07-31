'use client'

import { Button } from "../ui/button"

const PricingGrid = () => {
  const handleCheckout = async (priceId) => {
    console.log(`Create session with: ${priceId}`);
  }

  return (
    <div className="flex mt-4 gap-8">
      <div className="flex flex-col w-[200px] text-center gap-2">
        <p>Monthly</p>
        <p>£35 per month</p>

        <Button onClick={() => handleCheckout('prod_QZhN3SZSOcaRWV')}>Get Started</Button>
      </div>

      <div className="flex flex-col w-[200px] text-center gap-2">
        <p>Yearly</p>
        <p>£350 per year (save £70!)</p>

        <Button onClick={() => handleCheckout('prod_QZhNbL59TOqhJQ')}>Get Started</Button>
      </div>
    </div>
  )
}

export default PricingGrid