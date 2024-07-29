import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { createClient } from '@/utils/supabase/client'
import { SignedIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

const supabase = createClient()

async function handleNameSubmit(formData) {
  "use server"

  const user = await currentUser()
  const userEmail = user.emailAddresses[0].emailAddress

  const { data: existingBusiness, error } = await supabase.from('businesses').select().match({ belongsTo: userEmail })

  console.log(existingBusiness);

  if (existingBusiness.length > 0) {
    console.log('Already exists.');
    redirect(`/customise-card?id=${existingBusiness[0].id}`)
  }

  const businessData = {
    name: formData.get('name'),
    cardInfo: {},
    belongsTo: userEmail
  }

  try {
    const { error } = await supabase
      .from('businesses')
      .insert(businessData)
    if (!error) {
      console.log('Business Created!');
    }
  } catch (error) {
    console.log(`Error: ${error}`)
  } finally {
    const { data } = await supabase.from('businesses').select().match({ belongsTo: userEmail })

    redirect(`/customise-card?id=${data[0].id}`)
  }
}

const Onboarding = () => {

  return (
    <SignedIn>
      <div className='p-4'>
        <h1>Onboarding</h1>

        <form className='mt-4 space-y-2'>
          <label htmlFor="name">Enter your business name:</label>
          <Input id='name' name='name' type='text' required className='max-w-[300px]' />

          <Button formAction={handleNameSubmit}>Submit</Button>
        </form>
      </div>
    </SignedIn>
  )
}

export default Onboarding