import React, { useEffect } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import { markAllAsRead } from "../redux/notificationSlice";

export default function NotificationScreen() {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const dispatch = useDispatch();

  // MARK ALL AS READ WHEN SCREEN OPENS

  useEffect(() => {
    dispatch(markAllAsRead());
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notifications.length}</Text>
        </View>
      </View>

      {/* EMPTY STATE */}

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-outline" size={90} color="#bbb" />

          <Text style={styles.emptyTitle}>No Notifications Yet</Text>

          <Text style={styles.emptyText}>
            Your booking notifications will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, !item.isRead && styles.unreadCard]}>
              {/* ICON */}

              <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={24} color="#fff" />
              </View>

              {/* CONTENT */}

              <View style={{ flex: 1 }}>
                <View style={styles.topContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>

                  {!item.isRead && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.message}>{item.message}</Text>

                <Text style={styles.time}>
                  {new Date(item.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
  },

  badge: {
    minWidth: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 10,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",

    borderRadius: 22,

    padding: 18,

    marginBottom: 16,

    flexDirection: "row",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  unreadCard: {
    borderWidth: 1.5,
    borderColor: "#4A90E2",
  },

  iconContainer: {
    width: 55,
    height: 55,

    borderRadius: 28,

    backgroundColor: "#4A90E2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  topContent: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  unreadDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#4A90E2",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },

  message: {
    marginTop: 6,
    color: "#666",
    lineHeight: 21,
    fontSize: 15,
  },

  time: {
    marginTop: 10,
    color: "#999",
    fontSize: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
  },
});
