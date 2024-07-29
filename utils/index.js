import { cookies } from "next/headers"
import { createClient } from "./supabase/server"
import { currentUser } from "@clerk/nextjs/server"

const cookieStore = cookies()
const supabase = createClient(cookieStore)

export const getBusinessDetails = async (id) => {
  const { data, error } = await supabase.from('businesses').select().match({ id: id }).single()

  return data
}

export const updateCardInfo = async (id, data) => {
  console.log(id, data);

  try {
    const { error } = await supabase
      .from('businesses')
      .update({ cardInfo: data })
      .match({ id: id });

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error('Error updating info:', error.message);
  }
}

export async function createUniqueCardId() {
  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  let isUnique = false;
  let newId;

  while (!isUnique) {
    newId = generateRandomId();
    const { data, error } = await supabase
      .from('loyaltyCards')
      .select('id')
      .eq('id', newId);

    if (error) {
      console.error('Error checking ID:', error);
      throw error;
    }

    if (data.length === 0) {
      isUnique = true;
    }
  }

  return newId;
}

export const createNewCard = async (data) => {
  try {
    const { error } = await supabase.from('loyaltyCards').insert(data)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error creating loyalty card:', error.message);
  }
}