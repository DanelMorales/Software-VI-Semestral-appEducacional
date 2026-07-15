// src/app/index.tsx
import {
  ComicRelief_400Regular,
  ComicRelief_700Bold,
  useFonts,
} from "@expo-google-fonts/comic-relief";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { guardarNombre } from "../services/storage";

export default function BienvenidaScreen() {
  const [nombre, setNombre] = useState("");

  const [fontsLoaded] = useFonts({
    ComicRelief_400Regular,
    ComicRelief_700Bold,
  });

  const continuar = async (nombreFinal: string) => {
    await guardarNombre(nombreFinal);
    router.replace("/inicio");
  };

  if (!fontsLoaded) {
    // Puedes reemplazar esto por un splash/loader si ya tienes uno configurado
    return <View style={styles.screen} />;
  }

  return (
    <View style={styles.screen}>
      {/* Fondo a pantalla completa — reemplaza el fondo blanco original */}
      <Image
        source={require("../../assets/images/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.barnWrap}>
          <Image
            source={require("../../assets/images/titulo.png")}
            style={styles.tituloImage}
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
            onPress={() => continuar(nombre || "Explorador")}
          >
            <Text style={styles.btnGuestText}>CONTINUAR</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.btnLogin,
              pressed && styles.btnPressed,
            ]}
            onPress={() => continuar("Invitado")}
          >
            <Text style={styles.btnLoginText}>CONTINUAR COMO INVITADO</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const COLORS = {
  coral: "#DE5147",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
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
  // Todo el contenido va encima del fondo
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  barnWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100, // aqui se configura si quiero subir o bajar el titulo
  },
  tituloImage: {
    width: "100%",
    height: 230,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontFamily: "ComicRelief_700Bold",
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: "ComicRelief_400Regular",
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  buttons: {
    gap: 18,
    marginBottom: 150,
  },
  btnGuest: {
    backgroundColor: COLORS.coral,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    // sombra igual al diseño de Figma: 0px 4px 4px rgba(0,0,0,0.25)
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnGuestText: {
    color: COLORS.white,
    fontFamily: "ComicRelief_700Bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  btnLogin: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnLoginText: {
    color: COLORS.coral,
    fontFamily: "ComicRelief_700Bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  btnPressed: {
    transform: [{ scale: 0.98 }],
  },
});
