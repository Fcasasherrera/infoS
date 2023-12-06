import React, {FC, useEffect, useState} from 'react';
import {Row} from './Containers';
import {useNavigation} from '@react-navigation/native';
import {RequestInfo, RequestType} from './RequestGroup';
import RightArrow from '../../assets/icons_svg/right_arrow';
import {TouchableOpacity} from 'react-native';
import {str} from '../locales/Locale';
import {CustomMoment} from '../utils';
import {EnumStatus} from '../types/requests';
import {useAppSelector} from '../redux/hooks';
import {loginSelector} from '../redux/auth/login/LoginSelector';
import {statusColors} from '../constants/.env';

export const CardRequestList: FC<{
  item: any;
  index: any;
  filters: any;
}> = ({item, filters, index}) => {
  const navigation: any = useNavigation();
  // console.log(item);
  const [localStatus, setLocalStatus] = useState('pending');
  const {user} = useAppSelector(loginSelector);

  useEffect(() => {
    setLocalStatus(EnumStatus[item.idRequestStatus]);
  }, [item.idRequestStatus]);

  const statusCard = statusColors[localStatus];

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 16,
      }}
      onPress={() =>
        navigation.navigate('RequestDetail', {item, filters, index, statusCard})
      }>
      <RequestType statusCard={statusCard} idRequestType={item.idRequestType} />

      <Row fdirection="row" justify="space-between" align="center">
        {item.idRequestType === 3 ? (
          <>
            <RequestInfo gray title={'Comentario'} caption={item.comments} />
          </>
        ) : (
          <>
            <RequestInfo
              gray
              title={str('requestDetail.startDate')}
              caption={CustomMoment(
                item.additional_info?.startdate,
                'D-MM-YYYY',
              )}
            />
            <RequestInfo
              gray
              title={str('requestDetail.endDate')}
              caption={CustomMoment(item.additional_info?.enddate, 'D-MM-YYYY')}
            />
            <RequestInfo
              gray
              center
              title={str('requestDetail.days')}
              caption={item.additional_info?.days}
            />
          </>
        )}

        <RightArrow size={24} />
      </Row>
    </TouchableOpacity>
  );
};
