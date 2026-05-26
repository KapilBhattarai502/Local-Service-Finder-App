import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

import { db } from "../config/database";

import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

export default function ServiceProvidersScreen({ route, navigation }) {
  const { service } = route.params;

  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleBooking = async (provider) => {
    try {
      // USER SIDE BOOKING DATA

      const bookingData = {
        service: provider.service,

        providerName: provider.name,

        providerId: provider.id,

        providerAddress: provider.address,

        providerContact: provider.contactNumber,

        bookedAt: new Date().toISOString(),
      };

      // STORE BOOKING INSIDE USER DOCUMENT

      await updateDoc(
        doc(db, "users", currentUser.id),

        {
          bookings: arrayUnion(bookingData),
        }
      );

      // SERVICE PROVIDER SIDE BOOKING DATA

      const providerBookingData = {
        userId: currentUser.id,

        userName: currentUser.name,

        address: currentUser.address,

        contactNumber: currentUser.contactNumber,

        service: provider.service,

        bookedAt: new Date().toISOString(),
      };

      // STORE BOOKING INSIDE PROVIDER DOCUMENT

      await updateDoc(
        doc(db, "serviceProviders", provider.id),

        {
          bookings: arrayUnion(providerBookingData),
        }
      );

      // UPDATE REDUX STATE

      dispatch(
        setUser({
          ...currentUser,

          bookings: [...(currentUser.bookings || []), bookingData],
        })
      );

      Alert.alert("Success", "Booking Successful");

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Booking failed");
    }
  };

  const fetchProviders = async () => {
    try {
      const q = query(
        collection(db, "serviceProviders"),

        where("service", "==", service)
      );

      const snapshot = await getDocs(q);

      const providerList = [];

      snapshot.forEach((doc) => {
        providerList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setProviders(providerList);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  // LOADING

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // NO PROVIDERS

  if (providers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={80} color="#999" />

        <Text style={styles.emptyTitle}>No Service Providers</Text>

        <Text style={styles.emptyText}>
          No {service} providers available nearby.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service} Providers</Text>

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* TOP SECTION */}

            <View style={styles.topRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>

              <View>
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.service}>{item.service}</Text>
              </View>
            </View>

            {/* DETAILS */}

            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color="#555" />

              <Text style={styles.infoText}>{item.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="call" size={18} color="#555" />

              <Text style={styles.infoText}>{item.contactNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="cash" size={18} color="#555" />

              <Text style={styles.infoText}>${item.hourlyPrice}/hour</Text>
            </View>

            {/* FOOTER */}

            <View style={styles.footer}>
              <View style={styles.ratingBox}>
                <Ionicons name="star" size={16} color="#FFD700" />

                <Text style={styles.rating}>4.8</Text>
              </View>

              <Text style={styles.available}>Available Now</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() =>
                  navigation.navigate("ProviderLocation", {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    providerName: item.name,
                  })
                }
              >
                <Ionicons name="location" size={18} color="#fff" />

                <Text style={styles.locationButtonText}>See Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBooking(item)}
              >
                <Ionicons name="calendar" size={18} color="#fff" />

                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A90E2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#4A90E2",

    paddingVertical: 10,
    paddingHorizontal: 15,

    borderRadius: 12,

    marginTop: 15,

    alignSelf: "flex-start",
  },

  locationButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  service: {
    color: "#777",
    marginTop: 3,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#22C55E",

    paddingVertical: 12,
    paddingHorizontal: 15,

    borderRadius: 12,

    marginTop: 12,

    justifyContent: "center",
  },

  bookButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    color: "#555",
    flex: 1,
  },

  footer: {
    marginTop: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 5,
    fontWeight: "bold",
  },

  available: {
    color: "green",
    fontWeight: "bold",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyText: {
    color: "gray",
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
  },
});
