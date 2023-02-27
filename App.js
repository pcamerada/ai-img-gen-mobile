import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import NewImage from './screens/NewImage';
import { AlertMessage, Loader } from './components';
import { ContextProvider } from './context/ContextProvider';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  })

  if (!loaded) return;
  
  return (
    <ContextProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name='Home' component={ Home } />
          <Stack.Screen name='NewImage' component={ NewImage } />
        </Stack.Navigator>
        <AlertMessage />
        <Loader />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;