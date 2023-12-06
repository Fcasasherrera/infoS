import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {
  CustomView,
  SimpleBottomSheet,
  Text,
  AccordionItem,
} from '../components';
import {SIZES} from '../constants/colors';

type approveType = {
  onBack: any;
  visible: boolean;
  statusRequests: Array<any>;
};

export const CollapsibleRequest: FC<approveType> = ({
  onBack,
  statusRequests,
}) => {
  return (
    <CustomView
      style={{
        position: 'absolute',
        bottom: 0,
        padding: SIZES.padding,
        backgroundColor: '#F0F4FC',
        height: 300,
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        width: SIZES.width,
        alignItems: 'center',
      }}>
      <CustomView>
        <Text
          style={{
            marginBottom: 10,
            fontFamily: 'Poppins-Medium',
            fontSize: SIZES.body3,
            lineHeight: 22,
          }}>
          Desglose estatus de solicitud
        </Text>
      </CustomView>
      <ScrollView
        style={{
          marginTop: 12,
          width: '100%',
        }}>
        {statusRequests.length > 0
          ? statusRequests.map(
              (item: any, index: React.Key | null | undefined) => {
                return <AccordionItem data={item} key={index} />;
              },
            )
          : null}
      </ScrollView>
    </CustomView>
  );
};
