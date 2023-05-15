import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Pressable,
    Dimensions,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Controller, useForm } from "react-hook-form";

const Lab10 = () => {
    const [workerList, setWorkerList] = useState<any>([]);
    const { handleSubmit, control } = useForm();
    const [open, setOpen] = useState(false);
    const [posValue, setPosValue] = useState(null);
    const [newPos, setNewPos] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [position, setPosition] = useState([
        { label: "Менеджер", value: 1 },
        { label: "Рекрутер", value: 2 },
    ]);
    const [activePos, setActivePos] = useState(position[0]);
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
                        { backgroundColor: pressed ? "#66a3ff" : "#0066ff" },
                        { ...styles.button, marginTop: 10 },
                    ]}
                    onPress={() => {
                        setActivePos(
                            position[
                                position.reduce((summ, elem, index) => {
                                    if (elem.value === activePos.value) {
                                        return summ + index;
                                    }
                                    return summ;
                                }, 0) + 1
                            ]
                                ? position[
                                      position.reduce((summ, elem, index) => {
                                          if (elem.value === activePos.value) {
                                              return summ + index;
                                          }
                                          return summ;
                                      }, 0) + 1
                                  ]
                                : position[0]
                        );
                    }}
                >
                    <Text style={styles.text}>Наступна посада</Text>
                </Pressable>
                <Text style={styles.text}>
                    Поточна посада {activePos.label}
                </Text>
                {workerList
                    .filter((elem: any) => {
                        return elem.position === activePos.value;
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
                        position.forEach((elem) => {
                            if (elem.label === newPos) {
                                flag = true;
                                alert("Така посада вже існує");
                                return;
                            }
                        });
                        if (flag) return;
                        setPosition([
                            ...position,
                            { label: newPos, value: position.length + 1 },
                        ]);
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
                        setWorkerList([
                            ...workerList,
                            {
                                id: Date.now(),
                                name: name,
                                surname: surname,
                                position: activePos.value,
                            },
                        ]);
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
