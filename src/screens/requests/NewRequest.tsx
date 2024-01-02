import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  CustomView,
  FadeInView,
  Row,
  Title,
  CustomInput,
  Button,
  Caption,
  CustomSelect,
  DatePicker,
  ButtonSmall,
  Subtitle,
  ModalComponent,
  Text,
  FilePicker,
  ModalSuccess,
  FileModal,
} from '../../components';
import {str} from '../../locales/Locale';
import {requestsSelector} from '../../redux/requests/RequestSelector';
import {
  postRequestsAPI,
  HideErrorRequest,
  HideSuccesRequestAlert,
} from '../../redux/requests/RequestAction';
import {sendFileAction} from '../../redux/files/SendFileAction';
import {typesRequestsCreate} from '../../constants/.env';
import {BodyNewRequest} from '../../types/requests';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import {
  calculateDifferenceWeekDays,
  CustomMoment,
  isEmpty,
  MomentSubAdd,
  validateRequest,
} from '../../utils';
import moment from 'moment';
import {FONTS} from '../../constants/colors';

const NewRequest = (props: any) => {
  const {navigation} = props;
  const [fileModal, setVisibleModal] = useState(false);
  const [openFileModal, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [localLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {loading, errorRequest, errorMessage, success, successMessage} =
    useAppSelector(requestsSelector);
  const [file, setFile] = useState<any>({});
  const {
    user: {idClient},
  } = useAppSelector<any>(loginSelector);

  const {user} = useAppSelector(loginSelector);

  // Funcion para Seleccionar el File PDF/IMG
  const functionSaveFile = (file: any) => {
    setVisibleModal(false);
    if (file.type === 'application/pdf') {
      setFile({
        name: file.name,
        type: file.type,
        uri: file.uri,
        size: file.size,
      });
    } else {
      // const [resp] = file.assets;
      setFile({
        name: file.fileName,
        type: file.type,
        uri: file.uri,
        size: file.fileSize,
      });
    }
  };

  const [form, setForm] = useState({
    typeRequest: null,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    minimumEndDate: new Date().toString(),
    minimumStartDate: new Date().toString(),
    comments: '',
    id: '',
  });

  const post = async () => {
    setIsLoading(true);
    let data: BodyNewRequest = {
      comments: form.comments,
      type: parseInt(form.id, 10),
      additional_info: {
        idClient,
      },
    };
    const dates = {
      days: calculateDifferenceWeekDays(form.startDate, form.endDate),
      startdate: form.startDate,
      enddate: form.endDate,
    };

    if (form.id === '1') {
      data = {...data, additional_info: {...dates, idClient}};
      // console.log(data);

      await dispatch(postRequestsAPI(data));
      setIsLoading(false);
      return;
    } else {
      // Cuando se va a enviar imagen, ejecutar esta funcion
      // Funcion para enviar el File a la BD
      if (!isEmpty(file)) {
        const res = await dispatch(sendFileAction(file));
        if (res.payload !== null) {
          let isThumbnail;

          res.payload.forEach((element: any) => {
            if (element.isthumbnail === 1) {
              isThumbnail = element.id;
            }
          });
          data = {
            ...data,
            additional_info: {
              ...data.additional_info,
              idFile: res?.payload[0].id,
              idThumbnail: isThumbnail,
            },
          };
        }
      }

      if (form.id === '2') {
        data = {...data, additional_info: {...data.additional_info, ...dates}};
      }
      // console.log(data, 'data');

      await dispatch(postRequestsAPI(data));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (form.id === '2') {
      const newMinimun = moment(
        MomentSubAdd(form.startDate, '-', 10),
        'MMMM D, YYYY',
      );

      setForm({
        ...form,
        minimumStartDate: newMinimun.toISOString(),
        minimumEndDate: newMinimun.toISOString(),
      });
    } else {
      setForm({...form, minimumStartDate: new Date().toString()});
    }
    if (form.typeRequest && form.id === '1') {
      if (user?.employee.totalholidays - user?.employee.usedholidays === 0) {
        setDisabled(true);
        return;
      } else {
        setDisabled(false);
        return;
      }
    }
    setDisabled(false);
  }, [form.typeRequest]);

  return (
    <FadeInView
      isScroll
      contentContainerStyle={{paddingHorizontal: 18}}
      align="flex-start">
      <Row
        style={{width: '100%', marginTop: 8}}
        align="flex-start"
        justify="flex-start">
        <Title>{str('newRequests.title')}</Title>
        <Caption style={{marginBottom: 5}}>
          {str('newRequests.enterData')}
        </Caption>
        {form.id === '1' && (
          <Text style={{marginBottom: 10}} size="small">
            {str('newRequests.availableDays')}{' '}
            {user?.employee
              ? user?.employee.totalholidays - user?.employee.usedholidays
              : ''}
          </Text>
        )}
      </Row>
      <CustomSelect
        // isLoading={loading || localLoading}
        marginBottom={'40'}
        label={str('requestsScreens.type')}
        placeholder={str('requestsScreens.requestType')}
        value={form.typeRequest}
        onChange={(item: any) => {
          setForm({...form, typeRequest: item.title, id: item.id});
        }}
        capitalize
        icon
        data={typesRequestsCreate}
      />
      <Row fdirection="row" justify="space-between" align="center">
        {form.id !== '3' && (
          <>
            <DatePicker
              isLoading={loading || localLoading}
              containerStyle={{paddingRight: 8}}
              width="50"
              label={str('newRequests.start')}
              placeholder={str('newRequests.date')}
              onChange={(date: string, dateUnformat: any) => {
                setForm({
                  ...form,
                  startDate: date,
                  minimumEndDate: dateUnformat.toString(),
                });
              }}
              minimumDate={form.minimumStartDate}
              value={CustomMoment(form.startDate, 'L')}
            />
            <DatePicker
              width="50"
              isLoading={loading || localLoading}
              label={str('newRequests.end')}
              placeholder={str('newRequests.date')}
              onChange={(date: string) => {
                setForm({...form, endDate: date});
              }}
              minimumDate={form.minimumEndDate}
              value={CustomMoment(form.endDate, 'L')}
            />
          </>
        )}
      </Row>
      <CustomInput
        hasLimit
        maxLength={350}
        multiline
        style={{height: 111}}
        label={str('newRequests.comments')}
        placeholder={str('newRequests.describe')}
        value={form.comments}
        onChange={(text: string) => {
          setForm({...form, comments: text});
        }}
        isLoading={loading || localLoading}
      />
      {form.id !== '1' && (
        <>
          {form.id === '2' && (
            <>
              <Subtitle style={{marginTop: 10}}>
                {str('newRequests.uploadFile')}
              </Subtitle>
              <Caption>{str('newRequests.fileDetails')}</Caption>
            </>
          )}
          {form.id === '3' && (
            <>
              <Subtitle style={{marginTop: 10}}>
                {str('newRequests.uploadOther')}
              </Subtitle>
              <Caption>{str('newRequests.fileDetails')}</Caption>
            </>
          )}
          <Row fdirection="row" justify="space-between">
            <ButtonSmall
              width="40%"
              accent
              iconName="cloud-upload"
              disabled={!isEmpty(file) || form.typeRequest === null}
              isLoading={loading}
              onPress={() => {
                setVisibleModal(true);
                setFile({});
              }}>
              {str('pharafrases.uploadFile')}
            </ButtonSmall>
            {!isEmpty(file) && (
              <Button
                disabled={loading || localLoading}
                style={{backgroundColor: 'transparent', height: 'auto'}}
                width="60%"
                onPress={() => {
                  setIsOpen(true);
                }}
                link>
                {str('pharafrases.seeFile')}
              </Button>
            )}
          </Row>
        </>
      )}
      {/*  */}
      <Button
        style={{marginTop: 20}}
        isLoading={loading || localLoading}
        onPress={post}
        disabled={
          validateRequest(form, form.id, disabled, file) ||
          form.typeRequest === null
        }>
        {str('newRequests.send')}
      </Button>
      <FilePicker
        onValue={(filedata: any) => functionSaveFile(filedata)}
        visible={fileModal}
        onBack={(value: boolean) => {
          setVisibleModal(value);
        }}
      />
      <FileModal
        typePDF={file.type === 'application/pdf' ? true : false}
        url={file.uri}
        visible={openFileModal}
        onBack={() => {
          setIsOpen(false);
        }}
        canDelete
        onDelete={() => {
          setIsOpen(false);
          setFile({});
        }}
      />

      <ModalComponent
        alert
        visible={errorRequest}
        onBack={() => {
          dispatch(HideErrorRequest());
        }}
        height={'220'}>
        <CustomView style={{padding: 16}}>
          <Text center style={{...FONTS.h3, lineHeight: 36}}>
            {str('common.ups')}
          </Text>
          <Caption gray center style={{lineHeight: 24}}>
            {errorMessage}
          </Caption>
        </CustomView>
        <CustomView>
          <Button
            style={{marginTop: 10}}
            isLoading={loading || localLoading}
            onPress={() => {
              dispatch(HideErrorRequest());
            }}>
            {str('loginScreen.loginButtonError')}
          </Button>
        </CustomView>
      </ModalComponent>

      <ModalSuccess
        alert
        visible={success}
        onBack={() => {
          dispatch(HideSuccesRequestAlert());
        }}
        height={'220'}>
        <CustomView style={{padding: 16}}>
          <Text
            style={{
              marginTop: 5,
            }}>
            {successMessage}
          </Text>
        </CustomView>
        <CustomView>
          <Button
            style={{marginTop: 5}}
            isLoading={loading || localLoading}
            onPress={() => {
              dispatch(HideSuccesRequestAlert());
              navigation.pop();
            }}>
            {str('loginScreen.loginButtonError')}
          </Button>
        </CustomView>
      </ModalSuccess>
    </FadeInView>
  );
};

export default NewRequest;
