import { obtenerNombre, obtenerUltimoPuntaje } from "@/services/storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Medidas de referencia del diseño en Figma (frame de 453 x 906)
const DESIGN_WIDTH = 453;
const DESIGN_HEIGHT = 906;

export default function InicioScreen() {
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState(0);

  useEffect(() => {
    const cargarDatos = async () => {
      const nombreGuardado = await obtenerNombre();
      const puntajeGuardado = await obtenerUltimoPuntaje();
      setNombre(nombreGuardado || "Explorador");
      setPuntaje(puntajeGuardado);
    };
    cargarDatos();
  }, []);

  const volver = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // No hay historial (llegamos aquí con router.replace desde Bienvenida)
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      {/* 1) FONDO — tu granja a pantalla completa */}
      <Image
        source={require("@/assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* 2) TARJETA / PANEL — tu fondoBienvenida.png (caja de arriba en
          blanco para el título, tablita en blanco para el puntaje) */}
      <View style={styles.card}>
        <Image
          source={require("@/assets/images/fondoBienvenida.png")}
          style={styles.cardImage}
          resizeMode="stretch"
        />

        {/* Texto dinámico encima de tarjeta.png (nombre real + puntaje real) */}
        <View style={styles.textoOverlay} pointerEvents="none">
          <Text style={styles.titulo}>Hola, {nombre}!</Text>
          <Text style={styles.subtitulo}>tu ultimo puntaje:</Text>
        </View>

        {/* Número del puntaje, posicionado sobre la tablita de madera
            que viene dibujada dentro de tarjeta.png */}
        <View style={styles.puntajeOverlay} pointerEvents="none">
          <Text style={styles.puntajeTexto}>{puntaje}</Text>
        </View>

        {/* 3) BOTÓN JUGAR — mismo estilo que el botón coral de BienvenidaScreen */}
        <Pressable
          style={({ pressed }) => [
            styles.botonJugar,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/actividad")}
        >
          <Text style={styles.jugarTexto}>JUGAR</Text>
        </Pressable>
      </View>

      {/* 4) FLECHA DE REGRESO — pon aquí el png del botón circular con flecha */}
      <Pressable style={styles.flecha} onPress={volver}>
        <Image
          source={require("@/assets/images/flecha.png")}
          style={styles.flechaImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const COLORS = {
  coral: "#DE5147",
  white: "#FFFFFF",
};

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

  // Rectángulo redondeado 1 → left:0, top:155, w:390.5, h:441.7 (sobre 453x906)
  card: {
    position: "absolute",
    left: `${(0 / DESIGN_WIDTH) * 100}%`,
    top: `${(155 / DESIGN_HEIGHT) * 100}%`,
    width: `${(390.525 / DESIGN_WIDTH) * 100}%`,
    height: `${(441.681 / DESIGN_HEIGHT) * 100}%`,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },

  // Título + subtítulo — caja clara de arriba en fondoBienvenida.png
  // (medido directo del png: x 121-1619, y 248-703 sobre 1667x1961)
  textoOverlay: {
    position: "absolute",
    left: "7.3%",
    top: "12.6%",
    width: "89.9%",
    height: "23.2%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#7A4A21",
  },
  subtitulo: {
    fontSize: 18,
    color: "#7A4A21",
    marginTop: 4,
  },

  // Puntaje — sobre la tablita de madera en fondoBienvenida.png
  // (medido directo del png: x 179-1526, y 882-1254 sobre 1667x1961)
  puntajeOverlay: {
    position: "absolute",
    left: "10.7%",
    top: "45%",
    width: "80.8%",
    height: "19%",
    alignItems: "center",
    justifyContent: "center",
  },
  puntajeTexto: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF8EC",
  },

  // Rectangle 1 (botón) → left:122, top:493, w:184, h:61 (relativo a pantalla completa)
  // convertido a relativo dentro de "card" (top:155): top = 493-155 = 338
  botonJugar: {
    position: "absolute",
    left: `${((122 - 0) / 390.525) * 100}%`,
    top: `${((493 - 155) / 441.681) * 100}%`,
    width: `${(184 / 390.525) * 100}%`,
    height: `${(61 / 441.681) * 100}%`,
    backgroundColor: COLORS.coral,
    borderRadius: 10,
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
  jugarTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 0.5,
  },

  // flecha 1 → left:23, top:26, w:99, h:101 (sobre 453x906)
  flecha: {
    position: "absolute",
    left: `${(23 / DESIGN_WIDTH) * 100}%`,
    top: `${(26 / DESIGN_HEIGHT) * 100}%`,
    width: `${(99 / DESIGN_WIDTH) * 100}%`,
    height: `${(101 / DESIGN_HEIGHT) * 100}%`,
  },
  flechaImage: {
    width: "100%",
    height: "100%",
  },
});
