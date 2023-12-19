import { View, Text, Button, ScrollView, SafeAreaView, TextInput, FilterButton, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../toolkit';
import axios from 'axios';
import { setSamples } from '../toolkit/toolkitSlice';
import CardSample from './CardSample';
import { StyleSheet } from 'react-native';
import { URI, URI_minio } from '../config';

export default function CatalogScreen({ navigation }) {
    const dispatch = useDispatch();
    const samples = useSelector((state) => state.toolkit.samples);

    const [searchQuery, setSearchQuery] = useState('');
    const [rockType, setRockType] = useState('');
    const [uniqueTypes, setTypes] = useState([]);
    const [selectedRockType, setSelectedRockType] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleRockTypeFilter = (selectedRockType) => {
        setRockType(selectedRockType);
        setSelectedRockType(selectedRockType);
    };

    useEffect(() => {
        axios.get(`${URI}/api/sample/?name=&rockType=`)
            .then(response => {
                const samplesData = response.data.samples;
                const uniqueTypes = [];
                samplesData.map((sample) => {
                    uniqueTypes.push(sample.Rock_Type)
                })
                const uniqueTypesSet = new Set(uniqueTypes);
                const uniqueTypesArray = Array.from(uniqueTypesSet);
                setTypes(uniqueTypesArray)
            })
            .catch(error => {
                console.log('Не удалось подключиться к БД:', error);
            })
    }, []);

    useEffect(() => {
        async function getAllSamples() {
            const response = await axios.get(`${URI}/api/sample/?name=${searchQuery}&rockType=${rockType}`)
            const updatedSamples = response.data.samples.map((sample) => ({
                ...sample,
                Image: sample.Image.replace('http://localhost:9000', `${URI_minio}`),
            }));
            dispatch(setSamples(updatedSamples));
        }

        getAllSamples();
    }, [searchQuery, rockType, dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChangeText={(text) => handleSearch(text)}
                />
            </View>
            <View style={{ width: "94%" }}>
                <View style={styles.filters}>
                    {uniqueTypes.map((type, index) => (
                        <TouchableOpacity
                            key={index}
                            style={selectedRockType === type ? styles.selectedFilterButton : styles.filterButton}
                            onPress={() => handleRockTypeFilter(type)}
                        >
                            <Text style={styles.filterButtonText}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => handleRockTypeFilter('')}>
                    <Text style={styles.btnText}>Сбросить</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll_view}>
                {samples.map((sample) => (
                    <CardSample key={sample.Id_sample} {...sample} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        margin: 0,
        padding: 0,
    },
    scroll_view: {
        margin: 0,
        padding: 0,
        width: "100%",
        padding: "3%",
    },
    search: {
        width: "94%",
    },
    input: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: 10,
        paddingLeft: 8,
        width: "100%",
    },
    filters: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        width: "100%",
    },
    filterButton: {
        backgroundColor: "#ccc",
        padding: 7,
        borderRadius: 8,
    },
    filterButtonText: {
        fontWeight: "normal",
        fontSize: 12,
    },
    btn: {
        backgroundColor: 'dodgerblue',
        padding: 5,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    btnText: {
        fontWeight: "normal",
        fontSize: 14,
        color: "white",
    },
    selectedFilterButton: {
        backgroundColor: "rgba(30, 144, 255, 0.5)",
        padding: 7,
        borderRadius: 8,
    },
});