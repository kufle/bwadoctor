import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Chatting,
  ChooseDoctor,
  Doctor,
  DoctorProfile,
  GetStarted,
  Hospitals,
  Login,
  LoginDoctor,
  Messages,
  Register,
  RegisterDoctor,
  Splash,
  UpdateProfile,
  UploadPhoto,
  UserProfile,
} from '../pages';
import {BottomNavigator} from '../components';
import {UserType} from '../types';

type RootStackParamList = {
  [key: string]: object | undefined;
  UploadPhoto: UserType;
  // Rute lain bisa ditambahkan di sini
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Bottom Navigation
const MainApp = () => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Doctor"
        component={Doctor}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Hospitals"
        component={Hospitals}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseDoctor"
        component={ChooseDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginDoctor"
        component={LoginDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterDoctor"
        component={RegisterDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
