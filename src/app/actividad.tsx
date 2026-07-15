import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { animales } from "../data/animales";
import { guardarPuntaje } from "../services/storage";
import { esCompleto } from "../utils/esCompleto";

const VOCALES = ["A", "E", "I", "O", "U"] as const;
type Vocal = (typeof VOCALES)[number];

const COLORS = {
  coral: "#DE5147",
  circulo: "#E24B4A",
  cafe: "#7A4A21",
  crema: "rgba(251, 243, 225, 0.94)",
  verdeFlash: "rgba(151, 196, 89, 0.55)",
};

export default function ActividadScreen() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<number[]>([]);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [flashCorrecto, setFlashCorrecto] = useState(false);
  const [conteoVocales, setConteoVocales] = useState<Record<Vocal, number>>({
    A: 0,
    E: 0,
    I: 0,
    O: 0,
    U: 0,
  });

  const animalActual = animales[indiceActual];

  const player = useAudioPlayer(animalActual.audio);

  useEffect(() => {
    player.seekTo(0);
    player.play();
  }, [indiceActual]);

  const esVocal = (letra: string): letra is Vocal =>
    (VOCALES as readonly string[]).includes(letra.toUpperCase());

  // El niño toca una vocal -> se encierra con círculo rojo y suma al contador de esa vocal
  const tocarLetra = (letra: string, posicion: number) => {
    if (!esVocal(letra)) return;
    if (letrasSeleccionadas.includes(posicion)) return;

    const vocal = letra.toUpperCase() as Vocal;
    setLetrasSeleccionadas((prev) => [...prev, posicion]);
    setPuntaje((prev) => prev + 10);
    setConteoVocales((prev) => ({ ...prev, [vocal]: prev[vocal] + 1 }));
  };

  const siguienteAnimal = async () => {
    if (!esCompleto(animalActual.sonido, letrasSeleccionadas.length)) {
      setMensaje("Te falto una vocal! Revisa bien 👀");
      return;
    }

    setMensaje("");
    setFlashCorrecto(true);
    setTimeout(() => setFlashCorrecto(false), 500);

    if (indiceActual < animales.length - 1) {
      setIndiceActual((prev) => prev + 1);
      setLetrasSeleccionadas([]);
    } else {
      await guardarPuntaje(puntaje);
      router.replace("/resultados");
    }
  };

  return (
    <View style={styles.container}>
      {/* Mismo fondo de granja que las demás pantallas */}
      <Image
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Destello verde breve al completar un animal correctamente */}
      {flashCorrecto && (
        <View style={styles.flashOverlay} pointerEvents="none" />
      )}

      <View style={styles.card}>
        <Text style={styles.emoji}>{animalActual.emoji}</Text>
        <Text style={styles.nombreAnimal}>{animalActual.nombre} dice:</Text>

        {/* Onomatopeya letra por letra — tocar una vocal la encierra en rojo */}
        <View style={styles.filaLetras}>
          {animalActual.sonido.split("").map((letra, i) => {
            const marcada = letrasSeleccionadas.includes(i);
            return (
              <Pressable
                key={i}
                onPress={() => tocarLetra(letra, i)}
                style={[styles.letraBox, marcada && styles.letraCirculada]}
                disabled={!esVocal(letra)}
              >
                <Text
                  style={[
                    styles.letraTexto,
                    marcada && styles.letraTextoMarcada,
                  ]}
                >
                  {letra}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {mensaje !== "" && <Text style={styles.mensajeError}>{mensaje}</Text>}

        {/* Contador por vocal: A, E, I, O, U */}
        <View style={styles.contadoresFila}>
          {VOCALES.map((v) => (
            <View key={v} style={styles.contadorChip}>
              <Text style={styles.contadorLetra}>{v}</Text>
              <Text style={styles.contadorNumero}>{conteoVocales[v]}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.puntajeTexto}>Puntaje: {puntaje}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.botonSiguiente,
            pressed && styles.botonPresionado,
          ]}
          onPress={siguienteAnimal}
        >
          <Text style={styles.botonTexto}>SIGUIENTE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  flashOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.verdeFlash,
    zIndex: 10,
  },

  card: {
    flex: 1,
    marginTop: 90,
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: COLORS.crema,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: COLORS.cafe,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  emoji: {
    fontSize: 64,
  },
  nombreAnimal: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.cafe,
    marginTop: 4,
    marginBottom: 20,
  },

  filaLetras: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  letraBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "transparent",
  },
  letraCirculada: {
    borderColor: COLORS.circulo,
    backgroundColor: "rgba(226, 75, 74, 0.08)",
  },
  letraTexto: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C2C2A",
  },
  letraTextoMarcada: {
    color: COLORS.circulo,
  },

  mensajeError: {
    color: "#D85A30",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 12,
    textAlign: "center",
  },

  contadoresFila: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  contadorChip: {
    width: 44,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cafe,
    paddingVertical: 6,
  },
  contadorLetra: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.cafe,
  },
  contadorNumero: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.circulo,
  },

  puntajeTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.cafe,
    marginBottom: 20,
  },

  botonSiguiente: {
    backgroundColor: COLORS.coral,
    borderRadius: 10,
    height: 50,
    minWidth: 180,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  botonPresionado: {
    transform: [{ scale: 0.98 }],
  },
  botonTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
