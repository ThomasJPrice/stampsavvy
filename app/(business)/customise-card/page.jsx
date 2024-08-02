import { CustomiseCardForm } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBusinessDetails, updateCardInfo } from "@/utils"
import { updateGooglePassClass } from "@/utils/googlePasses";

async function handleFormSave(formData) {
  'use server'

  var cardInfo = {};
  formData.forEach(function (value, key) {
    cardInfo[key] = value;
  });

  await updateCardInfo(searchParams.id, cardInfo)
  await updateGooglePassClass(searchParams.id, cardInfo, businessData)
}

const CustomiseCard = async ({ searchParams }) => {
  const businessData = await getBusinessDetails(searchParams.id)

  if (!businessData) return <div className="p-4">No business with that ID found.</div>

  const cardInfo = businessData.cardInfo

  return (
    <div className="px-4 max-w-[1200px] mx-auto">
      <h1 className="text-primary text-2xl font-semibold text-center py-8">Customise your Loyalty Card Campaign!</h1>

      <CustomiseCardForm handleFormSave={handleFormSave} cardInfo={cardInfo} />

      {/* <form className="mt-4 flex flex-col items-start max-w-[300px] gap-1">

        <label htmlFor="campaign_name" className="mt-2">Campaign Name</label>
        <Input defaultValue={cardInfo.campaign_name} name='campaign_name' id='campaign_name' />

        <label htmlFor="unit" className="mt-2">Unit</label>
        <Input defaultValue={cardInfo.unit} name='unit' id='unit' />

        <label htmlFor="reward" className="mt-2">Reward</label>
        <Input defaultValue={cardInfo.reward} name='reward' id='reward' />

        <label htmlFor="qty" className="mt-2">Quantity Until Reward</label>
        <Input defaultValue={cardInfo.qty} name='qty' id='qty' type='number' />

        <label htmlFor="logo" className="mt-2">Logo</label>
        <Input defaultValue={cardInfo.logo} name='logo' id='logo' />

        <label htmlFor="bgColour" className="mt-2">Background Colour</label>
        <Input defaultValue={cardInfo.bgColour} name='bgColour' id='bgColour' />


        <Button className='mt-4' formAction={handleFormSave}>Save</Button>
      </form> */}
    </div>
  )
}

export default CustomiseCard