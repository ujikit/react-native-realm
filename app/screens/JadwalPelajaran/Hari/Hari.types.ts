import { createRealmContext } from '@realm/react';
import type { StackScreenProps } from '@react-navigation/stack';

import type { StackParamList } from '../../../routers/Stack';

export type HariScreenProps = StackScreenProps<StackParamList, 'HariScreen'>;

export class Hari extends Realm.Object {
  _id!: Realm.BSON.ObjectID;
  title!: string;
}

export const RealmContext = createRealmContext({
  schema: [Hari],
});

// export type PreventiveGroupItemProps = {
//   date: string;
//   showModal: (show: boolean) => void;
// };
