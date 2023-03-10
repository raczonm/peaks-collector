import { useState, useEffect } from 'react';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDate } from '../../Helpers';

export default ({ onChange, label, initialValue, withBottomBorder = true, icon, form, name }) => {
    const theme = useTheme();

    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [date, setDate] = useState(initialValue ? new Date(initialValue) : new Date());

    const handleDismiss = () => setDatePickerOpen(false);
    
    const handleConfirm = params => {
        setDatePickerOpen(false);
        setDate(params.date);
    };

    useEffect(() => { onChange ? onChange(date) : form.handleFormDataChange(name, formatDate(date)) }, [date]);

    return <>
        <View style={styles.datePickerWrapper(theme, withBottomBorder)}>
            {!!icon && <MaterialCommunityIcons name={icon} color={datePickerOpen ? theme.colors.primary : theme.colors.black} size={30} style={{ position: 'absolute', left: 0, top: 22 }} />}
            <Text variant="titleSmall" style={styles.label(icon)}>{label}</Text>
            <Text variant="bodyLarge"  style={styles.date(icon)}>{date.toDateString()}</Text>
            <IconButton
                icon="calendar"
                iconColor={theme.colors.white}
                mode="contained"
                size={30}
                onPress={() => setDatePickerOpen(true)}
                style={styles.calendarButton(theme)}
            />
        </View>
        <DatePickerModal
            locale="en-GB"
            mode="single"
            date={date}
            visible={datePickerOpen}
            onDismiss={handleDismiss}
            onConfirm={handleConfirm}
            validRange={{ endDate: new Date() }}
        />
    </>;
}


const styles = StyleSheet.create({
    datePickerWrapper: (theme, withBottomBorder) => ({
        paddingVertical: 10,
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: withBottomBorder ? 1 : 0,
        borderColor: theme.colors.lightGray,
        position: 'relative',
        marginTop: 10
    }),
    calendarButton: theme => ({
        position: 'absolute',
        top: 10,
        right: 0,
        backgroundColor: theme.colors.primary
    }),
    label: icon => ({
        marginBottom: 10,
        marginLeft: !!icon ? 50 : 0
    }),
    date: icon => ({
        marginLeft: !!icon ? 50 : 0
    })
});