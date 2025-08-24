import '../styles/globals.css'


export const metadata = {
  title: 'PlatoListo — Menú + compra + calorías',
  description: 'Menú semanal + lista por pasillos + calorías por foto',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Fuente Inter sin complicaciones */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b bg-white/90 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" width={28} height={28} />
              <span className="font-semibold tracking-tight">PlatoListo</span>
            </a>
            <nav className="flex items-center gap-3 text-sm">
              <a href="/pricing" className="btn btn-ghost">Precios</a>
              <a href="/dashboard" className="btn btn-primary">Abrir app</a>
            </nav>
          </div>
        </header>

        <main className="container py-10">{children}</main>

        <footer className="container py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} PlatoListo. Beta.
        </footer>
      </body>
    </html>
  );
}
