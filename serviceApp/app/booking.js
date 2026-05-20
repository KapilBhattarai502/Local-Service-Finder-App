import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearServices } from "../redux/serviceSlice";
import { useRouter } from "expo-router";

export default function Booking() {
  const services = useSelector((state) => state.service.selectedServices);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBooking = () => {
    if (services.length === 0) {
      Alert.alert("No services selected");
      return;
    }

    const serviceList = services.join(", ");
    Alert.alert("Booking Confirmed", `${serviceList} services are booked!`);
    router.replace("/");

    dispatch(clearServices());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Selected Services</Text>

        {services.length === 0 ? (
          <Text style={styles.service}>None</Text>
        ) : (
          services.map((item, index) => (
            <Text key={index} style={styles.service}>
              • {item}
            </Text>
          ))
        )}

        <Text style={styles.label}>Estimated Price</Text>
        <Text style={styles.price}>$50 - $100 per service</Text>

        <Text style={styles.label}>Availability</Text>
        <Text style={styles.available}>Available Today</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  service: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    color: "#2e7d32",
    marginTop: 5,
  },
  available: {
    fontSize: 16,
    color: "#0288d1",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
