import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Searchbar, useTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';

import { getPeaksIdsRequest, clearSearchResults } from '../../../Store/actions';

let searchTimeout;

export default ({ toggleFiltersModal }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    const handleQueryChange = query => {
        setSearchQuery(query);
        clearTimeout(searchTimeout);

        if (query.length > 4) {
            searchTimeout = setTimeout(() => search(query), 1000);
        } else { 
            dispatch(clearSearchResults(query));
        }
    };

    const search = query => {
        dispatch(getPeaksIdsRequest({ action: 'getSearchResults', params: { query } }));
    };

    return (
        <View style={styles.searchbarWrapper(theme)}>
            <Searchbar
                elevation={0}
                inputStyle={styles.searchbarInput}
                style={styles.searchbar(theme)}
                placeholder="Type peak name..."
                value={searchQuery}
                onChangeText={handleQueryChange}
                placeholderTextColor={theme.colors.darkGray}
            />
            <IconButton
                icon="tune"
                mode="contained"
                onPress={toggleFiltersModal}
                size={40}
                iconColor={theme.colors.primary}
                style={styles.filtersButton(theme)}
            />  
        </View>
    );
}

const styles = StyleSheet.create({
    searchbarWrapper: theme => ({
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderColor: theme.colors.lightGray
    }),
    searchbar: theme => ({
        width: Dimensions.get('window').width - 70,
        flexGrow: 2,
        borderRightWidth: 1,
        borderColor: theme.colors.lightGray,
    }),
    searchbarInput: {
        fontSize: 20,
        height: 69,
        fontWeight: 'normal'
    },
    filtersButton: theme => ({
        backgroundColor: theme.colors.white
    })
})
