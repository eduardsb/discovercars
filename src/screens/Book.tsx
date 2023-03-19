import React, { useRef, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { createReservation } from '../services/api/methods/booking';
import { type StackParamList } from '../navigation/Navigator';
import strings from '../utils/localization';
import Button from '../components/Button';
import { APIError } from '../services/api/types/apiError';

interface Styles {
    container: ViewStyle;
    content: ViewStyle;
    loading: TextStyle;
    label: TextStyle;
    input: ViewStyle;
    button: ViewStyle;
}

const styles: Styles = {
    container: {
        backgroundColor: 'white',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    content: {
        width: 200,
        alignSelf: 'center',
    },
    loading: {
        marginTop: 80,
        alignSelf: 'center',
        fontSize: 24,
    },
    label: {
        marginTop: 20,
    },
    input: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
    },
    button: {
        marginTop: 20,
    },
};

type Props = NativeStackScreenProps<StackParamList, 'Book'>;

const BookScreen: React.FC<Props> = props => {
    const { navigation, route } = props;
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [loading, setLoading] = useState(false);

    const surname_input = useRef<any>();
    const { offerUId } = route.params;

    const completeBooking = async () => {
        setLoading(true);
        try {
            const response = await createReservation({
                offerUId: offerUId,
                customer: { name, surname },
            });
            setLoading(false);
            Alert.alert(
                strings.booking.messages.success +
                    ' ' +
                    response.confirmationNumber,
            );
            onComplete();
        } catch (e) {
            const error = e as APIError;
            Alert.alert(error.title);
            setLoading(false);
        }
    };

    const onBook = () => {
        if (name.trim() && surname.trim()) {
            completeBooking();
        } else {
            Alert.alert(strings.booking.messages.validation);
        }
    };

    const onComplete = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text>{strings.booking.name}</Text>
                <TextInput
                    autoCorrect={false}
                    autoFocus={false}
                    placeholder={strings.booking.placeholders.name}
                    placeholderTextColor="#666"
                    returnKeyType="next"
                    onSubmitEditing={() => surname_input.current.focus()}
                    style={styles.input}
                    onChangeText={value => setName(value)}
                    value={name}
                />
                <Text style={styles.label}>{strings.booking.surname}</Text>
                <TextInput
                    ref={surname_input}
                    autoFocus={false}
                    placeholder={strings.booking.placeholders.surname}
                    placeholderTextColor="#666"
                    returnKeyType="go"
                    onSubmitEditing={onBook}
                    style={styles.input}
                    onChangeText={value => setSurname(value)}
                    value={surname}
                />
                <Button
                    disabled={loading}
                    style={styles.button}
                    onPress={onBook}
                    title={strings.booking.completeButton}
                />
            </View>
        </ScrollView>
    );
};

export default BookScreen;
