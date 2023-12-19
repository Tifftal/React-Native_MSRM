import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URI, URI_minio } from '../config';
import { setSample } from '../toolkit/toolkitSlice';
import { resetSample } from '../toolkit/toolkitSlice';
import { StyleSheet } from 'react-native';
import moment from 'moment';

export default function SampleScreen({ route }) {
    const { id } = route.params;

    const dispatch = useDispatch();
    const sample = useSelector((state) => state.toolkit.sample);

    useEffect(() => {
        async function getSample() {
            await axios.get(`${URI}/api/sample/${id}`)
                .then(response => {
                    const data = response.data
                    data.Image = data.Image.replace('http://localhost:9000', `${URI_minio}`);
                    dispatch(setSample(data));
                })
                .catch(error => {
                    console.log('Не удалось подключиться к БД:', error);
                })
        }
        getSample();
        return () => {
            dispatch(resetSample());
        };
    }, [dispatch])
    return (
        <View style={styles.detail}>
            <Image
                style={styles.image}
                source={{ uri: `${sample.Image}` }}
                resizeMode='cover'
            />
            <Text style={styles.title}>{sample.Name}</Text>
            <View style={{ display: "flex", alignSelf: "flex-start" }}>
                <Text style={styles.text}>Тип: {sample.Type}</Text>
                <Text style={styles.text}>Тип камня: {sample.Rock_Type}</Text>
                <Text style={styles.text}>Дата погрузки: {moment(sample.Date_Sealed).format('L')}</Text>
                <Text style={styles.text}>Текущее местоположение: {sample.Current_Location}</Text>
                <Text style={styles.text}>Высота: {sample.Height}</Text>
                <Text style={styles.text}>Собранный материал: {sample.Sol_Sealed}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    detail: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5%",
        backgroundColor: "white",
        height: "100%",
    },
    image: {
        height: 300,
        width: "100%",
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
});