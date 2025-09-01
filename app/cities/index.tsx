import useDebouncer from "@/shared/hooks/useDebouncer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import citiesList from "../../shared/data/cities.json";

type City = (typeof citiesList)[0];

function CityItem({ city }: { city: City }) {
  const formattedName = city.city.replace(", ", " - ");
  const router = useRouter();

  function handlePressCity() {
    router.push({ pathname: "/cities/[name]", params: { name: city.city } });
  }

  return (
    <TouchableOpacity style={styles.cityItem} onPress={handlePressCity}>
      <Image source={require("@/assets/images/cities/climate_sun.png")} />
      <Text style={styles.cityName}>{formattedName}</Text>
      <Text style={styles.cityTemperature}>{city.temp}°</Text>
    </TouchableOpacity>
  );
}

export default function Cities() {
  const [search, setSearch] = useState("");
  const [filteredCitiesList, setFilteredCitiesList] = useState<City[]>([]);

  const filterCitiesList = useCallback(() => {
    const newFilteredCitiesList = citiesList.filter((city) => {
      const formattedCity = city.city.toLowerCase();
      const formattedSearch = search.toLowerCase();

      return formattedCity.includes(formattedSearch);
    });

    setFilteredCitiesList(newFilteredCitiesList);
  }, [search]);

  useDebouncer({ dependency: search, action: filterCitiesList, delay: 800 });

  return (
    <LinearGradient colors={["#00457D", "#05051F"]} style={styles.container}>
      <View style={styles.searchContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite a cidade"
            placeholderTextColor="#FFFFFF"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <MaterialIcons name="search" size={24} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView>
        <View style={styles.scrollContent}>
          {filteredCitiesList.map((city) => (
            <CityItem key={city.city} city={city} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 64,
    gap: 16,
  },
  searchContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 24,
    gap: 16,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
  },
  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  cityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
  },
  cityName: {
    flexGrow: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  cityTemperature: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
  },
});
