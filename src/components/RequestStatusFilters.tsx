import React from 'react';
import {ScrollView} from 'react-native';
import {ButtonRequest} from './ButtonRequest';
import {CustomView} from './Containers';
import {Text} from './Texts';
import {FONTS} from '../constants/colors';
import {str} from '../locales/Locale';
import AprovedIcon from '../../assets/icons_svg/aproved_icon';
import CancelledIcon from '../../assets/icons_svg/cancelled_icon';
import DeclinedIcon from '../../assets/icons_svg/decline_icon';
import FilterAll from '../../assets/icons_svg/filter_all';
import FilterPending from '../../assets/icons_svg/filter_pending';
import ResolvedIcon from '../../assets/icons_svg/resolved_icon';

const RequestStatusFilters: React.FC<{
  index: any;
  setIndex: any;
}> = ({index, setIndex}) => {
  const onSelect = (index: number) => {
    setIndex(index);
  };

  return (
    <CustomView style={{height: 50, marginVertical: 8}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ButtonRequest
          onPress={() => onSelect(9)}
          isActive={index === 9 ? true : false}>
          <FilterAll size={18} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requesType.all')}
          </Text>
        </ButtonRequest>
        <ButtonRequest
          onPress={() => onSelect(1)}
          isActive={index === 1 ? true : false}>
          <FilterPending size={22} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requestStatus.pending')}
          </Text>
        </ButtonRequest>
        <ButtonRequest
          onPress={() => onSelect(2)}
          isActive={index === 2 ? true : false}>
          <AprovedIcon size={22} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requestStatus.approved')}
          </Text>
        </ButtonRequest>
        <ButtonRequest
          onPress={() => onSelect(3)}
          isActive={index === 3 ? true : false}>
          <DeclinedIcon size={22} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requestStatus.rejected')}
          </Text>
        </ButtonRequest>
        <ButtonRequest
          onPress={() => onSelect(4)}
          isActive={index === 4 ? true : false}>
          <CancelledIcon size={22} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requestStatus.cancelled')}
          </Text>
        </ButtonRequest>
        <ButtonRequest
          onPress={() => onSelect(5)}
          isActive={index === 5 ? true : false}>
          <ResolvedIcon size={22} />
          <Text style={{...FONTS.body4, marginLeft: 10}}>
            {str('requestDetail.requestStatus.resolved')}
          </Text>
        </ButtonRequest>
      </ScrollView>
    </CustomView>
  );
};

export default RequestStatusFilters;
