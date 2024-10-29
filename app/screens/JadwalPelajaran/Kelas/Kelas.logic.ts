import { useQuery, useRealm } from '@realm/react';
import {KelasScreenProps} from './Kelas.types';
import { ClassSchema } from '../../../models';
import { useEffect } from 'react';

const KelasLogic = (props: KelasScreenProps) => {
  const {navigation} = props;

  const realm = useRealm();
  const listOfKelas = useQuery(ClassSchema.name)

  useEffect(() => {
    console.log('asdsadsada =>>>', realm.path);
    console.log('asdasdasd',listOfKelas);
  }, [])

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }


  const _handleAdd = () => {
    realm.write(() => {
      // Subjects (same subjects for all classes)
      const IPS = realm.create('Subject', {id: 1, name: 'IPS'});
      const IPA = realm.create('Subject', {id: 2, name: 'IPA'});
      const BahasaInggris = realm.create('Subject', {
        id: 3,
        name: 'Bahasa Inggris',
      });
      const Agama = realm.create('Subject', {id: 4, name: 'Agama'});
      const BahasaIndonesia = realm.create('Subject', {
        id: 5,
        name: 'Bahasa Indonesia',
      });
      const Matematika = realm.create('Subject', {id: 6, name: 'Matematika'});
      const BahasaJawa = realm.create('Subject', {id: 7, name: 'Bahasa Jawa'});
      const Sejarah = realm.create('Subject', {id: 8, name: 'Sejarah'});
      const BahasaMandarin = realm.create('Subject', {
        id: 9,
        name: 'Bahasa Mandarin',
      });

      const subjects = [
        IPS,
        IPA,
        BahasaInggris,
        Agama,
        BahasaIndonesia,
        Matematika,
        BahasaJawa,
        Sejarah,
        BahasaMandarin,
      ];

      // Time Slots
      const timeSlots = [
        {id: 1, startTime: '07:00', endTime: '07:35'},
        {id: 2, startTime: '07:35', endTime: '08:10'},
        {id: 3, startTime: '08:10', endTime: '08:45'},
        {id: 4, startTime: '08:45', endTime: '09:20'},
        {id: 5, startTime: '09:20', endTime: '09:55'},
        {id: 6, startTime: '10:00', endTime: '10:35'},
        {id: 7, startTime: '10:35', endTime: '11:10'},
        {id: 8, startTime: '11:10', endTime: '11:45'},
        {id: 9, startTime: '11:45', endTime: '12:15'},
      ];

      // Days of the week
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

      // Generate randomized schedules for each class
      ['Class A', 'Class B', 'Class C'].forEach((className, classId) => {
        const weeklySchedule = dayNames.map((dayName, dayIndex) => {
          const shuffledSubjects = shuffleArray(subjects).slice(
            0,
            timeSlots.length,
          );

          const dayHours = timeSlots.map((timeSlot, timeSlotIndex) => {
            // Assign a random subject to each time slot
            return realm.create('Hour', {
              id: dayIndex * timeSlots.length + timeSlot.id,
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              subject: shuffledSubjects[timeSlotIndex], // Assign shuffled subject to each time slot
            });
          });
          return realm.create('Day', {
            id: classId * dayNames.length + dayIndex + 1,
            name: dayName,
            hours: dayHours,
          });
        });

        // Create each class with its weekly schedule
        realm.create('Class', {
          id: classId + 1,
          name: className,
          schedule: weeklySchedule,
        });
      });
    });
  };


  return {
    actions: {_handleAdd},
    data: {listOfKelas},
  };
};

export default KelasLogic;
