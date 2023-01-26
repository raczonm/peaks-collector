import { useState, useContext, useEffect, useRef } from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import MapView from 'react-native-maps';

import PeaksContext from '../../Context/PeaksContext';
import Searchbar from './Searchbar';
import SearchPeakCard from '../../Components/SearchPeakCard';
import PeakCardLoader from '../../Components/PeakCardLoader';
import Filters from '../../Components/Filters';
import MapMarker from '../../Components/MapMarker';
import { filterPeaks } from '../../Helpers'; 



const EmptyMessage = ({ theme, query }) => (
    <View style={styles.emptyMessageWrapper}>
        <Text variant="titleLarge" style={styles.emptyMessageText}>
            Sorry, no search reslut for
            <Text style={styles.spinnerTextQuery(theme)}> "{query}"</Text>
            , with given filters. Try changing Your query or filter settings
        </Text>
    </View>
);

const List = ({ peaks, navigation }) => {
    return  (
        <View style={{ height: '100%' }}>
            <FlatList
                renderItem={({ item }) => item.name ? <SearchPeakCard peak={item} isOnSearchView={true} onPress={() => navigation.navigate('Add Peak', { peak: item })} /> : <PeakCardLoader />}
                keyExtractor={item => item.id}
                data={peaks}
            />
        </View>
    );
};

const Spinner = ({ visible, query }) => {
    const theme = useTheme();

    return <View style={styles.spinnerWrapper(visible, theme)}>
        <ActivityIndicator animating={true} size={100} />
        <Text variant="titleLarge" style={styles.spinnerText}>
            Searching for
            <Text style={styles.spinnerTextQuery(theme)}> {query}</Text>
        </Text>
    </View>
};

const Map = ({ peaks }) => {
    const searchMapRef = useRef();

    const centerOnResults = () => {
        searchMapRef.current.fitToSuppliedMarkers(
            peaks.map(peak => peak.id.toString()),
            { edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }}
        );
    }

    useEffect(() => {
        centerOnResults();
    }, [peaks]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={searchMapRef}
                showsUserLocation={true}
                onMapReady={centerOnResults}
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height - 220
                }}
            >
                {peaks.map(peak => <MapMarker key={peak.id} peak={peak}/>)}
            </MapView>
        </View>
    );
};

export default ({ navigation }) => {
    const theme = useTheme();
    const SearchTabs = createMaterialTopTabNavigator();
    const { peaks } =  useContext(PeaksContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchInProgress, setIsSearchInProgress] = useState(false);
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false)
    const [activeFilters, setActiveFilters] = useState({});

    const toggleFiltersModal = () => setIsFiltersModalVisible(!isFiltersModalVisible);


    useEffect(() => {
        const peaksWithData = searchResults.map(peakId => peaks[peakId] || { id: peakId });
        setFilteredSearchResults(filterPeaks(peaksWithData, activeFilters));
    }, [searchResults, activeFilters, peaks]);

    return <>
        <Searchbar
            toggleFiltersModal={toggleFiltersModal}
            setIsSearchInProgress={setIsSearchInProgress}
            setSearchResults={setSearchResults}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
        />
        <View style={styles.tabsWrapper}>
            {!!filteredSearchResults.length ?
                <SearchTabs.Navigator screenOptions={{ tabBarIndicatorStyle: styles.tabsIndicator(theme) }}>
                    <SearchTabs.Screen name="List">
                        {props => <List {...props} peaks={filteredSearchResults} />}
                    </SearchTabs.Screen>
                    <SearchTabs.Screen name="Map">
                        {props => <Map {...props} peaks={filteredSearchResults} />}
                    </SearchTabs.Screen>
                </SearchTabs.Navigator> :
                <EmptyMessage query={searchQuery} theme={theme} />
            }
            <Spinner visible={isSearchInProgress} query={searchQuery} />
        </View> 
        <Filters isVisible={isFiltersModalVisible} toggleModal={toggleFiltersModal} setActiveFilters={setActiveFilters} />
    </>;
}

const styles = StyleSheet.create({
    spinnerWrapper: (visible, theme) => ({
        display: visible ? 'block' : 'none',
        position: 'absolute',
        zIndex: 1,
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: theme.colors.white80,
        height: '100%',
        width: '100%',
        paddingTop: 50
    }),
    spinnerText: {
        textAlign: 'center',
        marginTop: 30
    },
    spinnerTextQuery: theme => ({
        color: theme.colors.primary,
        fontWeight: 'bold'
    }),
    emptyMessageWrapper: {
        marginTop: 50,
        padding: 20
    },
    emptyMessageText: {
        textAlign: 'center'
    },
    tabsWrapper: {
        width: '100%',
        height: Dimensions.get('window').height - 190,
        position: 'relative'
    },
    tabsIndicator: theme => ({
        backgroundColor: theme.colors.primary
    })
});