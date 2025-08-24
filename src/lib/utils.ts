export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

export function formatEUR(n: number, max=0) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: max }).format(n)
}

export type Preferences = {
  goal: 'ahorro' | 'salud' | 'rapidas'
  diet: 'omni' | 'veggie' | 'keto' | 'cualquiera'
  budget: number
  servingsPerMeal: number
}
