import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./app/utility/routes";

import ToDoDetailListScreen from "./app/screens/ToDoDetailListScreen";
import ToDoListScreen from "./app/screens/ToDoListScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.TO_DO} component={ToDoListScreen} />
    <Stack.Screen
      name={routes.TO_DO_DETAILS}
      component={ToDoDetailListScreen}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
