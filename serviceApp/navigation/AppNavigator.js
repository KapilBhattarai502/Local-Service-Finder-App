import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";
import ServiceProvidersScreen from "../screens/ServiceProvidersScreen";
import ProviderLocationScreen from "../screens/ProviderLocationScreen";
import ProviderDashboardScreen from "../screens/ProviderDashboardScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="ServiceProviders"
          component={ServiceProvidersScreen}
        />
        <Stack.Screen
          name="ProviderLocation"
          component={ProviderLocationScreen}
        />
        <Stack.Screen
          name="ProviderDashboard"
          component={ProviderDashboardScreen}
        />

        {/* {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
