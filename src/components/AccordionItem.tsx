import React, {FC, useState} from 'react';
import {str} from '../locales/Locale';
import {List} from 'react-native-paper';
import {View} from 'react-native';
import {statusColors} from '../constants/.env';
import {EnumStatus} from '../types/requests';

type approveType = {
  data: any;
};
const StatusDot: FC<{status: string}> = ({status}) => {
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: 18,
          height: 18,
          borderColor: statusColors[status].color,
        },
      ]}>
      <View
        style={[
          {
            borderRadius: 150,
            width: 12,
            height: 12,
            margin: 1,
            backgroundColor: statusColors[status].color,
          },
        ]}
      />
    </View>
  );
};
export const AccordionItem: FC<approveType> = ({data}) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  let st = EnumStatus[data.status.id];
  // console.log(data);

  return st === 'rejected' ? (
    <List.Accordion
      style={{borderBottomWidth: 1, borderColor: '#D8DCE6'}}
      title={data.person}
      description={str(`requestDetail.requestStatus.${st}`)}
      left={props => <StatusDot status={st} />}
      expanded={expanded}
      onPress={handlePress}>
      <List.Item
        title="Motivo de rechazo"
        description={data.rejected_comments}
      />
    </List.Accordion>
  ) : (
    <List.Item
      style={{borderBottomWidth: 1, borderColor: '#D8DCE6'}}
      title={st !== 'cancelled' ? data.person : data.employee.person.firstname}
      description={str(`requestDetail.requestStatus.${st}`)}
      left={props => <StatusDot status={st} />}
    />
  );
};
