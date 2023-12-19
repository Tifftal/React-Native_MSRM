import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function CardSample({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Образец', { id: props.Id_sample });
    };
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={{ uri: `${props.Image}` }}
                resizeMode='cover'
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.brandTitle}>{props.Name}</Text>
                    <View>
                        <Text style={styles.text}>Тип: {props.Type}</Text>
                        <Text style={styles.text}>Тип камня: {props.Rock_Type}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handlePress}
                >
                    <Text style={{ color: 'white'}}>Подробнее</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: 'rgba(30, 144, 255, 0.25)',
        borderRadius: 12,
        marginBottom: 20,
    },
    image: {
        height: 200,
        width: "40%",
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        height: "100%",
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'flex-start',
        justifyContent: "space-between",
    },
    brandTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    btn: {
        backgroundColor: 'dodgerblue',
        padding: 5,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
});