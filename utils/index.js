import { cookies } from "next/headers"
import { createClient } from "./supabase/server"
import { currentUser } from "@clerk/nextjs/server"

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export const getBusinessDetails = async () => {
  const user = await currentUser()

  const emailAddress = user.emailAddresses[0].emailAddress

  const { data, error } = await supabase.from('businesses').select().match({ belongsTo: emailAddress }).single()

  return data
}