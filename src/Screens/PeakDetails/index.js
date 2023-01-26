import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Gallery from './PeakGallery';
import Info from './PeakInfo';

export default ({ route }) => {
    const Stack = createNativeStackNavigator();
    const { peak } = route.params;

    return (
        <Stack.Navigator initialRouteName="Peak Info">
            <Stack.Screen name="Peak Gallery" options={{ headerShown: false }}>{props => <Gallery {...props} peak={peak} />}</Stack.Screen>
            <Stack.Screen name="Peak Info" options={{ headerShown: false }}>{props => <Info {...props} peak={peak} />}</Stack.Screen>
        </Stack.Navigator>
    );
}