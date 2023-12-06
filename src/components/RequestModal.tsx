import React from 'react';
import {useAppDispatch} from '../redux/hooks';
import {SimpleBottomSheet, Button, Caption, Text} from '../components';
import {str} from '../locales/Locale';
import {Row} from './Containers';
import {deleteRequest, getRequestsAPI} from '../redux/requests/RequestAction';
import {FONTS} from '../constants/colors';

export const RequestModal: React.FC<{
  item: any;
  deleteModalF: boolean;
  onBack: any;
  onAction?: any;
}> = ({item, deleteModalF, onBack, onAction}) => {
  const dispatch = useAppDispatch();
  const deleteF = async () => {
    const res = await dispatch(deleteRequest(item.id));
    if (res.payload) {
      const urlParams: any = new URLSearchParams();
      urlParams.append('employee', 'True');
      dispatch(getRequestsAPI(urlParams));
      onAction();
    }
  };
  return (
    <SimpleBottomSheet visible={deleteModalF} height={300} onBack={onBack}>
      <Row justify="center" align="center" style={{marginBottom: 8}}>
        <Text center style={{...FONTS.h3, lineHeight: 36}}>
          {str('requestDetail.delete')}
        </Text>
        <Caption gray center style={{lineHeight: 24}}>
          {str('requestDetail.deleteDesc')}
        </Caption>
      </Row>
      <Button onPress={deleteF} style={{marginTop: 30}}>
        {str('confirm')}
      </Button>
      <Button outline secondary onPress={onBack}>
        {str('cancel')}
      </Button>
    </SimpleBottomSheet>
  );
};
