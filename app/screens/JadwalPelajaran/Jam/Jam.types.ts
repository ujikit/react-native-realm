import type {StackScreenProps} from '@react-navigation/stack';

import type {StackParamList} from '../../../routers/Stack';

export type JamScreenProps = StackScreenProps<StackParamList, 'JamScreen'>;

export type PreventiveGroupItemProps = {
  date: string;
  showModal: (show: boolean) => void;
};
