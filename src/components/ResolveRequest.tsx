import React, {FC, useState} from 'react';
import {CustomView, Title, Button, CustomInput} from '../components';
import {FONTS, SIZES} from '../constants/colors';
import {str} from '../locales/Locale';
import {useAppDispatch} from '../redux/hooks';
import {
  getRequestsAPI,
  resolveRequestAPI,
} from '../redux/requests/RequestAction';
import {createUrlParamsByObject} from '../utils';

type resolveType = {
  idRequest: number;
  onDone: any;
  filters?: any;
};
export const ResolveRequest: FC<resolveType> = ({
  idRequest,
  onDone,
  filters,
}) => {
  const [form, onChange] = useState({
    id: idRequest,
    idRequestStatus: '5',
    status_comments: '',
  });
  const dispatch = useAppDispatch();
  const resolve = async () => {
    const data = {
      id: form.id,
      idRequestStatus: parseInt(form.idRequestStatus),
      status_comments: form.status_comments,
    };
    const res = await dispatch(resolveRequestAPI(data));
    //console.log(data);

    if (res.payload) {
      const urlParams = createUrlParamsByObject(filters);
      dispatch(getRequestsAPI(urlParams));
      onDone();
    }
    // console.log(res);
  };

  return (
    <>
      <CustomView
        align="center"
        justify="center"
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#F0F4FC',
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          padding: SIZES.padding,
          width: SIZES.width,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomView>
          <Title style={{...FONTS.h4, marginBottom: 10}}>
            {str('requestDetail.solveComments')}
          </Title>
          <CustomInput
            multiline
            label={str('requestDetail.writeComments')}
            placeholder={str('requestDetail.here')}
            last
            value={form.status_comments}
            onChange={(text: string) => {
              onChange({...form, status_comments: text});
            }}
          />
        </CustomView>
        <Button
          style={{color: 'red'}}
          onPress={resolve}
          style={{
            marginTop: 30,
          }}>
          {str('pharafrases.resolveRequest')}
        </Button>
      </CustomView>
    </>
  );
};
