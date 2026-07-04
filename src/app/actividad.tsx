import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';
import { animales } from '../data/animales';
import { guardarPuntaje } from '../services/storage';
import { esCompleto } from '../utils/esCompleto';

export default function ActividadScreen() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<number[]>([]);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [fondoVerde, setFondoVerde] = useState(false);

  const animalActual = animales[indiceActual];
  const vocales = ['A', 'E', 'I', 'O', 'U'];

  const player = useAudioPlayer(animalActual.audio);

  useEffect(() => {
    player.seekTo(0);
    player.play();
  }, [indiceActual]);

  const esVocal = (letra: string) => vocales.includes(letra.toUpperCase());

  const tocarLetra = (letra: string, posicion: number) => {
    if (!esVocal(letra)) return;
    if (letrasSeleccionadas.includes(posicion)) return;

    setLetrasSeleccionadas([...letrasSeleccionadas, posicion]);
    setPuntaje(puntaje + 10);
  };

  const siguienteAnimal = async () => {
    if (!esCompleto(animalActual.sonido, letrasSeleccionadas.length)) {
      setMensaje('Te falto una vocal! Revisa bien 👀');
      return;
    }

    setMensaje('');
    setFondoVerde(true);
    setTimeout(() => setFondoVerde(false), 500);

    if (indiceActual < animales.length - 1) {
      setIndiceActual(indiceActual + 1);
      setLetrasSeleccionadas([]);
    } else {
      await guardarPuntaje(puntaje);
      router.replace('/resultados');
    }
  };

  return (
    <View style={{ backgroundColor: fondoVerde ? '#97C459' : 'white', flex: 1 }}>
      <Text style={{ fontSize: 60 }}>{animalActual.emoji}</Text>
      <Text>{animalActual.nombre} dice:</Text>

      <View style={{ flexDirection: 'row' }}>
        {animalActual.sonido.split('').map((letra, i) => (
          <Pressable key={i} onPress={() => tocarLetra(letra, i)}>
            <Text
              style={{
                fontSize: 32,
                color: letrasSeleccionadas.includes(i) ? '#639922' : '#2C2C2A',
                fontWeight: letrasSeleccionadas.includes(i) ? 'bold' : 'normal',
              }}
            >
              {letra}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text>Puntaje: {puntaje}</Text>

      {mensaje !== '' && (
        <Text style={{ color: '#D85A30', fontWeight: 'bold' }}>{mensaje}</Text>
      )}

      <Pressable onPress={siguienteAnimal}>
        <Text>Siguiente</Text>
      </Pressable>
    </View>
  );
}