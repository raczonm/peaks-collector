import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Slider from 'rn-range-slider';

export default ({ isRange, options, value, setValue }) => {
    const theme = useTheme();

    return (
        <View>
            <Slider
                rangeEnabled={isRange}
                style={styles.slider}
                min={options.min}
                max={options.max}
                step={options.step || 1}
                low={value[0]}
                high={value[1]}
                floatingLabel={false}
                renderThumb={() => <View style={styles.sliderThumb(theme)} />}
                renderRail={() => <View style={styles.sliderRail(theme)} />}
                renderRailSelected={() => <View style={styles.sliderSelectedRail(theme)}/>}
                renderLabel={value => <Text>{value}</Text>}
                onSliderTouchEnd={(low, high) => setValue([low, high])}
            />
            <View style={styles.sliderLabelsWrapper}>
                <Text>{options.min}</Text>
                <Text>{options.max}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderLabelsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 5
    },
    slider: {
        width: '100%'
    },
    sliderThumb: theme => ({
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.primary
    }),
    sliderRail: theme => ({
        flex: 1,
        height: 5,
        backgroundColor: theme.colors.lightGray
    }),
    sliderSelectedRail: theme => ({
        height: 5, 
        backgroundColor: theme.colors.primary
    })
});