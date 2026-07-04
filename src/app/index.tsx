// src/app/index.tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { guardarNombre } from '../services/storage';

export default function BienvenidaScreen() {
  const [nombre, setNombre] = useState('');

  const continuar = async (nombreFinal: string) => {
    await guardarNombre(nombreFinal);
    router.replace('/inicio');
  };

  return (
    <View>
      <Text>Como te llamas?</Text>
      <TextInput value={nombre} onChangeText={setNombre} placeholder="Tu nombre" />
      <Pressable onPress={() => continuar(nombre || 'Explorador')}>
        <Text>Continuar</Text>
      </Pressable>
      <Pressable onPress={() => continuar('Invitado')}>
        <Text>Continuar como invitado</Text>
      </Pressable>
    </View>
  );
}