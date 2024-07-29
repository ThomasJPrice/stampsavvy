import { cookies } from "next/headers"
import { createClient } from "./supabase/server"
import { currentUser } from "@clerk/nextjs/server"

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export const getBusinessDetails = async (id) => {
  const { data, error } = await supabase.from('businesses').select().match({ id: id }).single()

  return data
}