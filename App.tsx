import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <Stack.Navigator>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </KeyboardAvoidingView>

            {/* <HomeScreen /> */}
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
