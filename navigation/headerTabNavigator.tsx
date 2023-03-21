import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Lab4 from '../labs/lab4/lab4';
const Drawer = createDrawerNavigator();

function headerTabNavigator() {
  return (
    <Drawer.Navigator useLegacyImplementation={true}>
        <Drawer.Screen
            name='Lab4'
            component={Lab4}
        />
    </Drawer.Navigator>
  );
}

export default headerTabNavigator;