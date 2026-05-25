import React, { useEffect, useState } from "react";

import { View, StyleSheet, ActivityIndicator } from "react-native";

import MapView, { Marker } from "react-native-maps";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/database";

export default function MapScreen() {
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
