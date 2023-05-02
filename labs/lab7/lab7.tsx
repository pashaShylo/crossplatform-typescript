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
import { LineChart } from "react-native-chart-kit";
import recursion from "./recursion";
import tabY from "./tabY";
import tabX from "./tabX";
import series from "./series";

const Lab7 = () => {
    const [Xn, setXn] = useState("-2");
    const [Xk, setXk] = useState("1");
    const [Xh, setXh] = useState("0.2");

    const [arrX, setArrX] = useState([]);
    const [arrY, setArrY] = useState([]);
    const [arrYSeries, setArrYSeries] = useState([]);
    const [arrYRecursion, setArrYRecursion] = useState([]);

    function calculate() {
        if (
            isNaN(parseFloat(Xn)) ||
            isNaN(parseFloat(Xk)) ||
            isNaN(parseFloat(Xh))
        ) {
            alert("Input Error");
            return;
        }

        if (parseFloat(Xn) < -9.42 || parseFloat(Xk) > 9.42) {
            alert("The range of the argument -3π<x<3π");
            return;
        }
        setArrX(tabX(parseFloat(Xn), parseFloat(Xk), parseFloat(Xh)));
        setArrY(tabY(arrX));
        setArrYSeries(series(arrX));
        setArrYRecursion(recursion(arrX));
    }

    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Xn
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={Xn}
                    onChangeText={(text) => setXn(text)}
                />
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Xk
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={Xk}
                    onChangeText={(text) => setXk(text)}
                />
                <Text
                    style={{ fontSize: 20, alignSelf: "center", marginTop: 10 }}
                >
                    Xh
                </Text>
                <TextInput
                    style={{
                        backgroundColor: "white",
                        margin: 15,
                        fontSize: 20,
                        padding: 5,
                    }}
                    value={Xh}
                    onChangeText={(text) => setXh(text)}
                />
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? "#66a3ff" : "#0066ff" },
                        styles.button,
                    ]}
                    onPress={calculate}
                >
                    <Text style={styles.text}>Calculate</Text>
                </Pressable>

                {arrX.length === 0 || arrY.length === 0 ? null : (
                    <LineChart
                        data={{
                            labels: arrX,
                            datasets: [
                                {
                                    data: arrY,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 16}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `black`,
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            alignSelf: "center",
                        }}
                    />
                )}
                {arrX.length === 0 || arrYSeries.length === 0 ? null : (
                    <LineChart
                        data={{
                            labels: arrX,
                            datasets: [
                                {
                                    data: arrYSeries,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 16}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `black`,
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            alignSelf: "center",
                        }}
                    />
                )}
                {arrX.length === 0 || arrYRecursion.length === 0 ? null : (
                    <LineChart
                        data={{
                            labels: arrX,
                            datasets: [
                                {
                                    data: arrYRecursion,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 16}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `black`,
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            alignSelf: "center",
                        }}
                    />
                )}
                <Text style={{ ...styles.text, alignSelf: "center" }}>
                    Табулювання
                </Text>
                {arrY.map((elem, index) => {
                    return (
                        <View
                            style={{
                                paddingBottom: 30,
                                marginLeft: 20,
                            }}
                            key={index}
                        >
                            <Text style={styles.text}>
                                x = {arrX[index]}; y = {elem}
                            </Text>
                        </View>
                    );
                })}
                <Text style={{ ...styles.text, alignSelf: "center" }}>Ряд</Text>
                {arrYSeries.map((elem, index) => {
                    return (
                        <View
                            style={{
                                paddingBottom: 30,
                                marginLeft: 20,
                            }}
                            key={index}
                        >
                            <Text style={styles.text}>
                                x = {arrX[index]}; y = {elem}
                            </Text>
                        </View>
                    );
                })}
                <Text style={{ ...styles.text, alignSelf: "center" }}>
                    Рекурсія
                </Text>
                {arrYRecursion.map((elem, index) => {
                    return (
                        <View
                            style={{
                                paddingBottom: 30,
                                marginLeft: 20,
                            }}
                            key={index}
                        >
                            <Text style={styles.text}>
                                x = {arrX[index]}; y = {elem}
                            </Text>
                        </View>
                    );
                })}
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
});

export default Lab7;
