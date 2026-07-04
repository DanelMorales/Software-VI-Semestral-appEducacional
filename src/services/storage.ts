// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarNombre = (nombre: string) => AsyncStorage.setItem('nombreUsuario', nombre);
export const obtenerNombre = () => AsyncStorage.getItem('nombreUsuario');

export const guardarPuntaje = (puntaje: number) => AsyncStorage.setItem('ultimoPuntaje', String(puntaje));
export const obtenerUltimoPuntaje = async () => {
  const valor = await AsyncStorage.getItem('ultimoPuntaje');
  return valor ? Number(valor) : 0;
};