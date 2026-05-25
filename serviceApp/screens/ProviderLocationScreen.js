import React from "react";

import { StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function ProviderLocationScreen({ route }) {
  const { latitude, longitude, providerName } = route.params;

  return (
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
