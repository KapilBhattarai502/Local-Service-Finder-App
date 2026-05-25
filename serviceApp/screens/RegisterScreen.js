import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../config/database";
import Geocoder from "../config/geocoding";

export default function RegisterScreen({ navigation }) {
  const [userType, setUserType] = useState("Customer");

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const [contactNumber, setContactNumber] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // SERVICE PROVIDER FIELDS

  const [abn, setAbn] = useState("");

  const [hourlyPrice, setHourlyPrice] = useState("");

  const [service, setService] = useState("");

  const services = [
    "Cleaning",
    "Plumbing",
    "Electrician",
    "Dog Wash",
    "Painting",
    "Gardening",
    "Car Wash",
    "Moving",
  ];

  const handleRegister = async () => {
    if (!name || !address || !contactNumber || !email || !password) {
      console.log("no name");
      Alert.alert("Error", "Please fill all common fields");

      return;
    }

    if (userType === "Service Provider" && (!abn || !hourlyPrice || !service)) {
      Alert.alert("Error", "Please fill all service provider fields");
      console.log("no abn");

      return;
    }

    try {
      const collectionName =
        userType === "Service Provider" ? "serviceProviders" : "users";

      const geoResponse = await Geocoder.from(address);

      if (geoResponse.results.length === 0) {
        Alert.alert("Invalid Address", "Please enter a valid address");

        return;
      }

      const location = geoResponse.results[0].geometry.location;

      const latitude = location.lat;

      const longitude = location.lng;

      await addDoc(collection(db, collectionName), {
        userType,

        name,

        address,

        contactNumber,

        email,

        password,

        latitude,

        longitude,

        // SERVICE PROVIDER FIELDS

        abn: userType === "Service Provider" ? abn : "",

        hourlyPrice: userType === "Service Provider" ? hourlyPrice : "",

        service: userType === "Service Provider" ? service : "",

        createdAt: new Date(),
      });

      Alert.alert("Success", `${userType} Registration Successful`);

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Failed to register user");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Register</Text>

      {/* USER TYPE */}

      <Text style={styles.label}>Register As</Text>

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            userType === "Customer" && styles.activeButton,
          ]}
          onPress={() => setUserType("Customer")}
        >
          <Text
            style={[
              styles.typeText,
              userType === "Customer" && styles.activeText,
            ]}
          >
            Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            userType === "Service Provider" && styles.activeButton,
          ]}
          onPress={() => setUserType("Service Provider")}
        >
          <Text
            style={[
              styles.typeText,
              userType === "Service Provider" && styles.activeText,
            ]}
          >
            Service Provider
          </Text>
        </TouchableOpacity>
      </View>

      {/* COMMON FIELDS */}

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Contact Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* SERVICE PROVIDER FIELDS */}

      {userType === "Service Provider" && (
        <>
          <TextInput
            placeholder="ABN"
            style={styles.input}
            value={abn}
            onChangeText={setAbn}
          />

          <TextInput
            placeholder="Hourly Price ($)"
            keyboardType="numeric"
            style={styles.input}
            value={hourlyPrice}
            onChangeText={setHourlyPrice}
          />

          <Text style={styles.label}>Select Service</Text>

          <View style={styles.serviceContainer}>
            {services.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.serviceButton,
                  service === item && styles.selectedServiceButton,
                ]}
                onPress={() => setService(item)}
              >
                <Text
                  style={[
                    styles.serviceText,
                    service === item && styles.selectedServiceText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* REGISTER BUTTON */}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F5F5F5",
    flexGrow: 1,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  typeButton: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  activeButton: {
    backgroundColor: "#000",
  },

  typeText: {
    fontWeight: "600",
  },

  activeText: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  serviceButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  selectedServiceButton: {
    backgroundColor: "#000",
  },

  serviceText: {
    fontSize: 14,
  },

  selectedServiceText: {
    color: "#fff",
  },

  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    textAlign: "center",
    color: "blue",
    marginTop: 20,
    marginBottom: 30,
  },
});
