import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default ({ query }) => {
    const theme = useTheme();

    const noResultText = () => (
        <Text>
            Sorry, no search result for
            <Text style={styles.emptyMessageQuery(theme)}> "{query}"</Text>
            , with given filters. Try changing Your query or filter settings
        </Text>
    );

    const shortQueryText = () => (
        <Text>
            You have to type at least 
            <Text style={styles.emptyMessageQuery(theme)}> 5 </Text>
            characters to start Searching!
        </Text>
    );
    

    return <View style={styles.emptyMessageWrapper}>
        <Text variant="titleLarge" style={styles.emptyMessageText}>
            {query.length > 4 ? noResultText() : shortQueryText()}
        </Text>
    </View>
};


const styles = StyleSheet.create({
    emptyMessageWrapper: {
        marginTop: 50,
        padding: 20
    },
    emptyMessageText: {
        textAlign: 'center'
    },
    emptyMessageQuery: theme => ({
        color: theme.colors.primary,
        fontWeight: 'bold'
    })
});