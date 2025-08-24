# PlatoListo — App lista para vender (MVP)

Menú semanal + lista de compra optimizada + **calorías por foto** (estimación editable). Incluye:
- Next.js (App Router) + Tailwind
- Autenticación (NextAuth: Google opcional, credenciales de prueba demo)
- Stripe Checkout (suscripción mensual/anual) + Customer Portal
- Prisma + Postgres
- Páginas: Landing, Pricing, Dashboard (Plan, Despensa, Lista, Calorías), Legal
- API: generación de menús, lista de compra, estimación de calorías
- Semillas de **recetas** y **precios** demo

> ⚠️ Nota legal: Los textos de privacidad/términos son plantillas **no legales**. Solicita revisión profesional antes de producción.

## 1) Instalar
```bash
cp .env.example .env
# Rellena claves (Stripe y OAuth si quieres)
npm i
npm run db:push
npm run db:seed   # recetas demo
npm run dev
```

Base local: http://localhost:3000

## 2) Stripe (modo test)
- Crea productos/planes en Stripe y copia los `price_...` en `.env`
- `STRIPE_SECRET_KEY` y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Webhook: añade endpoint `http://localhost:3000/api/stripe/webhook` con el secreto en `STRIPE_WEBHOOK_SECRET`

## 3) Producción
- Despliega en Vercel, Railway o similar.
- Provisiona Postgres (Neon/Supabase) y configura `DATABASE_URL`.
- Sube variables de entorno.
- Configura webhook de Stripe a la URL pública.

## 4) Demo credenciales
- Botón **Entrar como demo** (sin email). Se crea un usuario temporal con plan Free.
- Para activar Premium: simula pago con Stripe (modo test).

---

## Estructura
```
src/
  app/           # App Router
  components/    # UI
  lib/           # lógica compartida
prisma/
  schema.prisma
public/
  logo.svg
```

¡Listo para iterar y vender!
