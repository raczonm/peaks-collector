
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ backgroundColor, color, label, icon, items, width = '100%' }) => {

    const theme = useTheme();

    const _color = color || theme.colors.white;
    const _backgroundColor = backgroundColor || theme.colors.primary80;

    return (
        <View style={styles.box(_backgroundColor, width)}>
            <MaterialCommunityIcons name={icon} color={_color} size={25} style={{ paddingHorizontal: 10 }} />
            <View style={styles.boxInner(_color)}>
                <Text style={styles.label(_color)}>{label}</Text>
                <View style={styles.content}>
                    {items.map((item, key) => (
                        <View key={key} style={styles.item}>
                            <Text style={styles.itemLabel(_color)}>{item.label}</Text>
                            <Text style={styles.itemValue(_color)}>{item.value}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box: (backgroundColor, width) => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 8,
        padding: 5,
        backgroundColor,
        width
    }),
    boxInner: color => ({
        borderLeftWidth: 1,
        borderColor: color,
        paddingHorizontal: 15
    }),
    label: color => ({
        paddingVeritical: 2,
        fontSize: 12,
        fontWeight: 'bold',
        color
    }),
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 4
    },
    item: {
        marginRight: 20
    },
    itemValue: color => ({
        fontSize: 12,
        fontWeight: 'bold',
        color
    }),
    itemLabel: color => ({
        fontSize: 10,
        paddingBottom: 2,
        color
    })
});