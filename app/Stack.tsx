import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import JamScreen from './screens/JadwalPelajaran/Jam';
import HariScreen from './screens/JadwalPelajaran/Hari';
import KelasScreen from './screens/JadwalPelajaran/Kelas';

const {Navigator, Screen} = createStackNavigator();

const Stack = () => (
  <Navigator initialRouteName="KelasScreen">
    <Screen name="JamScreen" component={JamScreen} />
    <Screen name="HariScreen" component={HariScreen} />
    <Screen name="KelasScreen" component={KelasScreen} />
  </Navigator>
);

export default Stack;
