import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TextStyle, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getOffers } from '../services/api/methods/booking';
import { type OfferResponse } from '../services/api/types/booking';
import { type StackParamList } from '../navigation/Navigator';
import ListPreview from '../components/ListPreview';
import Loading from '../components/Loading';
import { APIError } from '../services/api/types/apiError';

interface Styles {
    container: ViewStyle;
    loading: TextStyle;
}

const styles: Styles = {
    container: {
        backgroundColor: 'white',
    },
    loading: {
        marginTop: 80,
        alignSelf: 'center',
        fontSize: 24,
    },
};

type Props = NativeStackScreenProps<StackParamList, 'Offers'>;

const OffersScreen: React.FC<Props> = props => {
    const { navigation, route } = props;
    const [offers, setOffers] = useState<OfferResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const locationId = route.params.locationId;

    const getOfferList = async () => {
        setLoading(true);
        try {
            const response = await getOffers(locationId);
            setOffers(response);
            setLoading(false);
        } catch (e) {
            const error = e as APIError;
            Alert.alert(error.title);
            setLoading(false);
        }
    };

    useEffect(() => {
        getOfferList();
    }, [locationId]);

    const onLocationSelect = (offer: OfferResponse) => {
        navigation.navigate('Preview', { offer });
    };

    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {offers.map(offer => (
                        <ListPreview
                            key={offer.offerUId}
                            offer={offer}
                            onSelect={() => onLocationSelect(offer)}
                        />
                    ))}
                </>
            )}
        </ScrollView>
    );
};

export default OffersScreen;
