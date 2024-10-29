////////////////////////////////////////////////////////////////////////////
//
// Copyright 2023 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import {useCallback, useEffect, useState} from 'react';
import {useQuery, useRealm} from '@realm/react';

import {Task} from '../models/Task';

/**
 * Provides functions for managing changes to the tasks in the Realm,
 * such as adding, updating, and deleting tasks.
 *
 * @param userId The App user's ID if sync is enabled.
 */
export function useTaskManager(userId = 'SYNC_DISABLED') {
  const realm = useRealm();
  const [showCompleted, setShowCompleted] = useState(true);
  const tasks = useQuery(
    Task,
    collection =>
      showCompleted
        ? collection.sorted('createdAt')
        : collection.filtered('isComplete == false').sorted('createdAt'),
    [showCompleted],
  );

  useEffect(() => {
    console.log('asdsadsada =>>>', realm.path);
  }, []);

  // Helper function to shuffle subjects randomly for each time slot
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
  // Data Entry Example
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
      ['Kelas A', 'Kelas B', 'Kelas C'].forEach((className, classId) => {
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

  /**
   * Adds a task to the database.
   *
   * @note
   * Everything in the function passed to `realm.write()` is a transaction and will
   * hence succeed or fail together. A transaction is the smallest unit of transfer
   * in Realm so we want to be mindful of how much we put into one single transaction
   * and split them up if appropriate (more commonly seen server side). Since clients
   * may occasionally be online during short time spans we want to increase the probability
   * of sync participants to successfully sync everything in the transaction, otherwise
   * no changes propagate and the transaction needs to start over when connectivity allows.
   */
  const addTask = useCallback(
    (description: string) => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create(Task, {description, userId});
      });
    },
    [realm, userId],
  );

  /**
   * Updates a task by toggling its `isComplete` status.
   *
   * @note
   * Normally when updating a record in a NoSQL or SQL database, we have to type
   * a statement that will later be interpreted and used as instructions for how
   * to update the record. But in Realm, the objects are "live" because they are
   * actually referencing the object's location in memory on the device (memory mapping).
   * So rather than typing a statement, we modify the object directly by changing
   * the property values. If the changes adhere to the schema, Realm will accept
   * this new version of the object and wherever this object is being referenced
   * locally will also see the changes "live".
   */
  const toggleTaskStatus = useCallback(
    (task: Task) => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });

      // Alternatively if passing the ID as the argument to toggleTaskStatus:
      // realm.write(() => {
      //   // If the ID is passed as an ObjectId:
      //   const task = realm.objectForPrimaryKey('Task', id);
      //   // Or, if the ID is passed as a string:
      //   const task = realm.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realm],
  );

  /**
   * Deletes a task from the database.
   */
  const deleteTask = useCallback(
    (task: Task) => {
      realm.write(() => {
        realm.delete(task);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm.delete(realm.objectForPrimaryKey('Task', id));
      });
    },
    [realm],
  );

  const toggleShowCompleted = useCallback(() => {
    setShowCompleted(!showCompleted);
  }, [showCompleted]);

  return {
    tasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    showCompleted,
    toggleShowCompleted,
    _handleAdd,
  };
}
