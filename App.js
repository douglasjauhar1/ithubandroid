import React, { Component } from 'react';
import AppNavigator from './src/screens/index'
import { createAppContainer } from 'react-navigation';
// import {AsyncStorage} from 'react-navigation';



// export default class App extends React.Component {
  
//   render() {
//     return <AppContainer />;
//   }
// }

// // Imports: Dependencies
// import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { Text } from 'native-base'


import { store, persistor } from './redux/store/store';

const AppContainer = createAppContainer(AppNavigator);

export default App = () => {
  return (

    <Provider store={store}>
      <PersistGate 
        loading={<Text> LOLOLOL </Text>}
        persistor={persistor}
      >
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};