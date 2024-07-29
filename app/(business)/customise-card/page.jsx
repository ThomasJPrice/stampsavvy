import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBusinessDetails, updateCardInfo } from "@/utils"
import { updateGooglePassClass } from "@/utils/googlePasses";

const CustomiseCard = async ({ searchParams }) => {
  const businessData = await getBusinessDetails(searchParams.id)
  console.log(businessData);

  async function handleFormSave(formData) {
    'use server'

    var cardInfo = {};
    formData.forEach(function (value, key) {
      cardInfo[key] = value;
    });
  
    await updateCardInfo(searchParams.id, cardInfo)
    await updateGooglePassClass(searchParams.id, cardInfo, businessData)
  }

  return (
    <div className="p-4">
      <h1>Customise your Loyalty Card Campaign!</h1>

      <form className="mt-4 flex flex-col items-start max-w-[300px] gap-1">
        {/* <p>{businessData.name}</p> */}
        {/* <p>{businessData.belongsTo}</p> */}
        {/* <pre>{JSON.stringify(businessData.cardInfo, null, 2)}</pre> */}
        <label htmlFor="campaign_name" className="mt-2">Campaign Name</label>
        <Input defaultValue='Buy 9 Coffees, Get 1 Free!' name='campaign_name' id='campaign_name' />

        <label htmlFor="unit" className="mt-2">Unit</label>
        <Input defaultValue='Beans' name='unit' id='unit' />

        <label htmlFor="reward" className="mt-2">Reward</label>
        <Input defaultValue='Free Coffee' name='reward' id='reward' />

        <label htmlFor="qty" className="mt-2">Quantity Until Reward</label>
        <Input defaultValue='9' name='qty' id='qty' type='number' />

        <label htmlFor="logo" className="mt-2">Logo</label>
        <Input defaultValue='https://...png' name='logo' id='logo' />

        <label htmlFor="bgColour" className="mt-2">Background Colour</label>
        <Input defaultValue='#ABC123' name='bgColour' id='bgColour' />


        <Button className='mt-4' formAction={handleFormSave}>Save</Button>
      </form>
    </div>
  )
}

export default CustomiseCard