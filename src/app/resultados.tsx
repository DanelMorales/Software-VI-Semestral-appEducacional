// src/app/resultados.tsx
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { obtenerUltimoPuntaje } from '../services/storage';

export default function ResultadosScreen() {
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    const cargarPuntaje = async () => {
      const puntajeGuardado = await obtenerUltimoPuntaje();
      setPuntaje(puntajeGuardado);
    };
    cargarPuntaje();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 60 }}>🏆</Text>
      <Text>Muy bien!</Text>
      <Text>Tu puntaje: {puntaje}</Text>

      <Pressable onPress={() => router.replace('/inicio')}>
        <Text>Volver a jugar</Text>
      </Pressable>
    </View>
  );
}