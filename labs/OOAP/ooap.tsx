import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    Cafe,
    PizzaFactory,
    DrinkFactory,
    OrderBuilder,
    Order,
    Product,
    ExtraCheeseDecorator,
    AuthProxy,
    BoxAdapter,
    Box,
} from "./classes";
const users = [
    { name: "Pavlo", password: "123", role: "admin" },
    { name: "Nikita", password: "123", role: "user" },
];
const newCafe = Cafe.getInstance();

const pizzaFactory = new PizzaFactory();
const drinkFactory = new DrinkFactory();

const Margarita = pizzaFactory.createProduct("Margarita", 30);
const BoxMargarita = new Box(Margarita);
const BoxMargaritaAdapter = new BoxAdapter(BoxMargarita);
const Carbonara = pizzaFactory.createProduct("Carbonara", 20);
const extraCheeseMargarita = new ExtraCheeseDecorator(Margarita);
const CocaCola = drinkFactory.createProduct("CocaCola", 10);
const Sprite = drinkFactory.createProduct("Sprite", 10);
const authProxy = new AuthProxy();
let orderBuilder: any;
const OOAP = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [userRole, setUserRole] = useState<any>("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [makingOrder, setMakingOrder] = useState(false);

    const [order, setOrder] = useState<any>([
        { value: Margarita, cnt: 0 },
        { value: BoxMargaritaAdapter, cnt: 0 },
        { value: extraCheeseMargarita, cnt: 0 },
        { value: Carbonara, cnt: 0 },
        { value: CocaCola, cnt: 0 },
        { value: Sprite, cnt: 0 },
    ]);

    const addItem = (itemType: any) => {
        setOrder(
            order.map((elem: any) => {
                if (elem.value == itemType) {
                    return { ...elem, ["cnt"]: elem.cnt + 1 };
                }
                return elem;
            })
        );
    };

    const removeItem = (itemType: any) => {
        setOrder(
            order.map((elem: any) => {
                if (elem.value == itemType) {
                    return elem.cnt === 0
                        ? { ...elem, ["cnt"]: 0 }
                        : { ...elem, ["cnt"]: elem.cnt - 1 };
                }
                return elem;
            })
        );
    };

    const [orderList, setOrderList] = useState<Order[]>([]);

    const addOrder = (newOrder: Order) => {
        setOrderList([...orderList, newOrder]);
    };

    if (!isAuth) {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
            >
                <Text style={styles.text}>UserName</Text>
                <TextInput
                    onChangeText={(text) => setLogin(text)}
                    style={styles.input}
                ></TextInput>
                <Text style={styles.text}>Password</Text>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                ></TextInput>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 200,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        const res = authProxy.login(login, password, users);
                        if (res) {
                            setIsAuth(true);
                            setUserRole(res);
                        }
                    }}
                >
                    <Text style={styles.text}>Login</Text>
                </Pressable>
            </ScrollView>
        );
    }

    if (!makingOrder) {
        if (userRole === "admin") {
            return (
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: "#82ccdd",
                    }}
                >
                    <Text style={styles.text}>Admin panel</Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#66a3ff"
                                    : "#0066ff",
                            },
                            {
                                width: 200,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 12,
                                alignSelf: "center",
                                marginTop: 20,
                            },
                        ]}
                        onPress={() => {
                            setIsAuth(false);
                        }}
                    >
                        <Text style={styles.text}>LogOut</Text>
                    </Pressable>
                </ScrollView>
            );
        }
        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
            >
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 200,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        setIsAuth(false);
                    }}
                >
                    <Text style={styles.text}>LogOut</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 200,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        setMakingOrder(true);
                        orderBuilder = new OrderBuilder();
                    }}
                >
                    <Text style={styles.text}>Start ordering</Text>
                </Pressable>
                {orderList.length === 0 ? null : (
                    <Text style={{ ...styles.text, marginTop: 30 }}>
                        Замовлення
                    </Text>
                )}
                {orderList.map((elem: Order, index: number) => {
                    return (
                        <View
                            key={elem.orderId}
                            style={{
                                flexDirection: "column",
                                marginTop: 30,
                            }}
                        >
                            <Text style={styles.text}>{index + 1}</Text>
                            {elem
                                .getProducts()
                                .map((elem: Product, index: number) => {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: "column",
                                            }}
                                            key={index}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.text,
                                                }}
                                            >
                                                {elem.getDescription()}
                                            </Text>
                                        </View>
                                    );
                                })}
                            <Text
                                style={{
                                    ...styles.text,
                                    alignSelf: "center",
                                }}
                            >
                                {elem.getPrice()}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }

    return (
        <>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#82ccdd",
                }}
            >
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(Margarita);
                        addItem(Margarita);
                    }}
                >
                    <Text style={styles.text}>Margarita +</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(BoxMargaritaAdapter);
                        addItem(BoxMargaritaAdapter);
                    }}
                >
                    <Text style={styles.text}>Box for Margarita +</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(extraCheeseMargarita);
                        addItem(extraCheeseMargarita);
                    }}
                >
                    <Text style={styles.text}>ExtraCheeseMargarita +</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(Carbonara);
                        addItem(Carbonara);
                    }}
                >
                    <Text style={styles.text}>Carbonara +</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(CocaCola);
                        addItem(CocaCola);
                    }}
                >
                    <Text style={styles.text}>CocaCola +</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#66a3ff" : "#0066ff",
                        },
                        {
                            width: 250,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 12,
                            alignSelf: "center",
                            marginTop: 20,
                        },
                    ]}
                    onPress={() => {
                        orderBuilder.addProduct(Sprite);
                        addItem(Sprite);
                    }}
                >
                    <Text style={styles.text}>Sprite +</Text>
                </Pressable>
                {order.map((elem: any, index: number) => {
                    if (elem.cnt === 0) {
                        return null;
                    }
                    return (
                        <View key={index}>
                            <Text style={styles.text}>
                                {elem.value.getDescription()}
                            </Text>
                            <Text style={styles.text}>{elem.cnt}</Text>
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
                                        alignSelf: "center",
                                    },
                                ]}
                                onPress={() => {
                                    orderBuilder.removeProduct(elem.value);
                                    removeItem(elem.value);
                                }}
                            >
                                <Text style={styles.text}>-</Text>
                            </Pressable>
                        </View>
                    );
                })}
                {orderBuilder.getOrder().getProducts().length === 0 ? null : (
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#66a3ff"
                                    : "#0066ff",
                            },
                            {
                                width: 200,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 12,
                                alignSelf: "center",
                                marginTop: 20,
                            },
                        ]}
                        onPress={() => {
                            if (
                                orderBuilder.getOrder().getProducts().length ===
                                0
                            ) {
                                return;
                            }
                            addOrder(orderBuilder.build());
                            newCafe.placeOrder(orderBuilder.build());
                            setOrder([
                                { value: Margarita, cnt: 0 },
                                { value: BoxMargaritaAdapter, cnt: 0 },
                                { value: extraCheeseMargarita, cnt: 0 },
                                { value: Carbonara, cnt: 0 },
                                { value: CocaCola, cnt: 0 },
                                { value: Sprite, cnt: 0 },
                            ]);
                            setMakingOrder(false);
                        }}
                    >
                        <Text style={styles.text}>Make order</Text>
                    </Pressable>
                )}
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

export default OOAP;
