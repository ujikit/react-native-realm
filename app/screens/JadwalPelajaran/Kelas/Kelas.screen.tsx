import React, {useEffect} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import KelasLogic from './Kelas.logic';
import {KelasScreenProps} from './Kelas.types';

const KelasScreen = (props: KelasScreenProps) => {
  const {actions, data} = KelasLogic(props);

  const {navigation} = props;

  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={actions._handleAdd} style={{backgroundColor:'white'}}>
        <Text style={{color: 'black'}}>Click to initiate the data</Text>
      </TouchableOpacity>
      <ScrollView
        bounces={false}
        style={{backgroundColor: 'white', padding: 50, paddingTop: 80}}
        contentContainerStyle={{
          paddingBottom: Platform.select({ios: 200, android: 25}),
        }}>
        {data.listOfKelas.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('HariScreen', {detailKelas: item})
            }
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
    </View>
  );
};

export default KelasScreen;
