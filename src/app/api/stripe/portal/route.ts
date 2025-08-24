import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.ST
RIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })
  const customer = req.headers.get('x-demo-customer') || undefined
  if (!customer) return NextResponse.json({ error: 'Customer not set' }, { status: 400 })
  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: req.headers.get('origin') || 'http://localhost:3000'
  })
  return NextResponse.redirect(session.url, 303)
}
