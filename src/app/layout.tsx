import './globals.css'
import { BRAND } from '@/lib/brand'
import Link from 'next/link'

export const metadata = {
  title: `${BRAND.name} — ${BRAND.slogan}`,
  description: 'Menú semanal + compra más barata + calorías por foto'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="container pt-6 pb-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" width={28} height={28} />
              <span className="font-semibold text-xl tracking-tight">{BRAND.name}</span>
              <span className="pill hidden md:inline">Beta</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
              <Link className="btn btn-ghost" href="/pricing">Precios</Link>
              <Link className="btn btn-primary" href="/dashboard">Abrir app</Link>
            </nav>
            <Link className="md:hidden btn btn-primary" href="/dashboard">Abrir app</Link>
          </div>
        </header>
        <main className="container pb-16">{children}</main>
        <footer className="border-t border-slate-200 bg-white/60 backdrop-blur">
          <div className="container py-4 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2"><img src="/logo.svg" width={18} height={18} /><span>© {new Date().getFullYear()} {BRAND.name}. Beta.</span></div>
            <div className="flex items-center gap-3">
              <Link href="/legal/privacy">Privacidad</Link>
              <Link href="/legal/terms">Términos</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
