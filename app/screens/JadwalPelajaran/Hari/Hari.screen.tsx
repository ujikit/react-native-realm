import React from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import HariLogic from './Hari.logic';
import {HariScreenProps} from './Hari.types';

const HariScreen = (props: HariScreenProps) => {
  const {data} = HariLogic(props);

  const {navigation} = props;

  return (
    <ScrollView
      bounces={false}
      style={{backgroundColor: 'white', padding: 50, paddingTop: 80}}
      contentContainerStyle={{
        paddingBottom: Platform.select({ios: 200, android: 25}),
      }}>
      {data.detailKelas.schedule.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('JamScreen', {detailHari: item})}
          style={{
            width: '100%',
            height: 90,
            padding: 30,
            borderWidth: 1,
            borderRadius: 15,
            marginBottom: 15,
          }}>
          <Text numberOfLines={1} style={{fontSize: 20, color: 'black'}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HariScreen;
