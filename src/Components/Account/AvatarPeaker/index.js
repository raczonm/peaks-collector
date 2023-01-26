import { useEffect, useState } from 'react';
import { useTheme, Avatar, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ onChange, label, withBottomBorder = false, icon, form, initialValue, name }) => {
    const theme = useTheme();
    const [value, setValue] = useState(initialValue)

    const handleChangeAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 0.5,
        });
    
        !result.cancelled && setValue(result);
    };

    useEffect(() => { onChange ? onChange(value) : form.handleFormDataChange(name, value) }, [value]);

    return (
        <TouchableOpacity onPress={handleChangeAvatar}>
            <View style={styles.fieldWrapper(theme, withBottomBorder)}>
                {!!icon && <MaterialCommunityIcons name={icon} color={theme.colors.black} size={30} style={styles.icon} />}
                <Text variant="titleSmall" style={styles.label(icon)}>{label}</Text>
                <Text variant="bodyLarge"  style={styles.text(icon)}>Press to change</Text>
                {!!value && value.uri &&<Avatar.Image size={65} source={{ uri: value.uri }} style={styles.avatar(theme)} />}
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    fieldWrapper: (theme, withBottomBorder) => ({
        paddingVertical: 10,
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: withBottomBorder ? 1 : 0,
        borderColor: theme.colors.lightGray,
        position: 'relative',
        marginTop: 10
    }),
    icon: {
        position: 'absolute',
        left: 0,
        top: 22 
    },
    label: icon => ({
        marginBottom: 10,
        marginLeft: !!icon ? 50 : 0
    }),
    text: icon => ({
        marginLeft: !!icon ? 50 : 0
    }),
    avatar: theme => ({
        position: 'absolute',
        top: 10,
        right: 5,
        backgroundColor: theme.colors.transparent
    }),
});