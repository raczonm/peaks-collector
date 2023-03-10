import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import LatestPeaks from './LatestPeaks';
import Wishlist from './Wishlist';
import UserInfo from '../../Components/UserInfo';

export default () => {
    const theme = useTheme();
    const HomeTabs = createMaterialTopTabNavigator();

    return (
        <View>
            <UserInfo />
            <View style={styles.tabsWrapper}>
                <HomeTabs.Navigator screenOptions={{ tabBarIndicatorStyle: styles.tabsIndicatorStyles(theme)}}>
                    <HomeTabs.Screen name="Latest Peaks" component={() => <Text>Latest Peaks</Text>} />
                    <HomeTabs.Screen name="Wishlist" component={Wishlist} />
                    <HomeTabs.Screen name="Activities" component={() => <Text>activities</Text>} />
                </HomeTabs.Navigator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabsWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 305
    },
    tabsIndicatorStyles: theme => ({
        backgroundColor: theme.colors.primary
    })
})