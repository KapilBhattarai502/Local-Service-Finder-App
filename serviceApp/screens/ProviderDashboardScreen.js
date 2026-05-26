import React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/userSlice";

export default function ProviderDashboardScreen({ navigation }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const bookings = currentUser?.bookings || [];

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());

    navigation.replace("Login");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Provider Dashboard</Text>

        <Text style={styles.subtitle}>Welcome back, {currentUser?.name}</Text>
      </View>

      {/* TOP FLEX CARDS */}

      <View style={styles.topCardsContainer}>
        {/* BOOKINGS CARD */}

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{bookings.length}</Text>

          <Text style={styles.statsLabel}>Bookings</Text>
        </View>

        {/* LOGOUT CARD */}

        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#fff" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION TITLE */}

      <Text style={styles.sectionTitle}>Customer Bookings</Text>

      {/* EMPTY */}

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={90} color="#bbb" />

          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              {/* TOP */}

              <View style={styles.topRow}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={28} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.customerName}>{item.userName}</Text>

                  <Text style={styles.service}>{item.service}</Text>
                </View>
              </View>

              {/* ADDRESS */}

              <View style={styles.infoRow}>
                <Ionicons name="location" size={18} color="#666" />

                <Text style={styles.infoText}>{item.address}</Text>
              </View>

              {/* CONTACT */}

              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color="#666" />

                <Text style={styles.infoText}>{item.contactNumber}</Text>
              </View>

              {/* DATE */}

              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={18} color="#666" />

                <Text style={styles.infoText}>
                  {new Date(item.bookedAt).toLocaleDateString()}
                </Text>
              </View>

              {/* TIME */}

              <View style={styles.infoRow}>
                <Ionicons name="time" size={18} color="#666" />

                <Text style={styles.infoText}>
                  {new Date(item.bookedAt).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 70,
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    marginTop: 8,
    color: "#666",
    fontSize: 16,
  },

  topCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  statsCard: {
    width: "48%",

    backgroundColor: "#4A90E2",

    borderRadius: 24,

    paddingVertical: 35,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },

  statsNumber: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },

  statsLabel: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
  },

  logoutCard: {
    width: "48%",

    backgroundColor: "#EF4444",

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },

  bookingCard: {
    backgroundColor: "#fff",

    borderRadius: 22,

    padding: 18,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: "#22C55E",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  customerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  service: {
    marginTop: 5,
    color: "#666",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoText: {
    marginLeft: 10,
    color: "#555",
    flex: 1,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
});
