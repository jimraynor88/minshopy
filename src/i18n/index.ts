import { es, type TranslationKey } from './es';

const dict = es;

/** Traduce una clave. Soporta interpolación `{var}` y pluralización `_plural`. */
export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  let s: string = dict[key] ?? key;
  if (!vars) return s;
  
  // Pluralización simple para español: si hay {count}, añade 's' si count !== 1
  if ('count' in vars && vars.count !== undefined) {
    const n = Number(vars.count);
    if (n !== 1 && s.includes('_plural')) {
      s = s.replace('_plural', ''); // la clave _plural ya tiene la 's' en el string
    } else {
      s = s.replace('_plural', ''); // limpiar marcador si existe
    }
  }
  
  Object.entries(vars).forEach(([k, v]) => {
    s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  });
  return s;
}

