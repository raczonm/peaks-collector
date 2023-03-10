import { useState, useEffect } from 'react';
import { Text, TextInput, Switch, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SliderInput from './SliderInput';
import RatingInput from './RatingInput';

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

    const renderSlider = isRange => <SliderInput isRange={isRange} options={options} value={value} setValue={setValue} />

    const renderItem = () => {
        switch (type) {
            case 'text':
                return renderTextInput();
            case 'slider':
                return renderSlider(false);
            case 'rangeSlider':
                return renderSlider(true);
            case 'switch':
            case 'rating':
                return null;
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
                {type === 'switch' && <Switch value={value} onValueChange={value => setValue(value)} />}
                {type === 'rating' && <RatingInput value={value} setValue={setValue} />}
            </View>
            {renderItem()}
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
    })
});