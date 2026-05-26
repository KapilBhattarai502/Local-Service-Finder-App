import notificationReducer, {
  addNotification,
} from "../redux/notificationSlice";

describe("Notification Reducer", () => {
  test("should add notification correctly", () => {
    const initialState = {
      notifications: [],
    };

    const action = addNotification({
      id: "1",

      title: "Booking Confirmed",

      message: "Booking successful",

      createdAt: new Date().toISOString(),
    });

    const state = notificationReducer(initialState, action);

    expect(state.notifications.length).toBe(1);

    expect(state.notifications[0].title).toBe("Booking Confirmed");
  });
});
