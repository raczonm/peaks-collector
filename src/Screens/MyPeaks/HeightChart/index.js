import { useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const LINES_ARRAY = [...Array(20).keys()];
const BASE_PEAKS_ARRAY = [
    { elevation: 8848, name: 'Mount Everest' },
    { elevation: 6961, name: 'Aconcagua' },
    { elevation: 6190, name: 'Denali' },
    { elevation: 5895, name: 'Kilimandzaro' },
    { elevation: 5642, name: 'Elbrus' },
    { elevation: 4810, name: 'Mont Blanc' },
    { elevation: 2230, name: 'Góra kościuszki' },
    { elevation: 4892, name: 'Masyw Vinsona' },
];

const Line = ({ position, text, color }) => (
    <View style={styles.heightLineWrapper(position)}>
        <View style={styles.heightLine(color)} />
        <Text style={styles.heightLineText(color)}>{text}</Text>
    </View>
);

export default ({ peaks }) => {
    const theme = useTheme();
    const scrollViewRef = useRef();
    const [sortedPeaks, setSortedPeaks] = useState([]);

    useEffect(() => {
        peaks && setSortedPeaks(peaks.sort((a, b) => a.elevation > b.elevation));
    }, [peaks]);

    return <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <View style={styles.wrapper}>
            {LINES_ARRAY.map(line => <Line key={line} position={line * 500} text={`${line * 500}m`} color={theme.colors.lightGray} />)}
            {BASE_PEAKS_ARRAY.map(peak => <Line key={peak.name} position={peak.elevation} text={`${peak.name}, ${peak.elevation}m`} color={theme.colors.lightGray} />)}
            {sortedPeaks.map(peak => <Line key={peak.name} position={peak.elevation} text={`${peak.name}, ${peak.elevation}m`} color={theme.colors.primary} />)}
            <View style={styles.mainGrayLine(theme)} />
            {!!sortedPeaks.length && <View style={styles.mainBlueLine(theme, sortedPeaks.at(-1).elevation)} />}
        </View>
    </ScrollView>;
}

const styles = StyleSheet.create({
    wrapper: {
        height: 9000,
        marginTop: 30 
    },
    mainGrayLine: theme => ({
        height: 9000,
        width: 10,
        backgroundColor: theme.colors.lightGray,
        marginLeft: 10,
        marginTop: -9 
    }),
    mainBlueLine: (theme, highestPeakElevation) => ({
        height: highestPeakElevation,
        width: 10,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        bottom: 9,
        left: 10 
    }),
    heightLineWrapper: position => ({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: position
    }),
    heightLine: color => ({
        marginLeft: 10,
        height: 1,
        backgroundColor: color,
        flexGrow: 1
    }),
    heightLineText: color => ({
        paddingHorizontal: 10,
        color
    })
})