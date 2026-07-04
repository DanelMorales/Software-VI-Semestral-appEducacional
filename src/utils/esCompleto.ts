import { contarVocales } from './contarVocales';

console.log('contarVocales es:', typeof contarVocales);

export function esCompleto(palabra: string, cantidadTocadas: number): boolean {
  const conteo = contarVocales(palabra);
  const totalVocales = Object.values(conteo).reduce((suma, cantidad) => suma + cantidad, 0);
  return cantidadTocadas === totalVocales;
}