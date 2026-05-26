import React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/userSlice";

export default function ProfileScreen({ navigation }) {
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
        <View style={styles.profileImageContainer}>
          <Ionicons name="person" size={55} color="#fff" />
        </View>

        <Text style={styles.name}>{currentUser?.name || "User"}</Text>

        <Text style={styles.email}>{currentUser?.email}</Text>
      </View>

      {/* STATS + LOGOUT */}

      <View style={styles.statsContainer}>
        {/* BOOKINGS */}

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{bookings.length}</Text>

          <Text style={styles.statLabel}>Bookings</Text>
        </View>

        {/* RATING */}

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>⭐ 4.9</Text>

          <Text style={styles.statLabel}>Rating</Text>
        </View>

        {/* LOGOUT */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />

          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* BOOKINGS TITLE */}

      <Text style={styles.sectionTitle}>Your Bookings</Text>

      {/* EMPTY BOOKINGS */}

      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={90} color="#bbb" />

          <Text style={styles.emptyTitle}>No Bookings Yet</Text>

          <Text style={styles.emptyText}>
            Your booked services will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              {/* TOP SECTION */}

              <View style={styles.bookingTop}>
                <View style={styles.serviceIcon}>
                  <Ionicons name="construct" size={28} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.providerName}>{item.providerName}</Text>

                  <Text style={styles.serviceName}>{item.service}</Text>
                </View>
              </View>

              {/* DATE */}

              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={18} color="#666" />

                <Text style={styles.detailText}>
                  {new Date(item.bookedAt).toLocaleDateString()}
                </Text>
              </View>

              {/* TIME */}

              <View style={styles.detailRow}>
                <Ionicons name="time" size={18} color="#666" />

                <Text style={styles.detailText}>
                  {new Date(item.bookedAt).toLocaleTimeString()}
                </Text>
              </View>

              {/* STATUS */}

              <View style={styles.statusContainer}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Confirmed</Text>
                </View>
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
    alignItems: "center",
    marginTop: 70,
    marginBottom: 30,
  },

  profileImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,

    backgroundColor: "#4A90E2",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 5,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },

  email: {
    marginTop: 5,
    color: "#777",
    fontSize: 15,
  },

  statsContainer: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 30,
  },

  statCard: {
    backgroundColor: "#fff",

    width: "30%",

    paddingVertical: 22,

    borderRadius: 20,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  statLabel: {
    marginTop: 6,
    color: "#666",
    fontSize: 13,
  },

  logoutButton: {
    width: "30%",

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 18,

    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 4,
  },

  logoutText: {
    color: "#fff",

    fontSize: 13,

    fontWeight: "bold",

    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
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

  bookingTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: "#22C55E",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  providerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  serviceName: {
    marginTop: 5,
    color: "#666",
    fontSize: 15,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  detailText: {
    marginLeft: 10,
    color: "#555",
    fontSize: 15,
  },

  statusContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },

  statusBadge: {
    backgroundColor: "#DCFCE7",

    paddingVertical: 8,
    paddingHorizontal: 14,

    borderRadius: 20,
  },

  statusText: {
    color: "#166534",
    fontWeight: "bold",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#111",
  },

  emptyText: {
    color: "#777",
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});
