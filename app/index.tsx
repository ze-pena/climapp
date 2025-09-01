import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#00457D", "#05051F"]} style={styles.container}>
      <Image source={require("@/assets/images/home/logo.png")} />

      <Image source={require("@/assets/images/home/ilustration.png")} />

      <Text style={styles.title}>Boas vindas!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/cities/index")}
      >
        <Text style={styles.buttonText}>Entrar</Text>

        <MaterialIcons name="arrow-forward" size={24} color="#01080E" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 64,
    paddingVertical: 80,
    paddingHorizontal: 48,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    backgroundColor: "#7693FF",
    borderRadius: 32,
    flexDirection: "row",
    gap: 16,
  },
  buttonText: {
    fontSize: 20,
    color: "#01080E",
    fontWeight: "600",
    fontFamily: "Montserrat_600SemiBold",
  },
});
