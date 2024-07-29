import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createGooglePass, testGooglePass } from "@/utils/googlePasses"

async function handleNameSubmit(formData) {
  'use server'

  const name = formData.get('name')

  const pass = await createGooglePass(name)
  // const pass = await testGooglePass(name)

  console.log(pass);
}

const AddCard = async () => {
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