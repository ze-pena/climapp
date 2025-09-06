import citiesList from "@/shared/data/cities.json";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function City() {
  const searchParams = useLocalSearchParams();
  const cityDetails = useMemo(() => {
    return citiesList.find((city) => city.city_name === searchParams.name);
  }, [searchParams.name]);

  console.log(cityDetails);

  return (
    <LinearGradient colors={["#00457D", "#05051F"]} style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="chevron-left"
          color="#fff"
          size={24}
          style={styles.headerIcon}
        />

        <Text style={styles.headerTitle}>{cityDetails?.city}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>Hoje {cityDetails?.date}</Text>
        </View>

        <View style={styles.cardBody}>
          <Image
            source={require("@/assets/images/cities/climate_sun.png")}
            style={styles.cardBodyImage}
          />
          <View style={styles.cardBodyInfo}>
            <Text style={styles.cardBodyInfoTemperature}>
              {cityDetails?.temp}°
            </Text>
            <Text style={styles.cardBodyInfoDescription}>
              {cityDetails?.description}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.cardFooterDetail}>
            <Image
              style={styles.cardFooterDetailImage}
              source={require("@/assets/images/cities/icon_humidity.png")}
            />
            <Text style={styles.cardFooterDetailLabel}>Humidity:</Text>
            <Text style={styles.cardFooterDetailValue}>
              {cityDetails?.humidity}%
            </Text>
          </View>

          <View style={styles.cardFooterDetail}>
            <Image
              style={styles.cardFooterDetailImage}
              source={require("@/assets/images/cities/icon_temperature.png")}
            />
            <Text style={styles.cardFooterDetailLabel}>Min/Max:</Text>
            <Text style={styles.cardFooterDetailValue}>
              {cityDetails?.forecast[0].min}/{cityDetails?.forecast[0].max}°
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    paddingHorizontal: 24,
    gap: 40,
  },
  header: {
    alignItems: "center",
  },
  headerIcon: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
  },
  card: {
    padding: 16,
    backgroundColor: "#4463D5",
    borderRadius: 24,
    gap: 24,
  },
  cardHeader: {
    alignItems: "center",
  },
  cardHeaderTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  cardBody: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardBodyImage: {
    width: 76,
    height: 76,
    resizeMode: "contain",
  },
  cardBodyInfo: {
    alignItems: "center",
  },
  cardBodyInfoTemperature: {
    color: "#fff",
    fontSize: 42,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  cardBodyInfoDescription: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  cardFooter: {
    alignSelf: "stretch",
    gap: 16,
  },
  cardFooterDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardFooterDetailImage: {
    width: 24,
    height: 24,
  },
  cardFooterDetailLabel: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  cardFooterDetailValue: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
  },
});
