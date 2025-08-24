import Link from 'next/link'

export default function Pricing() {
  return (
    <div className="py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Precios simples</h1>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="text-slate-600 text-sm mb-3">Menús básicos y lista de la compra.</p>
          <ul className="text-sm space-y-1">
            <li>• 10 recetas/mes</li>
            <li>• Lista por pasillos</li>
            <li>• Despensa</li>
          </ul>
          <Link href="/dashboard" className="btn btn-ghost mt-4">Probar</Link>
        </div>
        <div className="card p-5 border-emerald-600">
          <div className="pill mb-2 bg-emerald-100 text-emerald-800">Recomendado</div>
          <h3 className="text-xl font-semibold">Premium</h3>
          <p className="text-slate-600 text-sm mb-3">Todo ilimitado + calorías por foto.</p>
          <ul className="text-sm space-y-1">
            <li>• Menús y recetas ilimitados</li>
            <li>• Comparador por tienda</li>
            <li>• Calorías por foto</li>
          </ul>
          <form action="/api/stripe/create-checkout-session" method="POST">
            <input type="hidden" name="mode" value="subscription" />
            <input type="hidden" name="priceId" value={process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || ''} />
            <button className="btn btn-primary mt-4" type="submit">Empezar 5,99 €/mes</button>
          </form>
        </div>
        <div className="card p-5">
          <h3 className="text-xl font-semibold">Anual</h3>
          <p className="text-slate-600 text-sm mb-3">Ahorra 2 meses.</p>
          <ul className="text-sm space-y-1">
            <li>• Todo Premium</li>
            <li>• Prioridad soporte</li>
          </ul>
          <form action="/api/stripe/create-checkout-session" method="POST">
            <input type="hidden" name="mode" value="subscription" />
            <input type="hidden" name="priceId" value={process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY || ''} />
            <button className="btn btn-primary mt-4" type="submit">59,90 €/año</button>
          </form>
          <form action="/api/stripe/portal" method="POST">
            <button className="btn btn-ghost mt-2" type="submit">Gestionar suscripción</button>
          </form>
        </div>
      </div>
    </div>
  )
}
