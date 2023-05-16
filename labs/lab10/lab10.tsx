import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Pressable,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Controller, useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase, ref, onValue, push } from "firebase/database";
import useStore from "./store";

const firebaseConfig = {
    apiKey: "AIzaSyDxUDxE8uymttbABO9_fQW42IKfB8A7rTk",
    authDomain: "lab11-2db54.firebaseapp.com",
    databaseURL:
        "https://lab11-2db54-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lab11-2db54",
    storageBucket: "lab11-2db54.appspot.com",
    messagingSenderId: "673448840323",
    appId: "1:673448840323:web:c06680615495bd91f55fb6",
    measurementId: "G-EBNMMPGCX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const Lab10 = () => {
    const [workerList, setWorkerList] = useState<any>([]);
    const { handleSubmit, control } = useForm();
    const [open, setOpen] = useState(false);
    const [posValue, setPosValue] = useState(null);
    const [newPos, setNewPos] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const position = useStore((state: any) => state.position);
    const setPosition = useStore((state: any) => state.setPosition);
    const workers = useStore((state: any) => state.workers);
    const setWorkers = useStore((state: any) => state.setWorkers);

    const activePos = useStore((state: any) => state.activePos);
    const setActivePos = useStore((state: any) => state.setActivePos);

    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        { ...styles.button, marginTop: 10 },
                    ]}
                    onPress={() => {
                        setActivePos(
                            position[
                                position.reduce(
                                    (summ: any, elem: any, index: any) => {
                                        if (elem.id === activePos.id) {
                                            return summ + index;
                                        }
                                        return summ;
                                    },
                                    0
                                ) + 1
                            ]
                                ? position[
                                      position.reduce(
                                          (
                                              summ: any,
                                              elem: any,
                                              index: any
                                          ) => {
                                              if (elem.id === activePos.id) {
                                                  return summ + index;
                                              }
                                              return summ;
                                          },
                                          0
                                      ) + 1
                                  ]
                                : position[0]
                        );
                    }}
                >
                    <Text style={styles.text}>Наступна посада</Text>
                </Pressable>

                <Text style={styles.text}>Поточна посада {activePos.name}</Text>

                {workers
                    .filter((elem: any) => {
                        return elem.position_id === activePos.id;
                    })
                    .map((elem: any) => {
                        return (
                            <View key={elem.id}>
                                <Text style={styles.text}>
                                    Ім'я: {elem.name}
                                </Text>
                                <Text style={styles.text}>
                                    Фамілія: {elem.surname}
                                </Text>
                            </View>
                        );
                    })}
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    onChangeText={(text) => setNewPos(text)}
                ></TextInput>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        styles.button,
                    ]}
                    onPress={() => {
                        let flag = false;
                        position.forEach((elem: any) => {
                            if (elem.label === newPos) {
                                flag = true;
                                alert("Така посада вже існує");
                                return;
                            }
                        });
                        if (flag) return;
                        setPosition([
                            ...position,
                            { id: position.length + 1, name: newPos },
                        ]);
                        push(ref(db, "/Position"), {
                            id: position.length + 1,
                            name: newPos,
                        });
                    }}
                >
                    <Text style={styles.text}>Додати посаду</Text>
                </Pressable>
                <Text style={{ ...styles.text, marginTop: 50, color: "black" }}>
                    Додати співробітника
                </Text>
                <Text style={{ ...styles.text, marginTop: 20 }}>
                    Введіть ім'я співробітника
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    onChangeText={(text) => setName(text)}
                ></TextInput>
                <Text style={styles.text}>Введіть фамілію співробітника</Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    onChangeText={(text) => setSurname(text)}
                ></TextInput>
                {/* <Controller
                    name="company"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.dropdown1}>
                            <DropDownPicker
                                style={styles.dropdown}
                                open={open}
                                value={posValue}
                                items={position}
                                setOpen={setOpen}
                                setValue={setPosValue}
                                placeholder="Виберіть посаду"
                                placeholderStyle={styles.placeholderStyles}
                                activityIndicatorColor="#5188E3"
                                searchable={false}
                                onChangeValue={onChange}
                                zIndex={1001}
                                zIndexInverse={3001}
                            />
                        </View>
                    )}
                /> */}
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? "#66a3ff" : "#0066ff" },
                        { ...styles.button, width: 300 },
                    ]}
                    onPress={() => {
                        const newObj = {
                            id: Date.now(),
                            name: name,
                            surname: surname,
                            position_id: activePos.id,
                        };
                        setWorkers([...workers, , newObj]);
                        push(ref(db, "/Worker"), { ...newObj });
                    }}
                >
                    <Text style={styles.text}>Додати співробітника</Text>
                </Pressable>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 240,
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
        alignSelf: "center",
    },
    res: {
        alignSelf: "center",
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
        marginTop: 20,
    },
    dropdown: {
        borderColor: "#82ccdd",
        borderWidth: 4,
        borderRadius: 12,
        height: 50,
        alignSelf: "center",
    },
    dropdown1: {
        marginHorizontal: 10,
        marginBottom: 15,
        width: 200,
        alignSelf: "center",
        zIndex: 30,
    },
    placeholderStyles: {
        color: "grey",
    },
});

export default Lab10;
