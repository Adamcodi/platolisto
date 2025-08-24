import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const priceId = body.get('priceId')?.toString()
  if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })
  const origin = req.headers.get('origin') || 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?status=success`,
    cancel_url: `${origin}/pricing`,
  })
  return NextResponse.redirect(session.url!, 303)
}
