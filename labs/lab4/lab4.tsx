import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Square } from '../../classes/square';
import { Rectangle } from '../../classes/rectangle';
import { useState } from 'react';

export default function Lab4() {

  const [arr, setArr] = useState<(Square | Rectangle)[]>([]) 
  const [minArea, setMinArea] = useState<number | undefined>(undefined)
  
  function calculate() : void{
    const res = []
    for(let i = 0; i < 5; i++){
        if(i % 2 === 0){
          res.push(new Square(`square${i+1}`, i+3))
        }else {
          res.push(new Rectangle(`rectangle${i+1}`, i+4, i + 2))
        }
    }
    setArr(res)
  }
  function findMinArea(): void {
    const areas = arr.map((elem) => {
        return elem.area()
    })
    setMinArea(areas.sort((a,b) => a - b)[0] || undefined)
  }
  

  function funcMap (elem : Square | Rectangle) : JSX.Element{
    if(elem instanceof Rectangle){
      return (
      <View key={elem.name} style={{marginTop: 20}}>
        <Text style={styles.text}>Name = {elem.name}</Text>
        <Text style={styles.text}>a = {elem.a}</Text>
        <Text style={styles.text}>b = {elem.b}</Text>
        <Text style={styles.text}>area = {elem.area()}</Text>
      </View>
    )
    }
    return (
      <View key={elem.name} style={{marginTop: 20}}>
        <Text style={styles.text}>Name = {elem.name}</Text>
        <Text style={styles.text}>a = {elem.a}</Text>
        <Text style={styles.text}>area = {elem.area()}</Text>
      </View>
    )
   }

  return (
    <ScrollView>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#66a3ff' : '#0066ff'}, styles.button]} onPress={calculate}>
            <Text style={styles.text}>Розрахунок</Text>
        </Pressable>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#66a3ff' : '#0066ff'}, styles.button]} onPress={findMinArea}>
            <Text style={styles.text}>Знайти</Text>
        </Pressable>
        {arr.map(funcMap)}
        {minArea 
        ? <Text style={[styles.text, {marginTop: 40}]}>MinArea = {minArea}</Text>
        : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 200
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    alignSelf: 'center'
  },
  res: {
    alignSelf: 'center',
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginTop: 20
  }
});
