'use client'

import { LoaderCircle, Minus, MinusCircle, PlusCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { createClient } from "@/utils/supabase/client"
import toast from "react-hot-toast"
import { updatePassPoints } from "@/utils/googlePasses"

const StampCard = ({ setData, loyaltyData, businessData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPoints, setCurrentPoints] = useState(loyaltyData.points)

  const supabase = createClient()

  const decreasePoints = () => {
    setCurrentPoints(currentPoints - 1)

    if (currentPoints <= 0) {
      setCurrentPoints(0)
    }
  }

  const updatePoints = async (points, message) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('loyaltyCards')
        .update({ points: points })
        .match({ id: loyaltyData.id });

      if (error) {
        throw error;
      }

      await updatePassPoints(points, businessData, loyaltyData.id)

      setData('No result');
      toast.success(message)
    } catch (error) {
      console.error('Error updating points:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const redeemReward = async () => {
    if (loyaltyData.points < businessData.cardInfo.qty) return

    var tempPoints = loyaltyData.points - businessData.cardInfo.qty

    setCurrentPoints(tempPoints)

    updatePoints(tempPoints, `${businessData.cardInfo.reward} redeemed!`)
  }

  return (
    <div>
      {/* rewards */}
      {loyaltyData.points >= businessData.cardInfo.qty ? (
        <div>
          <p>{businessData.cardInfo.reward} available.</p>
          <Button disabled={isLoading} className='mt-2' onClick={redeemReward}>{isLoading ? <LoaderCircle className="animate-spin" /> : `Use ${businessData.cardInfo.reward}`}
          </Button>
        </div>
      ) : <div><p>No rewards available.</p></div>}

      {/* qty */}
      <div className="flex gap-2 mt-4">
        <button onClick={decreasePoints}>
          <MinusCircle />
        </button>

        <p>{currentPoints}/{businessData.cardInfo.qty}</p>

        <button onClick={() => setCurrentPoints(currentPoints + 1)}>
          <PlusCircle />
        </button>
      </div>

      <Button disabled={isLoading} className='mt-4' onClick={() => updatePoints(currentPoints, 'Card Updated!')}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : 'Stamp Card'}
      </Button>
    </div>
  )
}

export default StampCard