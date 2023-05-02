import { View , Text, StyleSheet} from "react-native";
import { Diesel, ReactiveEngine } from "../../classes/lab6";

const Lab6 = () => {

    const diesel = new Diesel(100,50)
    const reactiveEngine = new ReactiveEngine(100)

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>Лабораторна робота №6</Text>
            <Text style={styles.text}>Дизельний двигун</Text>
            <Text style={styles.text}>Об'єм баку - {diesel.fuelLevel}</Text>
            <Text style={styles.text}>Тип палива - {diesel.fuelType}</Text>
            <Text style={styles.text}>Потужність - {diesel.power}</Text>
            <Text style={styles.text}>Реактивний двигун</Text>
            <Text style={styles.text}>Потужність - {reactiveEngine.power}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        paddingBottom: 15,
      },
})

export default Lab6;