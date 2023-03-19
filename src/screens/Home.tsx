import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { type StackParamList } from '../navigation/Navigator';
import { getLocations } from '../services/api/methods/booking';
import { type LocationResponse } from '../services/api/types/booking';
import Loading from '../components/Loading';
import { APIError } from '../services/api/types/apiError';
import strings from '../utils/localization';

interface Props {
    navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
}

interface Styles {
    container: ViewStyle;
    content: ViewStyle;
    label: TextStyle;
    location: ViewStyle;
}

const styles: Styles = {
    container: {
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    content: {
        marginBottom: 80,
    },
    label: {
        marginTop: 20,
        fontSize: 20,
    },
    location: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
};

const HomeScreen: React.FC<Props> = props => {
    const { navigation } = props;
    const [locations, setLocations] = useState<LocationResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const getLocationsList = async () => {
        setLoading(true);
        try {
            const response = await getLocations();
            setLocations(response);
            setLoading(false);
        } catch (e) {
            const error = e as APIError;
            Alert.alert(error.title);
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocationsList();
    }, []);

    const onLocationSelect = (location: LocationResponse) => {
        navigation.navigate('Offers', { locationId: location.id });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Text style={styles.label}>{strings.home.city}</Text>
                        {locations.map(location => (
                            <TouchableOpacity
                                style={styles.location}
                                key={location.id}
                                onPress={() => {
                                    onLocationSelect(location);
                                }}>
                                <Text>{location.city}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
