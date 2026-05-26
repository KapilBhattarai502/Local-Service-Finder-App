import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",

  initialState: {
    notifications: [],
  },

  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift({
        ...action.payload,

        isRead: false,
      });
    },

    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,

        isRead: true,
      }));
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addNotification,

  markAllAsRead,

  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
