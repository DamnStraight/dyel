import DashboardScreen from "@App/screens/Dashboard";
import ExerciseScreen from "@App/screens/Exercises";
import HistoryScreen from "@App/screens/History";
import WorkoutScreen from "@App/screens/Workouts";
import AddWorkoutModal from "@App/screens/Workouts/AddWorkoutModal";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  BottomTabScreenProps,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import {
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  NavigatorScreenParams
} from "@react-navigation/native";
import {
  createNativeStackNavigator, NativeStackScreenProps
} from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    primary: "white",
    background: "#18181b",
    card: "#18181b",
    text: "#fafafa",
    border: "#3f3f46",
    notification: "rgb(255, 69, 58)",
  },
};

// ─── Exercise Navigation ───────────────────────────────────────────────── ✣ ─

export type RootExerciseStackParamList = {
  ExerciseScreen: undefined;
};

const ExerciseStack = createNativeStackNavigator<RootExerciseStackParamList>();

function ExerciseStackNavigation() {
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Group screenOptions={{ headerShown: false }}>
        <ExerciseStack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
        />
      </ExerciseStack.Group>
    </ExerciseStack.Navigator>
  );
}

// ─── Workout Navigation ───────────────────────────────────────────────── ✣ ─

export type RootWorkoutStackParamList = {
  WorkoutScreen: undefined;
  AddWorkoutModal: undefined;
  ActiveWorkoutModal: undefined;
};

const WorkoutStack = createNativeStackNavigator<RootWorkoutStackParamList>();

function WorkoutStackNavigation({
  navigation,
  route,
}: BottomTabScreenProps<RootTabParamList>) {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "AddWorkoutModal") {
      navigation.setOptions({ tabBarStyle: { display: "none", height: 0, width: 0 , backgroundColor: 'transparent' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 95 } });
    }
  }, [navigation, route]);

  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Group screenOptions={{ headerShown: false }}>
        <WorkoutStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      </WorkoutStack.Group>
      <WorkoutStack.Group>
        {/* <WorkoutStack.Group screenOptions={{ presentation: "fullScreenModal" }}> */}
        <WorkoutStack.Screen
          name="AddWorkoutModal"
          component={AddWorkoutModal}
          options={{
            title: "Create Workout",
            headerShown: false
          }}
        />
      </WorkoutStack.Group>
    </WorkoutStack.Navigator>
  );
}

// ─── Root Navigation ───────────────────────────────────────────────────── ✣ ─

export type RootTabParamList = {
  Dashboard: undefined;
  Exercises: NavigatorScreenParams<RootExerciseStackParamList>;
  Workouts: NavigatorScreenParams<RootWorkoutStackParamList>;
  History: undefined;
};

const RootTab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <RootTab.Navigator screenOptions={{ tabBarStyle: { height: 95 } }}>
        <RootTab.Group screenOptions={{ headerShown: false }}>
          <RootTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="tachometer-alt" size={size} color={color} />
              ),
              unmountOnBlur: true
            }}
            name="Dashboard"
            component={DashboardScreen}
          />
          <RootTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="dumbbell" size={size} color={color} />
              ),
              unmountOnBlur: true
            }}
            name="Exercises"
            component={ExerciseStackNavigation}
          />
          <RootTab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="running" size={size} color={color} />
              ),
              unmountOnBlur: true
            }}
            name="Workouts"
            component={WorkoutStackNavigation}
          />
          <RootTab.Screen
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="chart-bar" size={size} color={color} />
              ),
            }}
            name="History"
            component={HistoryScreen}
          />
        </RootTab.Group>
      </RootTab.Navigator>
    </NavigationContainer>
  );
}
