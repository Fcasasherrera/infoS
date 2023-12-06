import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {themeLight} from './src/constants/colors';
import {RootStack} from './src/navigation/RootStack';
import {store} from './src/redux/store';

const App = () => {
  // const appearance = Appearance.getColorScheme() === 'dark' ? themeDark : themeLight;
  console.disableYellowBox = true;

  const appearance = themeLight;

  return (
    <GestureHandlerRootView>
      <View style={{height: '100%', width: '100%'}}>
        <Provider store={store}>
          <ThemeProvider theme={appearance}>
            <RootStack />
          </ThemeProvider>
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
};
export const getStyles = (theme: any, enable: boolean) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
    },
    headerGradient: {
      flex: 0,
      backgroundColor: enable ? theme.primary : theme.backgroundColor,
    },
    fullScreen: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    },
  });
  return styles;
};

export default App;
