import type {StackScreenProps} from '@react-navigation/stack';

import type {StackParamList} from '../../../routers/Stack';

export type KelasScreenProps = StackScreenProps<StackParamList, 'KelasScreen'>;

export type PreventiveGroupItemProps = {
  date: string;
  showModal: (show: boolean) => void;
};
