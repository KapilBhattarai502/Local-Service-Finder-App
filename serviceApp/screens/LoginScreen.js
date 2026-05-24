import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { db } from "../config/database";

import { collection, query, where, getDocs } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");

      return;
    }

    try {
      // CHECK USERS COLLECTION

      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );

      const usersSnapshot = await getDocs(usersQuery);

      // CHECK SERVICE PROVIDERS COLLECTION

      const providersQuery = query(
        collection(db, "serviceProviders"),
        where("email", "==", email),
        where("password", "==", password)
      );

      const providersSnapshot = await getDocs(providersQuery);

      // LOGIN SUCCESS

      if (!usersSnapshot.empty || !providersSnapshot.empty) {
        Alert.alert("Success", "Login Successful");

        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    color: "blue",
  },
});
