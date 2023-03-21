import HeaderTabNavigator from './navigation/headerTabNavigator';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer} from '@react-navigation/native';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HeaderTabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

