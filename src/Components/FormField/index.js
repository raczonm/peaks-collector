import { useState, useEffect } from 'react';
import { Text, TextInput, Switch, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Slider from 'rn-range-slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ onChange, name, form, label, options = {}, initialValue = '', type = 'text', withBottomBorder = true, icon, description }) => {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);

    const renderTextInput = () => (
        <TextInput
            placeholder={options.placeholder}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={text => setValue(text)}
            multiline={options.isMultiline}
            underlineColor="transparent"
            style={styles.input(icon)}
            secureTextEntry={options.isSecure}
        />
    );
    
    const renderSwitch = () => (
        <Switch value={value} onValueChange={value => setValue(value)} />
    )

    const renderSlider = isRange => (
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

    const renderItem = () => {
        switch (type) {
            case 'text':
                return renderTextInput();
            case 'slider':
                return renderSlider(false);
            case 'rangeSlider':
                return renderSlider(true);
            default:
                return renderTextInput();
        };
    }

    useEffect(() => { onChange ? onChange(value) : form.handleFormDataChange(name, value) }, [value])

    return (
        <View style={styles.fieldWrapper(theme, withBottomBorder)}>
            {!!icon && <MaterialCommunityIcons name={icon} color={isFocused ? theme.colors.primary : theme.colors.black} size={30} style={styles.icon} />}
            <View style={styles.fieldLabelWrapper(icon)}>
                <Text variant="titleSmall">
                    {label}{type === 'rangeSlider' && `: ${value[0]} - ${value[1]}`}
                </Text>
                {type === 'switch' && renderSwitch()}
            </View>
            {type !== 'switch' && renderItem()}
            {description && <Text style={styles.switchDescription(icon)} variant="bodySmall">{description}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    fieldWrapper: (theme, withBottomBorder) => ({
        paddingVertical: 10,
        width: '100%',
        borderBottomWidth: withBottomBorder ? 1 : 0,
        borderColor: theme.colors.lightGray,
        position: 'relative'
    }),
    fieldLabelWrapper: icon => ({
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: !!icon ? 50 : 0
    }),
    icon: {
        position: 'absolute',
        left: 0,
        top: 22
    },
    input: icon => ({
        backgroundColor: "transparent",
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingLeft: !!icon ? 50 : 0,
        paddingTop: 0,
        marginTop: -5,
        marginBottom: -11
    }),
    switchDescription: icon => ({
        paddingLeft: !!icon ? 50 : 0,
        paddingBottom: 5,
        paddingRight: 50
    }),
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