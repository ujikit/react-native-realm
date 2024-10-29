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

import {Task} from './Task';

// Define Subjects
const SubjectSchema = {
  name: 'Subject',
  properties: {
    id: 'int',
    name: 'string',
  },
};

// Define Hours
const HourSchema = {
  name: 'Hour',
  properties: {
    id: 'int',
    startTime: 'string', // E.g., "07:00"
    endTime: 'string', // E.g., "07:35"
    subject: 'Subject?', // Assign a subject to each hour
  },
};

// Define Days
const DaySchema = {
  name: 'Day',
  properties: {
    id: 'int',
    name: 'string', // E.g., "Monday"
    hours: {type: 'list', objectType: 'Hour'}, // Hours in the day
  },
};

// Define Classes
export const ClassSchema = {
  name: 'Class',
  properties: {
    id: 'int',
    name: 'string', // E.g., "Class A"
    schedule: {type: 'list', objectType: 'Day'}, // Full week schedule
  },
};

// If you have multiple data models, you can export all of them in a
// list as a convenience when providing the schema when opening a Realm.
export const schemas = [
  Task,
  SubjectSchema,
  HourSchema,
  DaySchema,
  ClassSchema,
];
