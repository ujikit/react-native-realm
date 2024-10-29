import Realm from 'realm';

// Class Model
class ClassModel extends Realm.Object {
  static schema = {
    name: 'Class',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      schedule: { type: 'list', objectType: 'Schedule' }, // Relates to the schedule
    },
  };
}

// Day Model
class DayModel extends Realm.Object {
  static schema = {
    name: 'Day',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string', // e.g., "Monday"
    },
  };
}

// Hour Model
class HourModel extends Realm.Object {
  static schema = {
    name: 'Hour',
    primaryKey: 'id',
    properties: {
      id: 'int',
      time: 'string', // e.g., "07:00 AM"
    },
  };
}

// Mata Pelajaran Model (Subject)
class MataPelajaranModel extends Realm.Object {
  static schema = {
    name: 'MataPelajaran',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string', // e.g., "Matematika"
    },
  };
}

// Schedule Model - This links Class, Day, Hour, and MataPelajaran
class ScheduleModel extends Realm.Object {
  static schema = {
    name: 'Schedule',
    primaryKey: 'id',
    properties: {
      id: 'int',
      class: 'Class',
      day: 'Day',
      hour: 'Hour',
      subject: 'MataPelajaran',
    },
  };
}

export default new Realm({
  schema: [ClassModel, DayModel, HourModel, MataPelajaranModel, ScheduleModel],
});
