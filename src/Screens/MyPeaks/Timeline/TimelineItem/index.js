import { Text, useTheme } from 'react-native-paper';
import { View, Dimensions, StyleSheet } from 'react-native';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MAX_PEAK_HEIGHT = 8800;

const PeakLine = ({ name, elevation }) => {
    const theme = useTheme();
    const maxPeakLineHeight = Dimensions.get('window').height - 450;
    const peakLineHeight = (maxPeakLineHeight * elevation) / MAX_PEAK_HEIGHT;
    
    return <View style={styles.singlePeak}>
        <Text style={styles.peakText(peakLineHeight)}>{name} {elevation}m</Text>
        <View style={styles.peakLine(theme, peakLineHeight)}></View>
    </View>;
}


export default ({ date, peaks }) => {
    const theme = useTheme();
    const isEmpty = !peaks.length;
    const moreThanTwoPeaks = peaks.length > 2;

    return <View style={styles.wrapper(theme, moreThanTwoPeaks, peaks.length)}>
         {!isEmpty && <View style={styles.peaksWrapper}>
            {peaks.map(peak => <PeakLine key={peak.activityId} name={peak.name} elevation={peak.elevation} />)}
        </View>}
        <View style={styles.dateWrapper}>
            <Text style={styles.dateText} variant="headlineSmall">{date.getDate()}</Text>
            <Text style={styles.dateText} variant="bodySmall">{`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}</Text>
        </View>
        <View style={styles.bottomLine(theme, isEmpty)}></View>
    </View>
};


const styles = StyleSheet.create({
    wrapper: (theme, moreThanTwoPeaks, peaksCount) => ({
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        width: 80 + (moreThanTwoPeaks ? (15 * (peaksCount - 2)) : 0),
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.lightGray
    }),
    peaksWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    singlePeak: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: 5 
    },
    peakText: peakLineHeight => ({
        position: 'absolute',
        bottom: peakLineHeight,
        left: -123,
        transform: [{ rotate: '-90deg' }],
        alignSelf: 'flex-start',
        marginBottom: 130,
        width: 250
    }),
    peakLine: (theme, peakLineHeight) => ({
        height: peakLineHeight, 
        width: 5,
        backgroundColor: theme.colors.primary
    }),
    dateWrapper: {
        paddingVertical: 10
    },
    dateText: {
        textAlign: 'center'
    },
    bottomLine: (theme, isEmpty) => ({
        height: 1, 
        width: '100%',
        borderTopWidth: 10,
        borderColor: isEmpty ? theme.colors.lightGray : theme.colors.primary
    })
})