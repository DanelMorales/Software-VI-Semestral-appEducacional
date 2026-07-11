// src/app/index.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { guardarNombre } from '../services/storage';

export default function BienvenidaScreen() {
  const [nombre, setNombre] = useState('');

  const continuar = async (nombreFinal: string) => {
    await guardarNombre(nombreFinal);
    router.replace('/inicio');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.barnWrap}>
        <Image
          // Reemplaza esta ruta con tu propia imagen
          source={require('../../assets/images/farm.png')}
          style={styles.barnImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>¿Cómo te llamas?</Text>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Tu nombre"
          placeholderTextColor="#b0b0b0"
          style={styles.input}
        />
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [
            styles.btnGuest,
            pressed && styles.btnPressed,
          ]}
          onPress={() => continuar(nombre || 'Explorador')}
        >
          <Text style={styles.btnGuestText}>CONTINUAR</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.btnLogin,
            pressed && styles.btnPressed,
          ]}
          onPress={() => continuar('Invitado')}
        >
          <Text style={styles.btnLoginText}>CONTINUAR COMO INVITADO</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  barnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barnImage: {
    width: '100%',
    height: 260,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  buttons: {
    gap: 18,
  },
  btnGuest: {
    backgroundColor: '#e15b4d',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    // sombra tipo "botón 3D" del diseño original
    shadowColor: '#c14638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  btnGuestText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  btnLogin: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#d8d8d8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  btnLoginText: {
    color: '#e15b4d',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  btnPressed: {
    transform: [{ scale: 0.98 }],
  },
});