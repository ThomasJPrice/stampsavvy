import { getBusinessDetails } from "@/utils"

const CustomiseCard = async () => {
  const businessData = await getBusinessDetails()

  return (
    <div className="p-4">
      <h1>Customise your Loyalty Card Campaign!</h1>

      <div className="mt-4">
        <p>{businessData.name}</p>
        <p>{businessData.belongsTo}</p>
        <pre>{JSON.stringify(businessData.cardInfo, null, 2)}</pre>
      </div>
    </div>
  )
}

export default CustomiseCard