import { HariScreenProps } from './Hari.types';

const HariLogic = (props: HariScreenProps) => {
  const { navigation } = props;

  const {detailKelas} = props.route.params

  console.log('asdasdsa', detailKelas);
  

  return {
    actions: {},
    data: {detailKelas}, 
  };
};

export default HariLogic;
