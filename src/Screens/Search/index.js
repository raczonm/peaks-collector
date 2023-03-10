import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Dimensions } from 'react-native';

import Searchbar from '../../Components/Search/Searchbar';
import SearchSpinner from '../../Components/Search/SearchSpinner';
import EmptyMessage from '../../Components/Search/EmptyMessage';
import List from './List';
import Map from './Map';
import Filters from '../../Components/Filters';
import { filterPeaks } from '../../Helpers'; 

import { setActiveSearchFilters } from '../../Store/actions';

export default () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const SearchTabs = createMaterialTopTabNavigator();

    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false)

    const { isLoading, searchResults, query, activeFilters } = useSelector(state => state.search);
    const { peaks } = useSelector(state => state.peaks);

    const toggleFiltersModal = () => setIsFiltersModalVisible(!isFiltersModalVisible);
    const setActiveFilters = filters => dispatch(setActiveSearchFilters(filters));

    useEffect(() => {
        const peaksWithData = searchResults.map(peakId => peaks[peakId] || { id: peakId });
        setFilteredSearchResults(filterPeaks(peaksWithData, activeFilters));
    }, [searchResults, activeFilters, peaks]);

    return <>
        <Searchbar toggleFiltersModal={toggleFiltersModal} />
        <View style={styles.tabsWrapper}>
            {!!filteredSearchResults.length && <>
                <View style={styles.resultsCountWrapper(theme)}>
                    <Text variant="titleLarge" style={styles.resultsWrapperText(theme)}>{filteredSearchResults.length}</Text>
                    <Text variant="bodySmall" style={styles.resultsWrapperText(theme)}>Results</Text>
                </View>
                <SearchTabs.Navigator screenOptions={{ tabBarIndicatorStyle: styles.tabsIndicator(theme) }}>
                    <SearchTabs.Screen name="List">{props => <List {...props} peaks={filteredSearchResults} />}</SearchTabs.Screen>
                    <SearchTabs.Screen name="Map">{props => <Map {...props} peaks={filteredSearchResults} />}</SearchTabs.Screen>
                </SearchTabs.Navigator>
            </>}
            {!filteredSearchResults.length && !isLoading && <EmptyMessage query={query} theme={theme} />}
            <SearchSpinner visible={isLoading} query={query} />
        </View> 
        <Filters isVisible={isFiltersModalVisible} toggleModal={toggleFiltersModal} setActiveFilters={setActiveFilters} />
    </>;
}

const styles = StyleSheet.create({
    resultsCountWrapper: theme => ({
        position: 'absolute',
        zIndex: 2, 
        top: -1,
        left: Dimensions.get('window').width / 2 - 40,
        width: 80,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 10, 
        backgroundColor: theme.colors.primary
    }),
    resultsWrapperText: theme => ({
        textAlign: 'center',
        color: theme.colors.white,
        fontWeight: 'bold'
    }),
    tabsWrapper: {
        width: '100%',
        height: Dimensions.get('window').height - 240,
        position: 'relative'
    },
    tabsIndicator: theme => ({
        backgroundColor: theme.colors.primary
    })
});