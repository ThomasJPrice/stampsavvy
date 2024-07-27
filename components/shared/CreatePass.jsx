import { createGooglePass } from "@/utils/googlePasses"

const CreatePass = async () => {
  const pass = await createGooglePass()
  
  return (
    <div>
      {pass && <a href={pass}>Add to Google Wallet</a>}
    </div>
  )
}

export default CreatePass