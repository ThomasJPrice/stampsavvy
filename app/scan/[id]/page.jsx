import { QrScanner } from "@/components/shared"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

const Scan = async ({ params }) => {
  const businessId = params.id

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {data } = await supabase.from('businesses').select().match({ id: businessId }).single()

  console.log(data);

  if (!data) return <div className="p-4">No business found.</div>

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">Scan Loyalty Card</p>

      <div className="my-4">
        <p>Name: {data.name}</p>
      </div>

      <QrScanner />
    </div>
  )
}

export default Scan