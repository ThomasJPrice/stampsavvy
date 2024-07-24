import { UserQR } from "@/components/shared"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

const LoyaltyCard = async ({ params }) => {
  const userId = params.id

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {data } = await supabase.from('loyaltyCards').select().match({ id: userId }).single()

  console.log(data);

  if (!data) return <div className="p-4">No loyalty card found.</div>

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">Loyalty Card</p>

      <div className="my-4">
        <p>Name: {data.customer_name}</p>
        <p>Points: {data.points}</p>
        <p>Business Rel: {data.business}</p>
      </div>

      <UserQR userId={userId} />
    </div>
  )
}

export default LoyaltyCard