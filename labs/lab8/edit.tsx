import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Street } from "./validation";
const Edit = (props: any) => {
    return (
        <View>
            {props.editable
                ? props.streets.map((elem: Street, index: any) => {
                      return (
                          <View
                              key={index}
                              style={{ marginBottom: 10, marginTop: 10 }}
                          >
                              <Text style={styles.textDesc}>{index + 1}</Text>
                              <Text style={styles.textDesc}>Назва вулиці:</Text>
                              <TextInput
                                  defaultValue={elem.name}
                                  onChangeText={(text) =>
                                      props.editChange(index, "name", text)
                                  }
                                  style={styles.text}
                              ></TextInput>
                              <Text style={styles.textDesc}>
                                  Довжина вулиці:
                              </Text>
                              <TextInput
                                  defaultValue={elem.length.toString()}
                                  onChangeText={(text) =>
                                      props.editChange(index, "length", text)
                                  }
                                  style={styles.text}
                              ></TextInput>
                              <Text style={styles.textDesc}>
                                  Історія вулиці:
                              </Text>
                              <TextInput
                                  defaultValue={elem.history}
                                  onChangeText={(text) =>
                                      props.editChange(index, "history", text)
                                  }
                                  style={styles.text}
                              ></TextInput>
                              <Text style={styles.textDesc}>Район:</Text>
                              <TextInput
                                  defaultValue={elem.district}
                                  onChangeText={(text) =>
                                      props.editChange(index, "district", text)
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
                                                      defaultValue={elem1.value}
                                                      onChangeText={(text) =>
                                                          props.editChange(
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
                : props.streets.map((elem: Street, index: any) => {
                      return (
                          <View
                              key={index}
                              style={{ marginBottom: 10, marginTop: 10 }}
                          >
                              <Text style={styles.textDesc}>{index + 1}</Text>
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
        </View>
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

export default Edit;
