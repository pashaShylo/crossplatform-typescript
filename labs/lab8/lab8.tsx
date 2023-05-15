import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import {
    nameValidator,
    districtValidator,
    lengthValidator,
    historyValidator,
    previousNamesValidator,
    PreviousName,
    Street,
} from "./validation";

const Lab8 = () => {
    const [streets, setStreets] = useState<Street[]>([]);
    const [editStreets, setEditStreets] = useState<Street[]>([]);
    const [name, setName] = useState("");
    const [length, setLength] = useState<number>(0);
    const [history, setHistory] = useState("");
    const [district, setDistrict] = useState("");

    const [list, setList] = useState<PreviousName[]>([]);

    const [editable, setEditable] = useState(false);

    const addItem = () => {
        setList([...list, { id: Date.now(), value: "" }]);
    };

    const deleteItem = (id: number) => {
        setList(
            list.filter((elem: any) => {
                return elem.id !== id;
            })
        );
    };
    const inputChange = (id: number, text: string, key: string) => {
        setList(
            list.map((elem: any) => {
                if (elem.id === id) {
                    return { ...elem, [key]: text };
                }
                return elem;
            })
        );
    };

    const editChange = (
        elIndex: number,
        key: string,
        text: string,
        id: any = null
    ) => {
        setEditStreets(
            editStreets.map((elem: any, index) => {
                if (index === elIndex) {
                    if (id) {
                        const newArr = elem.previousNames.map((elem1: any) => {
                            if (elem1.id === id) {
                                return { ...elem1, ["value"]: text };
                            }
                            return elem1;
                        });
                        return {
                            ...elem,
                            [key]: newArr,
                        };
                    }
                    return { ...elem, [key]: text };
                }
                return elem;
            })
        );
    };

    const addStreet = () => {
        const newStreet = {
            name: name,
            length: length,
            history: history,
            district: district,
            previousNames: list,
        };
        if (!nameValidator(newStreet).isValid) {
            alert(nameValidator(newStreet).message);
            return;
        }
        if (!districtValidator(newStreet).isValid) {
            alert(districtValidator(newStreet).message);
            return;
        }
        if (!lengthValidator(newStreet).isValid) {
            alert(lengthValidator(newStreet).message);
            return;
        }
        if (!historyValidator(newStreet).isValid) {
            alert(historyValidator(newStreet).message);
            return;
        }
        if (!previousNamesValidator(newStreet).isValid) {
            alert(previousNamesValidator(newStreet).message);
            return;
        }
        setStreets([...streets, newStreet]);
        setEditStreets([...streets, newStreet]);
    };

    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
            >
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Найменування вулиці
                </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Довжина (метри)
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={length.toString()}
                    onChangeText={(text: string) =>
                        setLength(parseInt(text) ? parseInt(text) : 0)
                    }
                />
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Історія
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={history}
                    onChangeText={(text) => setHistory(text)}
                />
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Район
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={district}
                    onChangeText={(text) => setDistrict(text)}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        alignItems: "center",
                        height: 70,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 23,
                            alignSelf: "center",
                            marginTop: 10,
                        }}
                    >
                        Список попередніх назв вулиці{" "}
                    </Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#66a3ff"
                                    : "#0066ff",
                            },
                            {
                                width: 30,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 12,
                            },
                        ]}
                        onPress={addItem}
                    >
                        <Text style={styles.text}>+</Text>
                    </Pressable>
                </View>
                <View>
                    {list.map((elem: any) => {
                        return (
                            <View
                                key={elem.id}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TextInput
                                    style={styles.input}
                                    value={elem.value}
                                    onChangeText={(text: string) =>
                                        inputChange(elem.id, text, "value")
                                    }
                                />
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                                ? "#F87373"
                                                : "#F80000",
                                        },
                                        {
                                            width: 30,
                                            height: 30,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 12,
                                            marginRight: 10,
                                        },
                                    ]}
                                    onPress={() => deleteItem(elem.id)}
                                >
                                    <Text style={styles.text}>-</Text>
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? "#66a3ff" : "#0066ff" },
                        styles.button,
                    ]}
                    onPress={addStreet}
                >
                    <Text style={styles.text}>Додати</Text>
                </Pressable>
                {editable
                    ? streets.map((elem: Street, index) => {
                          return (
                              <View
                                  key={index}
                                  style={{ marginBottom: 10, marginTop: 10 }}
                              >
                                  <Text style={styles.textDesc}>
                                      {index + 1}
                                  </Text>
                                  <Text style={styles.textDesc}>
                                      Назва вулиці:
                                  </Text>
                                  <TextInput
                                      defaultValue={elem.name}
                                      onChangeText={(text) =>
                                          editChange(index, "name", text)
                                      }
                                      style={styles.text}
                                  ></TextInput>
                                  <Text style={styles.textDesc}>
                                      Довжина вулиці:
                                  </Text>
                                  <TextInput
                                      defaultValue={elem.length.toString()}
                                      onChangeText={(text) =>
                                          editChange(index, "length", text)
                                      }
                                      style={styles.text}
                                  ></TextInput>
                                  <Text style={styles.textDesc}>
                                      Історія вулиці:
                                  </Text>
                                  <TextInput
                                      defaultValue={elem.history}
                                      onChangeText={(text) =>
                                          editChange(index, "history", text)
                                      }
                                      style={styles.text}
                                  ></TextInput>
                                  <Text style={styles.textDesc}>Район:</Text>
                                  <TextInput
                                      defaultValue={elem.district}
                                      onChangeText={(text) =>
                                          editChange(index, "district", text)
                                      }
                                      style={styles.text}
                                  ></TextInput>
                                  {elem.previousNames.length === 0 ? null : (
                                      <View>
                                          <Text style={styles.textDesc}>
                                              Попередні назви:
                                          </Text>
                                          {elem.previousNames.map(
                                              (elem1: any, index1) => {
                                                  return (
                                                      <TextInput
                                                          key={index1}
                                                          style={styles.text}
                                                          defaultValue={
                                                              elem1.value
                                                          }
                                                          onChangeText={(
                                                              text
                                                          ) =>
                                                              editChange(
                                                                  index,
                                                                  "previousNames",
                                                                  text,
                                                                  elem1.id
                                                              )
                                                          }
                                                      ></TextInput>
                                                  );
                                              }
                                          )}
                                      </View>
                                  )}
                              </View>
                          );
                      })
                    : streets.map((elem: Street, index) => {
                          return (
                              <View
                                  key={index}
                                  style={{ marginBottom: 10, marginTop: 10 }}
                              >
                                  <Text style={styles.textDesc}>
                                      {index + 1}
                                  </Text>
                                  <Text style={styles.text}>
                                      Назва вулиці - {elem.name}
                                  </Text>
                                  <Text style={styles.text}>
                                      Довжина вулиці - {elem.length}
                                  </Text>
                                  <Text style={styles.text}>
                                      Історія вулиці - {elem.history}
                                  </Text>
                                  <Text style={styles.text}>
                                      Район - {elem.district}
                                  </Text>
                                  {elem.previousNames.length === 0 ? null : (
                                      <View>
                                          <Text style={styles.textDesc}>
                                              Попередні назви:
                                          </Text>
                                          {elem.previousNames.map(
                                              (elem: any, index) => {
                                                  return (
                                                      <Text
                                                          key={index}
                                                          style={styles.text}
                                                      >
                                                          {index +
                                                              1 +
                                                              "  " +
                                                              elem.value}
                                                      </Text>
                                                  );
                                              }
                                          )}
                                      </View>
                                  )}
                              </View>
                          );
                      })}
                {streets.length !== 0 ? (
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#66a3ff"
                                    : "#0066ff",
                            },
                            styles.button,
                        ]}
                        onPress={() => {
                            if (editable) {
                                let flag = true;
                                editStreets.forEach((newStreet: any) => {
                                    if (!nameValidator(newStreet).isValid) {
                                        alert(nameValidator(newStreet).message);
                                        flag = false;
                                        return;
                                    }
                                    if (!districtValidator(newStreet).isValid) {
                                        alert(
                                            districtValidator(newStreet).message
                                        );
                                        flag = false;
                                        return;
                                    }
                                    if (!lengthValidator(newStreet).isValid) {
                                        alert(
                                            lengthValidator(newStreet).message
                                        );
                                        flag = false;
                                        return;
                                    }
                                    if (!historyValidator(newStreet).isValid) {
                                        alert(
                                            historyValidator(newStreet).message
                                        );
                                        flag = false;
                                        return;
                                    }
                                    if (
                                        !previousNamesValidator(newStreet)
                                            .isValid
                                    ) {
                                        alert(
                                            previousNamesValidator(newStreet)
                                                .message
                                        );
                                        flag = false;
                                        return;
                                    }
                                });
                                if (!flag) return;
                                setStreets([...editStreets]);
                            }
                            setEditable(!editable);
                        }}
                    >
                        {editable ? (
                            <Text style={styles.text}>Submit</Text>
                        ) : (
                            <Text style={styles.text}>Edit</Text>
                        )}
                    </Pressable>
                ) : null}
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
        width: 180,
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
        alignSelf: "center",
    },
    textDesc: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
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
    input: {
        backgroundColor: "white",
        margin: 10,
        fontSize: 20,
        padding: 5,
        flex: 1,
    },
});

export default Lab8;
