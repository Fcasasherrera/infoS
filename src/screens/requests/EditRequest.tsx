import React, {useState, useEffect} from 'react';
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
  FilePicker,
  FileModal,
  RequestModal,
  SimpleBottomSheet,
  Text,
  ModalSuccess,
} from '../../components';
import {str} from '../../locales/Locale';
import {requestsSelector} from '../../redux/requests/RequestSelector';
import {BASE_URL_FILES, typesRequests} from '../../constants/.env';
import {BodyNewRequest} from '../../types/requests';
import {
  createUrlParamsByObject,
  CustomMoment,
  isEmpty,
  validateForms,
  validateIsEmpty,
} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {calculateDifferenceWeekDays} from '../../utils/Utils';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import {sendFileAction} from '../../redux/files/SendFileAction';
import {
  getRequestsAPI,
  ToggleDeleteModal,
  updateRequestApi,
} from '../../redux/requests/RequestAction';
import {Alert} from 'react-native';
import {FONTS} from '../../constants/colors';

const EditRequest = (props: any) => {
  const {navigation, route} = props;
  const {
    params: {item, index},
  } = route;

  const [file, setFile] = useState<any>({});
  const [fileP, setFileP] = useState(
    item ? item.additional_info.file_data : {},
  );
  const [token, setToken] = useState<string | null>(null);
  const [openFileModal, setIsOpen] = useState(false);
  const [fileModal, setVisibleModal] = useState(false);
  const {loading, deleteModal, activeTab, error, errorMessage} =
    useAppSelector(requestsSelector);
  const [hasUnsavedChanges, setUnsaved] = useState(false);
  const [first, setEditing] = useState(false);
  const [backModal, setModalBack] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [localLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {
    user: {idClient},
  } = useAppSelector<any>(loginSelector);
  const [form, setForm] = useState({
    typeRequest: null,
    startDate: item.additional_info.startdate
      ? item.additional_info.startdate
      : '',
    endDate: item.additional_info.enddate ? item.additional_info.enddate : '',
    minimumEndDate: item.additional_info.startdate
      ? item.additional_info.startdate
      : '',
    comments: item.comments !== undefined ? item.comments : '',
    id: '',
    hasFile: item && item.additional_info.idFile ? true : false,
  });
  useEffect(() => {
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
  }, []);
  // console.log(fileP);

  useEffect(() => {
    if (item) {
      const foundType = typesRequests.find(item2 => {
        if (item2.id == item.idRequestType) return item2;
      });
      setForm({...form, id: foundType.id, typeRequest: foundType.title});
    }
  }, [item]);

  useEffect(() => {
    if (hasUnsavedChanges === true) {
      setUnsaved(false);
    }
  }, [deleteModal]);

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

  const patch = async () => {
    let data: BodyNewRequest = {
      id: item.id,
      comments: form.comments,
      type: parseInt(form.id, 10),
      additional_info: {
        days: calculateDifferenceWeekDays(form.startDate, form.endDate),
        startdate: form.startDate,
        enddate: form.endDate,
        idClient,
      },
    };
    if (!isEmpty(file)) {
      const response = await dispatch(sendFileAction(file));
      if (response.payload !== null) {
        let isThumbnail;
        response.payload.forEach((element: any) => {
          if (element.isthumbnail === 1) {
            isThumbnail = element.id;
          }
        });
        data = {
          ...data,
          additional_info: {
            ...data.additional_info,
            idFile: response?.payload[0].id,
            idThumbnail: isThumbnail,
          },
        };
      }
    }
    if (form.hasFile) {
      data = {
        ...data,
        additional_info: {
          ...data.additional_info,
          idThumbnail: item.additional_info.idThumbnail,
          idFile: item.additional_info.idFile,
        },
      };
    }
    console.log(data);
    const validation = validateForms(data);
    if (!validation.flagEmpty) {
      const result: any = await dispatch(updateRequestApi(data));
      if (result.payload) {
        done();
      }
    } else {
      // console.log(validation);
      Alert.alert('Por favor llene todos los campos para continuar');
    }
  };
  const done = () => {
    if (error) {
      setSuccessModal(false);
      setIsLoading(false);
    } else {
      setSuccessModal(true);
    }
  };

  const doneModal = () => {
    const urlParams: any = new URLSearchParams();
    urlParams.append('employee', 'True');
    dispatch(getRequestsAPI(urlParams));
    setSuccessModal(false);
    setUnsaved(false);
    setTimeout(() => {
      navigation.pop(2);
    }, 300);
  };

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        if (!hasUnsavedChanges) {
          return;
        }
        e.preventDefault();
        setModalBack(e.data.action);
      }),
    [navigation, hasUnsavedChanges],
  );

  useEffect(() => {
    if (first) {
      if (!isEmpty(file)) {
        setUnsaved(true);
      } else {
        if (validateIsEmpty(form)) {
          setUnsaved(false);
        } else {
          setUnsaved(true);
        }
      }
    } else {
      setEditing(true);
    }
  }, [form, setForm, file]);

  return (
    <FadeInView
      isScroll
      contentContainerStyle={{paddingHorizontal: 18}}
      align="flex-start">
      <Row
        style={{width: '100%', marginTop: 10}}
        align="flex-start"
        justify="flex-start">
        <Title style={{...FONTS.h3, marginTop: 10}}>
          {str('editRequest.title')}
        </Title>
        <Caption size="small" gray style={{marginBottom: 20}}>
          {str('newRequests.enterData')}
        </Caption>
      </Row>
      <CustomSelect
        marginBottom={'40'}
        label={str('requestsScreens.type')}
        placeholder={str('requestsScreens.requestType')}
        value={form.typeRequest}
        onChange={(item: any) => {
          setForm({...form, typeRequest: item.title, id: item.id});
        }}
        icon
        data={typesRequests}
        disabled
      />
      <Row fdirection="row" justify="space-between" align="center">
        {form.id !== '3' && (
          <>
            <DatePicker
              isLoading={loading}
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
              value={CustomMoment(form.startDate, 'L')}
            />
            <DatePicker
              isLoading={loading}
              width="50"
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
        isLoading={loading}
      />

      {item.additional_info.file_data !== null && (
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
              iconName="cloud-upload"
              disabled={!isEmpty(file) || form.hasFile}
              isLoading={loading}
              onPress={() => setVisibleModal(true)}>
              {str('pharafrases.uploadFile')}
            </ButtonSmall>
            {!isEmpty(file) || form.hasFile ? (
              <Button
                disabled={loading}
                style={{backgroundColor: 'transparent', height: 'auto'}}
                width={'50%'}
                onPress={() => setIsOpen(true)}
                link>
                {str('pharafrases.seeFile')}
              </Button>
            ) : null}
          </Row>
        </>
      )}

      <Button style={{marginTop: 16}} isLoading={loading} onPress={patch}>
        {str('editRequest.saveRequest')}
      </Button>
      <FilePicker
        onValue={(file: any) => {
          functionSaveFile(file);
        }}
        visible={fileModal}
        onBack={(value: boolean) => {
          setVisibleModal(value);
        }}
      />
      <CustomView style={{padding: 16, alignsSelf: 'center'}}>
        <SimpleBottomSheet
          height={300}
          visible={backModal !== null}
          onBack={() => {
            setEditing(true);
            false;
          }}>
          <Row>
            <Text center style={{...FONTS.h3, lineHeight: 36}}>
              {str('editRequest.areuSure')}
            </Text>
          </Row>
          <Button
            onPress={() => {
              setUnsaved(false);
              navigation.dispatch(backModal);
            }}
            style={{marginBottom: 8, marginTop: 30}}>
            {str('exit')}
          </Button>
          <Button
            link
            onPress={() => {
              setModalBack(null);
            }}>
            {str('cancel')}
          </Button>
        </SimpleBottomSheet>
      </CustomView>
      {form.hasFile && (
        <FileModal
          typePDF={fileP?.type === 'application/pdf'}
          url={
            fileP?.url
              ? `${BASE_URL_FILES}files/${fileP.id}?token=${token}`
              : ''
          }
          visible={openFileModal}
          onBack={() => {
            setIsOpen(false);
          }}
          canDelete
          onDelete={() => {
            setIsOpen(false);
            setForm({...form, hasFile: false});
            setFileP({});
            setFile({});
          }}
        />
      )}
      {!isEmpty(file) && (
        <FileModal
          typePDF={file?.type === 'application/pdf'}
          url={file?.uri ? file.uri : ''}
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
      )}

      <RequestModal
        item={item}
        deleteModalF={deleteModal}
        onAction={() => {
          dispatch(ToggleDeleteModal());
          const urlParams = createUrlParamsByObject({
            employee: 'True',
            status: '1,2,3,4,5',
            type: '1,2,3',
          });
          dispatch(getRequestsAPI(urlParams));
          navigation.pop(2, 3);
        }}
        onBack={() => {
          dispatch(ToggleDeleteModal());
        }}
      />
      <ModalSuccess
        successIcon={successModal ? true : false}
        alert
        visible={error || successModal}
        onBack={doneModal}
        height={successModal ? '300' : '220'}>
        <CustomView style={{padding: 16}}>
          <Text center style={{...FONTS.h3}}>
            {successModal
              ? str('reduceAlert.requestSucces')
              : str('common.ups')}
          </Text>
          <Text center gray style={{marginTop: 8}}>
            {successModal ? str('newRequests.notify') : {errorMessage}}
          </Text>
        </CustomView>
        <CustomView>
          <Button
            style={{marginTop: 10}}
            isLoading={loading || localLoading}
            onPress={doneModal}>
            {str('loginScreen.loginButtonError')}
          </Button>
        </CustomView>
      </ModalSuccess>
    </FadeInView>
  );
};

export default EditRequest;
