import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createUniqueCardId, getBusinessDetails } from "@/utils"
import { createGooglePass, testGooglePass } from "@/utils/googlePasses"

const AddCard = async ({ searchParams }) => {
  async function handleNameSubmit(formData) {
    'use server'
  
    const name = formData.get('name')
    const businessDetails = await getBusinessDetails(searchParams.business)

    const cardId = await createUniqueCardId()
    
    const pass = await createGooglePass(name, cardId, businessDetails)
    // const pass = await testGooglePass(name)
  
    console.log(pass);
  }

  return (
    <div className="p-4">
      <form>
        <label htmlFor="name">First name:</label>
        <Input name='name' id='name' type='text' required className='max-w-[200px]' />

        <Button formAction={handleNameSubmit}>Sign me up!</Button>
      </form>

      {/* {pass && <a href={pass}>Add to Google Wallet</a>} */}
    </div>
  )
}

export default AddCard