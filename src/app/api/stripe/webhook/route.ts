import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // TODO: handle checkout.session.completed, customer.subscription.updated, etc.
  console.log('Stripe event:', event.type)

  return NextResponse.json({ received: true })
}
