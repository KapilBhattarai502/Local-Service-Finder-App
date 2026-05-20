import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addService, removeService } from "../redux/serviceSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedServices = useSelector(
    (state) => state.service.selectedServices
  );

  const services = [
    {
      name: "Cleaning",
      image: "https://cdn-icons-png.flaticon.com/512/995/995053.png",
    },
    {
      name: "Plumbing",
      image: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
    },
    {
      name: "Electrician",
      image: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    },
    {
      name: "Painting",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
    },
    {
      name: "Gardening",
      image: "https://cdn-icons-png.flaticon.com/512/2909/2909767.png",
    },
    {
      name: "Tutoring",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
    },
  ];

  const handleSelect = (service) => {
    if (selectedServices.includes(service)) {
      dispatch(removeService(service)); // unselect
    } else {
      dispatch(addService(service)); // select
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Find Local Services</Text>

      <View style={styles.grid}>
        {services.map((service, index) => {
          const isSelected = selectedServices.includes(service.name);

          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => handleSelect(service.name)}
            >
              <Image source={{ uri: service.image }} style={styles.image} />
              <Text style={styles.text}>{service.name}</Text>

              {isSelected && <Text style={styles.selected}>✓ Selected</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* GO TO BOOKING BUTTON */}
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => router.push("/booking")}
      >
        <Text style={styles.bookingText}>
          Go to Booking
          {/* {selectedServices.length > 0 ? selectedServices.length : ""} */}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  selected: {
    marginTop: 5,
    color: "#007AFF",
    fontWeight: "bold",
  },
  bookingButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  bookingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
