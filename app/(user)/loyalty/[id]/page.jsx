import { DynamicImage, UserQR } from "@/components/shared"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

// TO BE REMOVED

const LoyaltyCard = async ({ params }) => {
  const userId = params.id

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.from('loyaltyCards').select().match({ id: userId }).single()

  if (!data) return <div className="p-4">No loyalty card found.</div>

  const { data: businessData } = await supabase.from('businesses').select().match({ id: data.business}).single()

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">{businessData.cardInfo.campaign_name}</p>

      <div className="my-4">
        <p>Name: {data.customer_name}</p>
        <p>Points: {data.points}</p>
        <p>Business: {businessData.name}</p>
      </div>

      <DynamicImage
        cardData={data}
        businessData={businessData}
      />
    </div>
  )
}

export default LoyaltyCard