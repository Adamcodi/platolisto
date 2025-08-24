export type Ingredient = { name: string; qty: number; unit: string; aisle: string; price: number };
export type Recipe = {
  id: string;
  name: string;
  diet: 'omni' | 'veggie' | 'keto';
  time: number; // minutos
  pricePerServing: number; // €
  calories: number; // por ración
  servings: number;
  ingredients: Ingredient[]; // por ración
};

export const RECIPES: Recipe[] = [
  { id: 'ensalada-completa', name: 'Ensalada completa', diet: 'veggie', time: 10, pricePerServing: 1.5, calories: 420, servings: 1,
    ingredients: [
      { name: 'Lechuga', qty: 100, unit: 'g', aisle: 'Verduras', price: 0.4 },
      { name: 'Tomate', qty: 120, unit: 'g', aisle: 'Verduras', price: 0.3 },
      { name: 'Garbanzos cocidos', qty: 120, unit: 'g', aisle: 'Conservas', price: 0.4 },
      { name: 'Aceite de oliva', qty: 10, unit: 'ml', aisle: 'Aceites', price: 0.1 },
      { name: 'Queso fresco', qty: 60, unit: 'g', aisle: 'Lácteos', price: 0.3 }
    ]},
  { id: 'pollo-horno-patatas', name: 'Pollo al horno con patatas', diet: 'omni', time: 40, pricePerServing: 2.2, calories: 520, servings: 1,
    ingredients: [
      { name: 'Pollo', qty: 150, unit: 'g', aisle: 'Carnes', price: 1.1 },
      { name: 'Patata', qty: 200, unit: 'g', aisle: 'Verduras', price: 0.4 },
      { name: 'Aceite de oliva', qty: 10, unit: 'ml', aisle: 'Aceites', price: 0.1 },
      { name: 'Ajo', qty: 5, unit: 'g', aisle: 'Verduras', price: 0.05 },
      { name: 'Pimentón', qty: 2, unit: 'g', aisle: 'Especias', price: 0.05 }
    ]},
  { id: 'tosta-atun', name: 'Tosta de atún', diet: 'omni', time: 8, pricePerServing: 1.1, calories: 380, servings: 1,
    ingredients: [
      { name: 'Pan', qty: 80, unit: 'g', aisle: 'Panadería', price: 0.3 },
      { name: 'Atún en lata', qty: 60, unit: 'g', aisle: 'Conservas', price: 0.5 },
      { name: 'Tomate', qty: 60, unit: 'g', aisle: 'Verduras', price: 0.15 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 }
    ]},
  { id: 'pasta-tomate-pollo', name: 'Pasta con pollo y tomate', diet: 'omni', time: 20, pricePerServing: 1.7, calories: 600, servings: 1,
    ingredients: [
      { name: 'Pasta', qty: 80, unit: 'g', aisle: 'Secos', price: 0.25 },
      { name: 'Tomate triturado', qty: 120, unit: 'g', aisle: 'Conservas', price: 0.2 },
      { name: 'Pollo', qty: 80, unit: 'g', aisle: 'Carnes', price: 0.6 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 },
      { name: 'Queso rallado', qty: 10, unit: 'g', aisle: 'Lácteos', price: 0.15 }
    ]},
  { id: 'lentejas-rapidas', name: 'Lentejas rápidas', diet: 'veggie', time: 25, pricePerServing: 1.2, calories: 510, servings: 1,
    ingredients: [
      { name: 'Lentejas cocidas', qty: 150, unit: 'g', aisle: 'Conservas', price: 0.45 },
      { name: 'Zanahoria', qty: 80, unit: 'g', aisle: 'Verduras', price: 0.15 },
      { name: 'Cebolla', qty: 60, unit: 'g', aisle: 'Verduras', price: 0.12 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 },
      { name: 'Comino', qty: 2, unit: 'g', aisle: 'Especias', price: 0.05 }
    ]},
  { id: 'tortilla-francesa', name: 'Tortilla francesa con ensalada', diet: 'omni', time: 10, pricePerServing: 0.9, calories: 350, servings: 1,
    ingredients: [
      { name: 'Huevo', qty: 2, unit: 'ud', aisle: 'Huevos', price: 0.4 },
      { name: 'Lechuga', qty: 80, unit: 'g', aisle: 'Verduras', price: 0.3 },
      { name: 'Aceite de oliva', qty: 6, unit: 'ml', aisle: 'Aceites', price: 0.06 }
    ]},
  { id: 'crema-calabaza', name: 'Crema de calabaza', diet: 'veggie', time: 30, pricePerServing: 1.0, calories: 280, servings: 1,
    ingredients: [
      { name: 'Calabaza', qty: 200, unit: 'g', aisle: 'Verduras', price: 0.5 },
      { name: 'Cebolla', qty: 60, unit: 'g', aisle: 'Verduras', price: 0.12 },
      { name: 'Patata', qty: 80, unit: 'g', aisle: 'Verduras', price: 0.16 },
      { name: 'Aceite de oliva', qty: 6, unit: 'ml', aisle: 'Aceites', price: 0.06 }
    ]},
  { id: 'salmon-plancha', name: 'Salmón a la plancha con brócoli', diet: 'keto', time: 15, pricePerServing: 3.2, calories: 540, servings: 1,
    ingredients: [
      { name: 'Salmón', qty: 150, unit: 'g', aisle: 'Pescadería', price: 2.4 },
      { name: 'Brócoli', qty: 180, unit: 'g', aisle: 'Verduras', price: 0.6 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 }
    ]},
  { id: 'arroz-verduras', name: 'Arroz con verduras', diet: 'veggie', time: 22, pricePerServing: 1.1, calories: 480, servings: 1,
    ingredients: [
      { name: 'Arroz', qty: 80, unit: 'g', aisle: 'Secos', price: 0.18 },
      { name: 'Pimiento', qty: 70, unit: 'g', aisle: 'Verduras', price: 0.2 },
      { name: 'Guisantes', qty: 80, unit: 'g', aisle: 'Congelados', price: 0.25 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 },
      { name: 'Ajo', qty: 5, unit: 'g', aisle: 'Verduras', price: 0.05 }
    ]},
  { id: 'hummus-wrap', name: 'Wrap de hummus y verduras', diet: 'veggie', time: 12, pricePerServing: 1.6, calories: 420, servings: 1,
    ingredients: [
      { name: 'Tortilla de trigo', qty: 1, unit: 'ud', aisle: 'Panadería', price: 0.3 },
      { name: 'Hummus', qty: 60, unit: 'g', aisle: 'Refrigerados', price: 0.5 },
      { name: 'Zanahoria', qty: 60, unit: 'g', aisle: 'Verduras', price: 0.12 },
      { name: 'Pepino', qty: 70, unit: 'g', aisle: 'Verduras', price: 0.14 }
    ]},
  { id: 'pescado-al-horno', name: 'Pescado al horno con patata y limón', diet: 'omni', time: 25, pricePerServing: 2.4, calories: 500, servings: 1,
    ingredients: [
      { name: 'Merluza', qty: 150, unit: 'g', aisle: 'Pescadería', price: 1.6 },
      { name: 'Patata', qty: 180, unit: 'g', aisle: 'Verduras', price: 0.36 },
      { name: 'Limón', qty: 30, unit: 'g', aisle: 'Fruta', price: 0.1 },
      { name: 'Aceite de oliva', qty: 8, unit: 'ml', aisle: 'Aceites', price: 0.08 }
    ]},
  { id: 'salteado-tofu', name: 'Salteado de tofu y verduras', diet: 'veggie', time: 15, pricePerServing: 1.9, calories: 460, servings: 1,
    ingredients: [
      { name: 'Tofu', qty: 120, unit: 'g', aisle: 'Refrigerados', price: 0.9 },
      { name: 'Brócoli', qty: 140, unit: 'g', aisle: 'Verduras', price: 0.45 },
      { name: 'Zanahoria', qty: 70, unit: 'g', aisle: 'Verduras', price: 0.12 },
      { name: 'Salsa de soja', qty: 10, unit: 'ml', aisle: 'Salsas', price: 0.1 }
    ]},
  { id: 'avena-platano', name: 'Avena con plátano y yogur', diet: 'veggie', time: 5, pricePerServing: 0.8, calories: 320, servings: 1,
    ingredients: [
      { name: 'Copos de avena', qty: 50, unit: 'g', aisle: 'Secos', price: 0.15 },
      { name: 'Plátano', qty: 1, unit: 'ud', aisle: 'Fruta', price: 0.25 },
      { name: 'Yogur natural', qty: 125, unit: 'g', aisle: 'Lácteos', price: 0.25 }
    ]}
];
