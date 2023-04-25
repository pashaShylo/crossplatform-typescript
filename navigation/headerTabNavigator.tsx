import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Lab4 from '../labs/lab4/lab4';
import Lab8 from '../labs/lab8/lab8';
const Drawer = createDrawerNavigator();

function headerTabNavigator() {
  return (
    <Drawer.Navigator useLegacyImplementation={true}>
        <Drawer.Screen
            name='Lab4'
            component={Lab4}
        />
        <Drawer.Screen
            name='Lab8'
            component={Lab8}
        />
    </Drawer.Navigator>
  );
}

export default headerTabNavigator;