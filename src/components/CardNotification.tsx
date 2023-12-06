import React, {FC} from 'react';
import {CustomCardNotification, Row} from './Containers';
import {useNavigation} from '@react-navigation/native';
import {CustomMoment} from '../utils';
import {statusColor, FONTS, themeLight} from '../constants/colors';
import {Thumbnail} from './Thumbnails';
import {Text} from './Texts';

export const CardNotifications: FC<{
  item: any;
}> = ({item}) => {
  const navigation: any = useNavigation();

  return (
    <CustomCardNotification>
      <Row align="flex-start" style={{width: '15%'}}>
        <Thumbnail
          newsType={item.status}
          style={{
            backgroundColor:
              item.status === 1
                ? statusColor.green + '40'
                : item.status === 2
                ? statusColor.blue + '40'
                : item.status === 3
                ? statusColor.yellow + '40'
                : item.status === 4
                ? statusColor.red + '40'
                : statusColor.orange + '40',
          }}
        />
      </Row>
      <Row align="flex-start" style={{width: '85%'}}>
        <Text style={{...FONTS.h4}}>{item.message}</Text>
        <Text style={{color: themeLight.captionColor}}>
          {CustomMoment(item.created)}
        </Text>
      </Row>
    </CustomCardNotification>
  );
};
