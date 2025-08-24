import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2023-10-16" });

export async function POST(req: NextRequest) {
  // Espera: necesitamos el ID del customer (en test, vendrá del body o headers)
  // Si no llega, devolvemos 400 (así no rompe el build).
  let customer: string | null = null;

  try {
    const body = await req.json();
    customer = body?.customer ?? null;
  } catch {
    customer = req.headers.get("x-customer") || null;
  }

  if (!customer) {
    return NextResponse.json({ error: "Customer not set" }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/dashboard`,
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
