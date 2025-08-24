export default function HomePage() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Come bien, gasta menos y cuenta calorías con una foto.
        </h1>
        <p className="text-lg text-slate-600">
          {`PlatoListo te propone el menú semanal, ordena la lista por pasillos y calcula calorías con una foto.`}
        </p>
        <div className="flex gap-3">
          <a href="/dashboard" className="btn btn-primary">Generar mi primer menú</a>
          <a href="/pricing" className="btn btn-ghost">Ver precios</a>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold mb-2">Menú de ejemplo (7 días)</h2>
        <ul className="list-decimal list-inside space-y-1 text-sm text-slate-700">
          <li>Ensalada completa · 10′</li>
          <li>Pollo al horno con patatas · 40′</li>
          <li>Tosta de atún · 5′</li>
          <li>Pasta con pollo y tomate · 20′</li>
          <li>Lentejas rápidas · 25′</li>
          <li>Tortilla francesa con ensalada · 10′</li>
          <li>Crema de calabaza · 30′</li>
        </ul>
        <div className="mt-4 text-sm text-slate-500">Coste semanal ≈ 10 € · Recetas demo: 13</div>
      </div>
    </section>
  )
}
