import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { services } from "../data/data";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Find Local Services Near You</Text>
      </View>

      {/* SEARCH BAR */}

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="gray" />

        <TextInput
          placeholder="Search services..."
          style={styles.searchInput}
        />
      </View>

      {/* SERVICES */}

      <Text style={styles.sectionTitle}>Popular Services</Text>

      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: service.color }]}
          >
            {service.icon}

            <Text style={styles.cardText}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FEATURED SECTION */}

      <Text style={styles.sectionTitle}>Featured Professionals</Text>

      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>Spark Electrical Services</Text>

        <Text style={styles.featuredText}>⭐ 4.9 • Melbourne</Text>

        <Text style={styles.featuredText}>
          Fast and affordable electrical repairs
        </Text>
      </View>

      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>Shine Home Cleaning</Text>

        <Text style={styles.featuredText}>⭐ 4.8 • Melbourne</Text>

        <Text style={styles.featuredText}>
          Professional house and office cleaning
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    marginBottom: 25,
  },

  greeting: {
    fontSize: 18,
    color: "gray",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 25,
    height: 55,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "47%",
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  featuredCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
  },

  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  featuredText: {
    color: "gray",
    marginBottom: 3,
  },
});
