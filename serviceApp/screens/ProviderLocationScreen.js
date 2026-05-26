import React from "react";

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function ProviderLocationScreen({ route, navigation }) {
  const { latitude, longitude, providerName } = route.params;

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* MAP */}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,

          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={providerName}
          pinColor="blue"
        />
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
