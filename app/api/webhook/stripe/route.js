import { headers } from "next/headers"
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { plans } from "@/utils/constants";

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
              stripe_customer_id: customer.id,
              status: 'active'
            })
        }

        return NextResponse.json(
          { message: "successfully received" },
          { status: 200 }
        );
      }

      case 'customer.subscription.deleted': {
        // Remove access to product, subscription cancelled

        const subscription = await stripe.subscriptions.retrieve(data.object.id)

        await supabase.from('subscriptions').update({ 'status': 'cancelled' }).match({ 'stripe_customer_id': subscription.customer })

        return NextResponse.json(
          { message: "successfully received" },
          { status: 200 }
        );
      }


      default:
    }

    return NextResponse.json(
      { message: "successfully received" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'stripe error: ' + error.message + ' Event type: ' + eventType
    )
  }
}