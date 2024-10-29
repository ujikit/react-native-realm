import { Platform, StyleSheet } from 'react-native';

import { COLORS } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.white_100,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: COLORS.white_100,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 24,
  },
});
