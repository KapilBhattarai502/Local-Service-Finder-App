import userReducer, { setUser } from "../redux/userSlice";
import notificationReducer, {
  addNotification,
} from "../redux/notificationSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("Booking Integration Test", () => {
  test("booking updates user bookings and creates notification", () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
        notifications: notificationReducer,
      },
    });

    const currentUser = {
      id: "user123",
      name: "Kriti",
      email: "kriti@test.com",
      address: "Melbourne",
      contactNumber: "0400000000",
      bookings: [],
    };

    store.dispatch(setUser(currentUser));

    const provider = {
      id: "provider123",
      name: "Shine Cleaning",
      service: "Cleaning",
      address: "City Melbourne",
      contactNumber: "0499999999",
    };

    const bookingData = {
      service: provider.service,
      providerName: provider.name,
      providerId: provider.id,
      providerAddress: provider.address,
      providerContact: provider.contactNumber,
      bookedAt: new Date().toISOString(),
    };

    store.dispatch(
      setUser({
        ...currentUser,
        bookings: [bookingData],
      })
    );

    store.dispatch(
      addNotification({
        id: Date.now().toString(),
        title: "Booking Confirmed",
        message: `Your booking with ${provider.name} is confirmed.`,
        createdAt: new Date().toISOString(),
      })
    );

    const state = store.getState();

    expect(state.user.currentUser.bookings.length).toBe(1);
    expect(state.user.currentUser.bookings[0].service).toBe("Cleaning");
    expect(state.notifications.notifications.length).toBe(1);
    expect(state.notifications.notifications[0].title).toBe(
      "Booking Confirmed"
    );
  });
});
