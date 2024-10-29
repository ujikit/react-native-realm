import {JamScreenProps} from './Jam.types';

const JamLogic = (props: JamScreenProps) => {
  const {navigation} = props;

  const {detailHari} = props.route.params

  console.log('detailHari', detailHari);


  return {
    actions: {},
    data: {detailHari},
  };
};

export default JamLogic;
