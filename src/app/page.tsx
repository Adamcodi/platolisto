import Link from 'next/link'
import { BRAND } from '@/lib/brand'
import { RECIPES } from '@/lib/recipes'
import { formatEUR } from '@/lib/utils'

export default function Home() {
  const sample = RECIPES.slice(0,7)
  const total = sample.reduce((s, r) => s + r.pricePerServing, 0)
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center py-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium mb-3">
          <span>Nuevo</span><span>Menús + compra + calorías por foto</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Come bien, gasta menos y <span className="text-emerald-700">cuenta calorías</span> con una foto.
        </h1>
        <p className="mt-4 text-slate-700 text-base md:text-lg">
          {BRAND.name} te propone un menú semanal adaptado a ti, crea la lista de la compra más barata y registra calorías sin complicarte.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard" className="btn btn-primary">Generar mi primer menú</Link>
          <Link href="/pricing" className="btn btn-ghost">Ver precios</Link>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
          <li>✅ Lista por pasillos y por precio</li>
          <li>✅ Despensa inteligente</li>
          <li>✅ Calorías por foto (editable)</li>
          <li>✅ Apto para veggie/keto/omni</li>
        </ul>
      </div>
      <div className="card p-5 md:p-6">
        <h3 className="font-semibold text-slate-900">Menú de ejemplo (7 días)</h3>
        <p className="text-sm text-slate-600 mb-3">Objetivo <strong>ahorro</strong>, 1 ración/día.</p>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-800">
          {sample.map(r => <li key={r.id}>{r.name} <span className="text-slate-500">· {formatEUR(r.pricePerServing)} · {r.time}′</span></li>)}
        </ol>
        <div className="mt-3 text-sm">
          <div className="flex items-center justify-between"><span className="text-slate-600">Coste semana</span><span className="font-semibold">{formatEUR(total)}</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-600">Recetas demo</span><span className="font-semibold">{RECIPES.length}</span></div>
        </div>
      </div>
    </div>
  )
}
