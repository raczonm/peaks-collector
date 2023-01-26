import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Modal } from 'react-native-paper';

import FormField from '../FormField';

const defaultFilters = {
    showVisited: true,
    showOutsideTrails: true,
    elevationRange: [0, 8849],
    ratingRange: [0, 5]
}

export default ({ isVisible, toggleModal, setActiveFilters }) => {
    const [filters, setFilters] = useState(defaultFilters)

    const handleFilterChange = (name, value) => setFilters({ ...filters, [name]: value});

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        setActiveFilters({});
        toggleModal();
    };

    const handleApplyFilters = () => {
        const activeFilters = Object.keys(filters).reduce((acc, filter) => {
            return filters[filter] ===  defaultFilters[filter] ? acc : { ...acc, [filter]: filters[filter] };
        }, {});

        setActiveFilters(activeFilters);
        toggleModal();
    }

    return (
        <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={styles.modal}>
            <Text variant="titleMedium" style={styles.modalTitle}>Filters</Text>
            <Button mode="text" style={styles.clearFiltersButton} onPress={handleClearFilters}>Clear filters</Button>
            <View>
                <FormField
                    label="Show visited peaks"
                    initialValue={filters.showVisited}
                    onChange={value => handleFilterChange('showVisited', value)}
                    type="switch"
                />
                <FormField
                    label="Show peaks outside hiking trails"
                    initialValue={filters.showOutsideTrails}
                    onChange={value => handleFilterChange('showOutsideTrails', value)}
                    type="switch"
                />
                <FormField
                    label="Elevation range"
                    initialValue={filters.elevationRange} 
                    onChange={value => handleFilterChange('elevationRange', value)}
                    type="rangeSlider"
                    options={{
                        min: defaultFilters.elevationRange[0],
                        max: defaultFilters.elevationRange[1],
                    }}
                />
                <FormField
                    label="Rating"
                    initialValue={filters.ratingRange} 
                    onChange={value => handleFilterChange('ratingRange', value)}
                    type="rangeSlider"
                    options={{
                        min: defaultFilters.ratingRange[0],
                        max: defaultFilters.ratingRange[1],
                    }}
                    withBottomBorder={false}
                />
                <Button mode="contained" style={styles.applyFiltersButton} onPress={handleApplyFilters}>Apply Filters</Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 11
    },
    modalTitle: {
        marginBottom: 20
    },
    clearFiltersButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    applyFiltersButton: {
        marginTop: 10
    }
});