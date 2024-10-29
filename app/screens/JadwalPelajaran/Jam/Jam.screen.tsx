import React from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import JamLogic from './Jam.logic';
import {JamScreenProps} from './Jam.types';

const JamScreen = (props: JamScreenProps) => {
  const {data} = JamLogic(props);

  const {navigation} = props;

  // const listOfJam = [
  //   {
  //     name: '07.00 - 07.35',
  //   },
  //   {
  //     name: '07.35 - 08.10',
  //   },
  //   {
  //     name: '08.10 - 08.45',
  //   },
  //   {
  //     name: '08.45 - 09.20',
  //   },
  //   {
  //     name: '09.20 - 09.55',
  //   },
  //   {
  //     name: '09.55 - 10.30',
  //   },
  //   {
  //     name: '10.30 - 11.05',
  //   },
  //   {
  //     name: '11.05 - 11.40',
  //   },
  //   {
  //     name: '11.40 - 12.15',
  //   },
  // ];

  return (
    <ScrollView
      bounces={false}
      style={{backgroundColor: 'white', padding: 50, paddingTop: 80}}
      contentContainerStyle={{
        paddingBottom: Platform.select({ios: 200, android: 25}),
      }}>
      {data.detailHari.hours.map((item, index) => (
        <TouchableOpacity
          disabled={true}
          key={index}
          style={{
            width: '100%',
            height: 110,
            padding: 30,
            borderWidth: 1,
            borderRadius: 15,
            marginBottom: 15,
          }}>
          <Text numberOfLines={1} style={{fontSize: 20, color: 'black'}}>
            {item.startTime} - {item.endTime}
          </Text>
          <Text style={{paddingTop: 10, color: 'black'}}>{item.subject.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default JamScreen;
