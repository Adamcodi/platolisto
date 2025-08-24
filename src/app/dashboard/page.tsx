'use client'
import { useMemo, useState } from 'react'
import { RECIPES, Recipe, Ingredient } from '@/lib/recipes'
import { classNames, formatEUR } from '@/lib/utils'

type Preferences = { goal: 'ahorro' | 'salud' | 'rapidas', diet: 'omni' | 'veggie' | 'keto' | 'cualquiera', budget: number, servingsPerMeal: number }

const TABS = ['Plan', 'Despensa', 'Lista', 'Calorías'] as const

export default function Dashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Plan')
  const [prefs, setPrefs] = useState<Preferences>({ goal: 'ahorro', diet: 'cualquiera', budget: 40, servingsPerMeal: 1 })
  const [pantry, setPantry] = useState<Record<string, boolean>>({})
  const [menu, setMenu] = useState<Recipe[] | null>(null)
  const [busy, setBusy] = useState(false)

  const agg = useMemo(() => (menu ? aggregateShoppingList(menu, prefs.servingsPerMeal, pantry) : null), [menu, prefs.servingsPerMeal, pantry])

  function pickWeeklyMenu(prefs: Preferences): Recipe[] {
    let pool = RECIPES.filter(r => (prefs.diet === 'cualquiera' ? true : r.diet === prefs.diet))
    if (prefs.goal === 'ahorro') pool = [...pool].sort((a,b)=>a.pricePerServing-b.pricePerServing)
    if (prefs.goal === 'rapidas') pool = [...pool].sort((a,b)=>a.time-b.time)
    if (prefs.goal === 'salud') pool = [...pool].sort((a,b)=>a.calories-b.calories)
    const result: Recipe[] = []
    const copy = [...pool]
    while (result.length < 7 && copy.length) result.push(copy.shift()!)
    const total = result.reduce((s, r) => s + r.pricePerServing * prefs.servingsPerMeal, 0)
    if (total > prefs.budget) {
      const cheap = [...RECIPES].sort((a, b) => a.pricePerServing - b.pricePerServing)
      for (let i = result.length - 1; i >= 0 && result.reduce((s, r) => s + r.pricePerServing * prefs.servingsPerMeal, 0) > prefs.budget; i--) {
        const candidate = cheap.find(c => !result.includes(c))
        if (candidate) result[i] = candidate
      }
    }
    return result
  }

  function aggregateShoppingList(menu: Recipe[], servingsPerMeal: number, pantry: Record<string, boolean>) {
    type Item = { name: string; totalQty: number; unit: string; aisle: string; estPrice: number }
    const map = new Map<string, Item>()
    for (const r of menu) {
      for (const ing of r.ingredients) {
        if (pantry[ing.name]) continue
        const key = `${ing.name}__${ing.unit}`
        const multi = servingsPerMeal / (r.servings || 1)
        const prev = map.get(key)
        const estPrice = ing.price * multi
        if (!prev) map.set(key, { name: ing.name, unit: ing.unit, aisle: ing.aisle, totalQty: ing.qty * multi, estPrice })
        else { prev.totalQty += ing.qty * multi; prev.estPrice += estPrice }
      }
    }
    const items = Array.from(map.values())
    const byAisle: Record<string, Item[]> = {}
    for (const it of items) { byAisle[it.aisle] ||= []; byAisle[it.aisle].push(it) }
    for (const a in byAisle) byAisle[a].sort((x,y)=>x.name.localeCompare(y.name,'es'))
    const totalCost = items.reduce((s,x)=>s+x.estPrice,0)
    return { byAisle, totalCost, items }
  }

  const [photo, setPhoto] = useState<string | null>(null)
  const [plate, setPlate] = useState<Array<{ item: string; grams: number }>>([{ item: 'Pasta cocida', grams: 120 }, { item: 'Pollo cocido', grams: 80 }, { item: 'Tomate', grams: 130 }])
  const KCAL_PER_100G: Record<string, number> = { 'Pasta cocida': 158, 'Tomate': 18, 'Aceite de oliva': 884, 'Queso': 430, 'Pollo cocido': 165, 'Arroz cocido': 130, 'Garbanzos cocidos': 164, 'Huevo': 155, 'Pan': 265, 'Brócoli': 35, 'Tofu': 76, 'Merluza': 85, 'Plátano': 89, 'Yogur natural': 60 }
  const kcal = Math.round(plate.reduce((s,p)=>s+((KCAL_PER_100G[p.item] ?? 100)/100)*p.grams,0))

  const generate = () => { setBusy(true); setTimeout(()=>{ setMenu(pickWeeklyMenu(prefs)); setBusy(false) }, 400) }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map(t => <button key={t} onClick={()=>setTab(t)} className={classNames('btn', tab===t ? 'btn-primary' : 'btn-ghost')}>{t}</button>)}
      </div>

      {tab==='Plan' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-5">
              <h3 className="text-lg font-semibold">Preferencias</h3>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <div className="text-slate-600 mb-1">Objetivo</div>
                  <div className="flex flex-wrap gap-2">
                    {(['ahorro','rapidas','salud'] as const).map(g =>
                      <button key={g} onClick={()=>setPrefs({...prefs, goal:g})} className={classNames('btn', prefs.goal===g?'btn-primary':'btn-ghost')}>{g==='ahorro'?'Ahorrar':g==='rapidas'?'Rápidas':'Salud'}</button>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 mb-1">Dieta</div>
                  <div className="flex flex-wrap gap-2">
                    {(['cualquiera','omni','veggie','keto'] as const).map(d =>
                      <button key={d} onClick={()=>setPrefs({...prefs, diet:d})} className={classNames('btn', prefs.diet===d?'btn-primary':'btn-ghost')}>{d}</button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-slate-600">Presupuesto: <strong>{formatEUR(prefs.budget)}</strong></label>
                  <input type="range" min={20} max={120} value={prefs.budget} onChange={e=>setPrefs({...prefs, budget:Number(e.target.value)})} className="w-full" />
                </div>
                <div>
                  <label className="text-slate-600">Raciones: <strong>{prefs.servingsPerMeal}</strong></label>
                  <input type="range" min={1} max={6} value={prefs.servingsPerMeal} onChange={e=>setPrefs({...prefs, servingsPerMeal:Number(e.target.value)})} className="w-full" />
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={generate} disabled={busy} className="btn btn-primary">{busy?'Generando…':'Generar menú'}</button>
                  <button onClick={()=>setMenu(null)} className="btn btn-ghost">Limpiar</button>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-lg font-semibold">Despensa rápida</h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                {['Aceite de oliva','Arroz','Pasta','Tomate','Pollo','Huevo','Lechuga','Cebolla','Zanahoria','Queso rallado','Garbanzos cocidos','Pan'].map(it =>
                  <label key={it} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                    <input type="checkbox" checked={!!pantry[it]} onChange={e=>setPantry({...pantry,[it]:e.target.checked})} /> {it}
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5">
              <h3 className="text-lg font-semibold">Menú semanal</h3>
              {!menu && <div className="text-slate-600 text-sm">Genera tu primer menú.</div>}
              {menu && (
                <div className="grid md:grid-cols-2 gap-3">
                  {menu.map((r,i)=>
                    <div key={r.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Día {i+1}: {r.name}</div>
                        <div className="text-xs text-slate-500">{r.time}′ · {formatEUR(r.pricePerServing * prefs.servingsPerMeal)} · {r.calories} kcal</div>
                      </div>
                      <ul className="mt-2 text-sm list-disc pl-5">
                        {r.ingredients.map(ing => <li key={ing.name+ing.unit}>{ing.name} — {ing.qty*prefs.servingsPerMeal}{ing.unit}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab==='Lista' && (
        <div className="card p-5">
          <h3 className="text-lg font-semibold">Lista de la compra</h3>
          {!menu && <div className="text-slate-600 text-sm">Primero genera un menú.</div>}
          {menu && agg && (
            <div>
              <div className="flex items-center justify-between mb-3 text-sm">
                <div className="text-slate-600">Coste estimado</div>
                <div className="font-semibold">{formatEUR(agg.totalCost)}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(agg.byAisle).map(([aisle, items]) =>
                  <div key={aisle} className="bg-white rounded-xl border border-slate-200 p-3">
                    <div className="font-medium text-slate-800 mb-2">{aisle}</div>
                    <ul className="space-y-1 text-sm">
                      {items.map(it =>
                        <li key={it.name+it.unit} className="flex items-center justify-between">
                          <span>{it.name}</span>
                          <span className="text-slate-500">{Math.round(it.totalQty)} {it.unit}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==='Despensa' && (
        <div className="card p-5">
          <h3 className="text-lg font-semibold">Tu despensa</h3>
          <p className="text-sm text-slate-600">Añade o quita artículos que sueles tener en casa.</p>
          <DespensaEditor pantry={pantry} setPantry={setPantry} />
        </div>
      )}

      {tab==='Calorías' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="text-lg font-semibold">Foto del plato (opcional)</h3>
            <div className="grid place-items-center bg-slate-50 rounded-xl border border-dashed border-slate-300 aspect-video overflow-hidden mt-2">
              {photo ? <img src={photo} alt="Plato" className="w-full h-full object-cover" /> : (
                <div className="text-slate-500 text-sm text-center p-6">
                  <div className="mb-2">No hay foto. Puedes subir una o usar solo la estimación manual.</div>
                  <div className="text-xs">Consejo: foto desde arriba, buena luz y un objeto de referencia (tenedor).</div>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input type="file" accept="image/*" onChange={e=>{ const f = e.target.files?.[0]; if(!f) return; const reader = new FileReader(); reader.onload = ()=>setPhoto(String(reader.result)); reader.readAsDataURL(f) }} />
              {photo && <button onClick={()=>setPhoto(null)} className="btn btn-ghost">Quitar</button>}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-lg font-semibold">Estimación</h3>
            <div className="flex items-center justify-between mb-3">
              <div className="text-slate-600">Calorías totales estimadas</div>
              <div className="text-2xl font-extrabold">{kcal} kcal</div>
            </div>
            <ul className="space-y-2">
              {plate.map((p,i)=>
                <li key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-100">
                  <span className="font-medium flex-1">{p.item}</span>
                  <input type="number" min={0} value={p.grams} onChange={e=>setPlate(plate.map((x,idx)=>idx===i?{...x, grams:Number(e.target.value)}:x))} className="w-24 px-2 py-1 rounded-lg border border-slate-300 text-sm" />
                  <span className="text-sm text-slate-500 w-10">g</span>
                  <button onClick={()=>setPlate(plate.filter((_,idx)=>idx!==i))} className="btn btn-ghost text-sm">Eliminar</button>
                </li>
              )}
            </ul>
            <AddComponent onAdd={(item,grams)=>setPlate([...plate, {item, grams}])} />
            <div className="mt-4 text-xs text-slate-500">Nota: Las calorías son una estimación. En producción, un modelo de visión autocompletaría estos campos; tú solo confirmarías.</div>
          </div>
        </div>
      )}
    </div>
  )
}

function DespensaEditor({ pantry, setPantry }: { pantry: Record<string, boolean>, setPantry: (s:any)=>void }) {
  const [custom, setCustom] = useState('')
  const list = Object.keys(pantry).filter(k => pantry[k])
  return (
    <div className="mt-3">
      <div className="flex gap-2 mb-3">
        <input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Añade un artículo (Enter)"
          onKeyDown={e=>{ if(e.key==='Enter' && custom.trim()){ setPantry({...pantry, [custom.trim()]: true}); setCustom('') } }}
          className="flex-1 px-3 py-2 rounded-xl border border-slate-300" />
        <button onClick={()=>{ if(custom.trim()){ setPantry({...pantry, [custom.trim()]: true}); setCustom('') } }} className="btn btn-primary">Añadir</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {list.length===0 && <span className="text-sm text-slate-600">Aún no has marcado artículos.</span>}
        {list.map(it => <button key={it} onClick={()=>setPantry({...pantry, [it]: false})} className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm">{it} ✕</button>)}
      </div>
    </div>
  )
}

function AddComponent({ onAdd }: { onAdd: (item:string, grams:number)=>void }) {
  const [newItem, setNewItem] = useState({ item: 'Pasta cocida', grams: 100 })
  const options = ['Pasta cocida','Tomate','Aceite de oliva','Queso','Pollo cocido','Arroz cocido','Garbanzos cocidos','Huevo','Pan','Brócoli','Tofu','Merluza','Plátano','Yogur natural']
  return (
    <div className="mt-3 flex items-center gap-2">
      <select value={newItem.item} onChange={e=>setNewItem({...newItem, item:e.target.value})} className="flex-1 px-3 py-2 rounded-xl border border-slate-300">
        {options.map(k => <option key={k} value={k}>{k}</option>)}
      </select>
      <input type="number" min={10} step={10} value={newItem.grams} onChange={e=>setNewItem({...newItem, grams:Number(e.target.value)})} className="w-28 px-3 py-2 rounded-xl border border-slate-300" />
      <button onClick={()=>onAdd(newItem.item, newItem.grams)} className="btn btn-primary">Añadir</button>
    </div>
  )
}
