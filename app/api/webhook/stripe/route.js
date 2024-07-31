import { plans } from "@/components/shared/Pricing";
import { headers } from "next/headers"
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const body = await req.text()

  const signature = headers().get('stripe-signature')

  let data;
  let eventType;
  let event;

  // verify stripe event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  data = event.data
  eventType = event.type

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        // Grant access to product, payment is successful
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ['line_items']
          }
        )

        const customerId = session?.customer
        const customer = await stripe.customers.retrieve(customerId)

        const priceId = session?.line_items?.data[0]?.price.id
        const plan = plans.find((p) => p.priceId === priceId)

        if (!plan) break

        let user

        if (customer.email) {
          await supabase
            .from('subscriptions')
            .upsert({
              user_email: customer.email,
              stripe_subscription_id: data.object.id,
              status: data.object.status
            })
        }

        break
      }
    }
  } catch (error) {

  }
}