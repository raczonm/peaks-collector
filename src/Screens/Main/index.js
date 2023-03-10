import { useTheme, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Home';
import Map from '../Map';
import MyPeaks from '../MyPeaks';
import Achievements from '../Achievements';
import HeaderButton from '../../Components/HeaderButton';
import HeaderLogo from '../../Components/HeaderLogo';
import Search from '../Search';
import DrawerContent from '../../Components/Drawer';

const tabsNav = [
    {
        key: 'home',
        name: 'Home',
        component: Home,
        iconName: 'home'
    },
    // {
    //     key: 'achievements',
    //     name: 'Achievements',
    //     component: Achievements,
    //     iconName: 'trophy'
    // },
    {
        key: 'peaks',
        name: 'My Peaks',
        component: MyPeaks,
        iconName: 'summit'
    },
    // {
    //     key: 'map',
    //     name: 'Map',
    //     component: Map,
    //     iconName: 'map-search'
    // },
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

export default () => {
    const theme = useTheme();
    const Drawer = createDrawerNavigator();

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
            {/* <Drawer.Screen name="Settings" component={() => <Text>Settings</Text>} />
            <Drawer.Screen name="Contact Us" component={() => <Text>Report bug</Text>} /> */}
        </Drawer.Navigator>
        
    </>;
};