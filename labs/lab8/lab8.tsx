import {StyleSheet, Text, View, TextInput, ScrollView, Pressable, Dimensions} from 'react-native';
import React, { useState} from 'react';
import { nameValidator, districtValidator, lengthValidator, historyValidator, previousNamesValidator, PreviousName, Street} from './validation';

const Lab8 = () => {
  
  const streets : Street[] = [] 

  const [name, setName] = useState('')
  const [length, setLength] = useState<number>(0)
  const [history, setHistory] = useState('')
  const [district, setDistrict] = useState('')

  const [list, setList] = useState<PreviousName[]>([])

  const addItem = () => {
    setList([...list, {id: Date.now(), value: ''}])
  }

  const deleteItem = (id: number) => {
    setList(list.filter((elem: any)=>{
        return elem.id !== id
    }))
  }
  const inputChange = (id: number, text: string, key: string) => {
    setList(list.map((elem: any) => {
        if(elem.id === id){
            return {...elem, [key]: text}
        }
        return elem
    }))
  }

  const addStreet = () => {
    const newStreet = {name: name, length: length, history: history, district: district, previousNames: list}
    if(!nameValidator(newStreet).isValid){
        alert(nameValidator(newStreet).message)
        return
    }
    if(!districtValidator(newStreet).isValid){
        alert(districtValidator(newStreet).message)
        return
    }
    if(!lengthValidator(newStreet).isValid){
        alert(lengthValidator(newStreet).message)
        return
    }
    if(!historyValidator(newStreet).isValid){
        alert(historyValidator(newStreet).message)
        return
    }
    if(!previousNamesValidator(newStreet).isValid){
        alert(previousNamesValidator(newStreet).message)
        return
    }
    streets.push(newStreet)
    console.log(streets)
  }

  return (
    <>
    <ScrollView style={{
          flex: 1,
          backgroundColor: '#82ccdd',
        }}>
        <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 10}}>Найменування вулиці</Text>
        <TextInput style={styles.input} value={name} onChangeText={(text)=> setName(text)}/>
        <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 10}}>Довжина (метри)</Text>
        <TextInput style={{backgroundColor: 'white', margin: 15, fontSize: 20, padding: 5, }} value={length.toString()} onChangeText={(text:string)=> setLength(parseInt(text) ? parseInt(text) : 0)}/>
        <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 10}}>Історія</Text>
        <TextInput style={{backgroundColor: 'white', margin: 15, fontSize: 20, padding: 5, }} value={history} onChangeText={(text)=> setHistory(text)}/>
        <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 10}}>Район</Text>
        <TextInput style={{backgroundColor: 'white', margin: 15, fontSize: 20, padding: 5, }} value={district} onChangeText={(text)=> setDistrict(text)}/>
        <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', height: 70}}>
            <Text style={{fontSize: 23, alignSelf: 'center', marginTop: 10}}>Список попередніх назв вулиці  </Text>
            <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#66a3ff' : '#0066ff'}, {width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 12}]} onPress={addItem}>
                <Text style={styles.text}>+</Text>
            </Pressable>
        </View>
        <View>
            {list.map((elem: any)=>{
                return <View key={elem.id} style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput style={styles.input} value={elem.value} onChangeText={(text: string) => inputChange(elem.id, text, 'value')}/>
                            <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#F87373': '#F80000'}, {width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginRight: 10}]} onPress={()=>deleteItem(elem.id)}>
                                <Text style={styles.text}>-</Text>
                            </Pressable>
                        </View>
            })}
        </View>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#66a3ff' : '#0066ff'}, styles.button]} onPress={addStreet}>
            <Text style={styles.text}>Додати</Text>
        </Pressable>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: 180
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  res: {
    alignSelf: 'center',
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginTop: 20
  },
  input: {
    backgroundColor: 'white', 
    margin: 10, 
    fontSize: 20, 
    padding: 5,
    flex: 1 
}
});

export default Lab8;