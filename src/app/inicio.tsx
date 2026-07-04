import {useState, useEffect} from 'react'; 
import {View, Text, Pressable} from 'react-native'; 
import {router} from 'expo-router'; 
import { obtenerNombre,obtenerUltimoPuntaje } from '@/services/storage';
export default function InicioScreen()
 {
    const [nombre, setNombre] = useState(''); 
    const [puntaje, setPuntaje] = useState(0); 

    useEffect (() => 
        {
            const cargarDatos = async() => 
            {
                const nombreGuardado = await obtenerNombre();
                const puntajeGuardado = await obtenerUltimoPuntaje(); 
                setNombre (nombreGuardado || 'Explorador' ); 
                setPuntaje (puntajeGuardado); 
            }; 
            cargarDatos(); 
        }, 
    []); 
    return (
    <View>
      <Text>Hola, {nombre}!</Text>
      <Text>Tu ultimo puntaje: {puntaje}</Text>

      <Pressable onPress={() => router.push('/actividad')}>
        <Text>Jugar</Text>
      </Pressable>
    </View>
  );
} 
