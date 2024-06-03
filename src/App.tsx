import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux';
import {Loading} from './components';

function MainApp(): React.JSX.Element {
  const stateGlobal = useSelector((state: any) => state.account);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
export default App;
