// src/utils/contarVocales.ts
export function contarVocales(palabra: string) {
  const vocales = ['A', 'E', 'I', 'O', 'U'];
  const conteo: Record<string, number> = { A: 0, E: 0, I: 0, O: 0, U: 0 };

  for (const letra of palabra.toUpperCase()) {
    if (vocales.includes(letra)) {
      conteo[letra]++;
    }
  }

  return conteo;
}