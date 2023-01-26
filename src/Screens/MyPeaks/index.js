import { useContext, useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';

import AccountContext from '../../Context/AccountContext';
import PeaksContext from '../../Context/PeaksContext';
import PeaksList from './PeaksList';
import Timeline from './Timeline';
import HeightChart from './HeightChart';
import Map from './Map';
import ModalSpinner from '../../Components/ModalSpinner';


export default () => {
    const theme = useTheme()
    const MyPeaksTabs = createMaterialTopTabNavigator();

    const { entrances } = useContext(AccountContext);
    const { peaks } = useContext(PeaksContext)
    const [uniquePeaks, setUniquePeaks] = useState([]);
    const [peaksWithData, setPeaksWithData] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (peaks && entrances) {
            const uniquePeaksIds = [...new Set(entrances.map(peak => peak.peakId ))];

            setUniquePeaks(uniquePeaksIds.map(peakId => peaks[peakId]));
            setPeaksWithData(entrances.map(userPeak => {
                return { ...peaks[userPeak.peakId], activityId: userPeak.activityId, conquerDate: userPeak.conquerDate } || 
                    { id: userPeak.peakId, activityId: userPeak.activityId };
            }));
            
            setIsReady(true);
        }
    }, [peaks, entrances]);

    return (
        <View styled={{ flex: 1 }}>
            {isReady ?
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 180 }}>
                    <MyPeaksTabs.Navigator screenOptions={{ swipeEnabled: false, tabBarIndicatorStyle: styles.tabsIndicatorStyles(theme) }}>
                        <MyPeaksTabs.Screen name="List">{props => <PeaksList {...props} peaks={peaksWithData} />}</MyPeaksTabs.Screen>
                        <MyPeaksTabs.Screen name="Timeline" navigationOptions={{ gesturesEnabled: false }}>{props => <Timeline {...props} peaks={peaksWithData} />}</MyPeaksTabs.Screen>
                        <MyPeaksTabs.Screen name="Height">{props => <HeightChart {...props} peaks={uniquePeaks} />}</MyPeaksTabs.Screen>
                        <MyPeaksTabs.Screen name="Map">{props => <Map {...props} peaks={uniquePeaks} />}</MyPeaksTabs.Screen>
                    </MyPeaksTabs.Navigator>
                </View>:
                <ModalSpinner isVisible={isReady} label="Loading..." />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    tabsIndicatorStyles: theme => ({
        backgroundColor: theme.colors.primary
    })
});