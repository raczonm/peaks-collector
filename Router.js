import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, IconButton } from 'react-native-paper';
import { View } from 'react-native';

import HeaderLogo from './src/Components/HeaderLogo';
import DrawerContent from './src/Components/Drawer';

import Home from './src/Screens/Home';
import Map from './src/Screens/Map';
import Search from './src/Screens/Search';
import Achievements from './src/Screens/Achievements'
import UpdateAccount from './src/Screens/Account/UpdateAccount';
import Signup from './src/Screens/Account/Signup';
import ChangePassword from './src/Screens/Account/ChangePassword';
import Contact from './src/Screens/Account/Contact';

import ActivityWrapper from './src/Screens/Activity/ActivityWrapper';

import AddPeak from './src/Screens/AddPeak';
import PeakDetails from './src/Screens/PeakDetails';
// import MyPeaks from './src/Screens/MyPeaks';


const tabsNav = [
    {
        key: 'home',
        name: 'Home',
        component: Home,
        iconName: 'home'
    },
    {
        key: 'achievements',
        name: 'Achievements',
        component: Achievements,
        iconName: 'trophy'
    },
    // {
    //     key: 'peaks',
    //     name: 'My Peaks',
    //     component: MyPeaks,
    //     iconName: 'summit'
    // },
    {
        key: 'map',
        name: 'Map',
        component: Map,
        iconName: 'map-search'
    },
    {
        key: 'search',
        name: 'Search',
        component: Search,
        iconName: 'magnify'
    },
];


const TabsWrapper = ({ navigation }) => {
    const theme = useTheme();
    const Tabs = createBottomTabNavigator();

    return <View style={{ flex: 1}}>
        <Tabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                headerRight: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} size={30} />,
                headerLeft: () => <HeaderLogo />
            }}>
            {tabsNav.map(item => (
                <Tabs.Screen
                    key={item.key}
                    name={item.name}
                    component={item.component}
                    options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={item.iconName} color={color} size={size} /> }} 
                />
            ))}
        </Tabs.Navigator>
    </View>
}

const MainWrapper = () => {
    const theme = useTheme();
    const Drawer = createDrawerNavigator();

    const { isRegistered } = useSelector(state => state.account);

    return <>
        <Drawer.Navigator
            initialRouteName="InnerMain"
            drawerContent={DrawerContent}
            screenOptions={({ navigation }) => ({
                headerRight: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} size={30} />,
                headerLeft: () => <HeaderLogo />,
                drawerPosition: 'right',
                drawerActiveTintColor: theme.colors.primary,
                drawerActiveBackgroundColor: theme.colors.white,
                drawerItemStyle: { marginBottom: 0, marginTop: 0 },
                drawerLabelStyle: { textAlign: 'center', marginRight: -32 }
            })}
        >
            <Drawer.Screen name="Tabs" component={TabsWrapper} options={{ title: 'Home', headerShown: false }} />
            {isRegistered ? 
                <>
                    <Drawer.Screen name="Update profile" component={UpdateAccount} />
                    <Drawer.Screen name="Change password" component={ChangePassword} />
                </> :
                    <Drawer.Screen name="Create profile" component={Signup} />
            }
           
            <Drawer.Screen name="Contact" component={Contact} options={{ title: 'Contact / About Us' }}  />
        </Drawer.Navigator>
        
    </>;
};

// ROOT NAVIGATOR
export default () => {
    const Stack = createNativeStackNavigator();

    return <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" options={{ headerShown: false }} component={MainWrapper} />
                <Stack.Screen name="Activity" options={{ headerShown: false }} component={ActivityWrapper} />
                <Stack.Screen name="Add Peak" component={AddPeak} options={{ headerBackTitle: 'cancel' }} /> 
                <Stack.Screen name="Peak Details" component={PeakDetails} options={{ headerBackTitle: 'back' }} />
            </Stack.Navigator>
        </NavigationContainer>
    </>;
}