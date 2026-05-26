import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/database";

export default function MapScreen({ navigation }) {
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const snapshot = await getDocs(collection(db, "serviceProviders"));

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

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← </Text>
      </TouchableOpacity>

      {/* MAP */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,

          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            coordinate={{
              latitude: provider.latitude,

              longitude: provider.longitude,
            }}
            title={provider.name}
            description={provider.service}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backButton: {
    position: "absolute",

    top: 60,

    left: 20,

    zIndex: 999,

    backgroundColor: "#000",

    paddingVertical: 12,

    paddingHorizontal: 18,

    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 5,
  },

  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
