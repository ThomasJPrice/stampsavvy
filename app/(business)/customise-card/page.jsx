import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBusinessDetails, updateCardInfo } from "@/utils"
import { updateGooglePassClass } from "@/utils/googlePasses";

const CustomiseCard = async ({ searchParams }) => {
  const businessData = await getBusinessDetails(searchParams.id)

  async function handleFormSave(formData) {
    'use server'

    var cardInfo = {};
    formData.forEach(function (value, key) {
      cardInfo[key] = value;
    });
  
    await updateCardInfo(searchParams.id, cardInfo)
    await updateGooglePassClass(searchParams.id, cardInfo, businessData)
  }

  const cardInfo = businessData.cardInfo

  return (
    <div className="p-4">
      <h1>Customise your Loyalty Card Campaign!</h1>

      <form className="mt-4 flex flex-col items-start max-w-[300px] gap-1">
        {/* add placeholders */}

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
      </form>
    </div>
  )
}

export default CustomiseCard