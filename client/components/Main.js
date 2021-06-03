import React from 'react'
import { connect } from 'react-redux'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import SignupScreen from './SignupScreen'
import ParkScreen from './ParkScreen'
import ProfileScreen from './ProfileScreen'
import HistoryScreen from './HistoryScreen'
import ScheduleScreen from './ScheduleScreen'
import MOSJA from './MOSJA'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AppearanceProvider } from 'react-native-appearance'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const DetailStact = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = focused ? 'home' : 'home'
                    }
                    else if (route.name === 'Park') {
                        iconName = focused ? 'car' : 'car'
                    }
                    else if (route.name === 'Schedule') {
                        iconName = focused ? 'calendar' : 'calendar'
                    }
                    else if (route.name === 'History') {
                        iconName = focused ? 'history' : 'history'
                    }
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />
                },
            })}
            tabBarOptions={{
                activeTintColor: '#e94560',
                inactiveTintColor: '#8d93ab',
                tabStyle: {
                    backgroundColor: '#16213e'
                }
                // labelPosition: "beside-icon"
            }}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} options={option} />
            <Tab.Screen name="Park" component={ParkScreen} options={option} />
            <Tab.Screen name="Schedule" component={ScheduleScreen} options={option} />
            <Tab.Screen name="History" component={HistoryScreen} options={option} />
        </Tab.Navigator>
    )
}

const Main = () => {
    return (
        <AppearanceProvider>
            <NavigationContainer theme={DarkTheme}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} options={option} />
                    <Stack.Screen name="Signup" component={SignupScreen} options={option} />
                    <Stack.Screen name="Details" component={MOSJA} options={{ title: "My App", headerLeft: null, ...option }} />
                    <Stack.Screen name="Profile" component={ProfileScreen} options={option} />
                    <Stack.Screen name="Park" component={ParkScreen} options={option} />
                    <Stack.Screen name="Schedule" component={ScheduleScreen} options={option} />
                    <Stack.Screen name="History" component={HistoryScreen} options={option} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppearanceProvider>
    )
}

const mapStateProps = (state) => ({
    user: state.user,
})

const option = {
    headerStyle: {
        // backgroundColor: '#2980b9',
        backgroundColor: '#16213e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

export default connect(mapStateProps)(Main)
