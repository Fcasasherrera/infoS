import React, {useState, FC, useEffect} from 'react';
import {str} from '../../locales/Locale';
import {Button} from '../../components/Button';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FadeInView} from '../../components/FadeInView';
import {
  MarkdownEditor,
  applyWrapFormatNewLines,
  applyWrapFormat,
  applyWebLinkFormat,
  applyListFormat,
} from 'react-native-markdown-editor';
import {
  ButtonSmall,
  CustomInput,
  CustomSelect,
  CustomView,
  Row,
  Subtitle,
  Title,
  FilePicker,
  Caption,
  DatePicker,
  Text,
  FileModal,
  ModalSuccess,
  SimpleBottomSheet,
} from '../../components';
import {Alert, Switch} from 'react-native';
import {FONTS, themeLight} from '../../constants/colors';
import {
  getListCommuniquesAPI,
  HideAlert,
  HideSuccessAlert,
  postNewApi,
  updateNewsApi,
} from '../../redux/communiques/CommuniquesAction';
import {communiquesSelector} from '../../redux/communiques/CommuniquesSelector';
import {NewsRequest} from '../../types/news';
import {BASE_URL_FILES, typesCommunicate} from '../../constants/.env';
import {sendFileAction} from '../../redux/files/SendFileAction';
import {
  CustomMoment,
  isEmpty,
  validateForms,
  validateIsEmpty,
} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ContainerNoF} from '../../navigation/options';
import moment from 'moment';

const NewsFormScreen: FC = (props: any) => {
  const {navigation, route} = props;
  const {params} = route;
  // console.log(params);

  const edit = params ? true : false;
  const dispatch = useAppDispatch();
  const {loading, error, success, errorMessage} =
    useAppSelector(communiquesSelector);
  const [enabled, setIsEnabled] = useState(false);
  const [openFileModal, setModalFile] = useState(false);
  const [hasUnsavedChanges, setUnsaved] = useState(false);
  const [first, setEditing] = useState(false);
  const [backModal, setModalBack] = useState(null);

  const [fileModal, setVisibleModal] = useState(false);
  const [file, setFile] = useState<any>({});
  const [fileP, setFileP] = useState(params ? params.item.file_data : {});
  const [token, setToken] = useState<string | null>(null);
  const [form, onChange] = useState({
    title: params ? params.item.title : '',
    body: params ? params.item.body : '',
    type: null,
    typeText: '',
    hasFile: params && params.item.idFile ? true : false,
  });
  useEffect(() => {
    if (params) {
      const foundType = typesCommunicate.find(item => {
        if (item.id == params.item.idType) return item;
      });
      onChange({...form, type: foundType.id, typeText: foundType.title});
    }
  }, [params]);
  useEffect(() => {
    dispatch(getListCommuniquesAPI());
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
  }, []);
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

  const [formP, onChangeP] = useState({
    startDate: new Date().toString(),
    startHour: moment().format('HH:mm'),
  });

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const functionSaveFile = (file: any) => {
    setVisibleModal(false);
    // console.log(file);
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
  const post = async () => {
    let data: NewsRequest = {
      ...form,
    };
    if (enabled) {
      const formatDate = CustomMoment(formP.startDate, 'DD/MM/YY');
      const mergedTime = moment(
        `${formatDate} ${formP.startHour}`,
        'DD/MM/YY hh:mm',
      ).format('YYYY-MM-DD[T]HH:mm:ss');
      // console.log(mergedTime, 'Merged times');
      let timeCron = {startdate: mergedTime};
      data = {
        ...data,
        ...timeCron,
      };
    }
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
          idFile: res?.payload[0].id,
          idThumbnail: isThumbnail,
        };
      }
    }
    if (form.hasFile) {
      data = {
        ...data,
        idThumbnail: params.item.idThumbnail,
        idFile: params.item.idFile,
      };
    }
    const validation = validateForms(data);
    if (!validation.flagEmpty) {
      if (params) {
        await dispatch(updateNewsApi({id: params.item.id, ...data}));
      } else {
        await dispatch(postNewApi(data));
      }
    } else {
      Alert.alert('Por favor llene todos los campos para continuar');
    }
  };
  const doneModal = () => {
    if (success) {
      dispatch(getListCommuniquesAPI());
      dispatch(HideSuccessAlert());
      setUnsaved(false);
      setTimeout(() => {
        navigation.pop();
      }, 300);
    } else {
      dispatch(HideAlert());
    }
  };
  const validate = () => {
    let flag = false;
    flag = validateForms(form).flagEmpty;
    if (enabled) {
      flag = validateForms({...form, ...formP}).flagEmpty;
    }
    return flag;
  };
  useEffect(() => {
    if (first) {
      if (enabled || !isEmpty(file)) {
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
  }, [form, formP, enabled, file]);

  return (
    <ContainerNoF>
      <FadeInView
        isScroll
        contentContainerStyle={{paddingHorizontal: 18}}
        align="flex-start">
        <CustomView style={{marginTop: 8}}>
          <Row align="flex-start">
            <Title>
              {edit
                ? str('noticeFormScreen.titleEdit')
                : str('noticeFormScreen.titleNew')}
            </Title>
            <Caption>{str('noticeFormScreen.caption')}</Caption>
          </Row>
          <CustomView style={{marginTop: 50, marginBottom: 12}}>
            <CustomInput
              marginBottom={'40'}
              label={str('pharafrases.title')}
              placeholder={str('pharafrases.descTitle')}
              value={form.title}
              onChange={(text: string) => {
                onChange({...form, title: text});
              }}
              isLoading={loading}
            />
            <CustomSelect
              marginBottom={'40'}
              label={str('pharafrases.typeNotice')}
              placeholder={str('pharafrases.descTypeNotice')}
              value={form.typeText}
              onChange={(item: any) => {
                onChange({...form, type: item.id, typeText: item.title});
              }}
              isLoading={loading}
              icon
              data={typesCommunicate}
            />
            {/* <CustomInput
              multiline
              label={str('pharafrases.comunicate')}
              placeholder={str('pharafrases.desComunicate')}
              last
              value={form.body}
              onChange={(text: string) => {
                onChange({...form, body: text});
              }}
              isLoading={loading}
            /> */}

            <MarkdownEditor
              label={str('pharafrases.comunicate')}
              placeholder={str('pharafrases.desComunicate')}
              labelStyle={{...FONTS.h4, color: 'black'}}
              onMarkdownChange={(text: string) => {
                onChange({...form, body: text});
              }}
            />
            <Subtitle style={{marginTop: 40}}>
              {str('pharafrases.uploadFile')}
            </Subtitle>
            <Caption>{str('noticeFormScreen.fileUploadDesc')}</Caption>
            <Row fdirection="row" justify="space-between">
              <ButtonSmall
                width="40%"
                iconName="cloud-upload"
                disabled={!isEmpty(file) || form.hasFile}
                isLoading={loading}
                onPress={() => {
                  setVisibleModal(true);
                }}>
                {str('pharafrases.uploadFile')}
              </ButtonSmall>
              {(!isEmpty(file) || form.hasFile) && (
                <Button
                  disabled={loading}
                  style={{backgroundColor: 'transparent', height: 'auto'}}
                  width="60%"
                  onPress={() => {
                    setModalFile(true);
                  }}
                  link>
                  {str('pharafrases.seeFile')}
                </Button>
              )}
            </Row>
            {params === undefined && (
              <Row
                fdirection="row"
                justify="space-between"
                style={{
                  borderTopWidth: 1,
                  marginTop: 32,
                  paddingTop: 24,
                  borderColor: '#D8DCE6',
                }}>
                <Subtitle>
                  {str('noticeFormScreen.schedulePublication')}
                </Subtitle>
                <Row fdirection="row" justify="space-between">
                  <Switch
                    disabled={loading}
                    trackColor={{false: themeLight.inputText, true: '#9ac1d5'}}
                    thumbColor={enabled ? '#0C659A' : 'white'}
                    ios_backgroundColor={themeLight.inputText}
                    style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                    onValueChange={toggleSwitch}
                    value={enabled}
                  />
                </Row>
              </Row>
            )}
            {enabled ? (
              <FadeInView
                show={enabled}
                style={{
                  paddingHorizontal: 0,
                  marginTop: 32,
                }}>
                <DatePicker
                  isLoading={loading}
                  containerStyle={{paddingRight: 8}}
                  label={str('pharafrases.dateOf', {date: 'publicación'})}
                  placeholder={str('newRequests.date')}
                  onChange={(date: string) => {
                    onChangeP({
                      ...formP,
                      startDate: date,
                    });
                  }}
                  value={CustomMoment(formP.startDate, 'L')}
                  marginBottom={'40'}
                />
                <DatePicker
                  isLoading={loading}
                  containerStyle={{paddingRight: 8}}
                  label={str('pharafrases.hourOf', {date: 'publicación'})}
                  placeholder="00:00"
                  onChange={(formatDate: string, date: string) => {
                    onChangeP({
                      ...formP,
                      startHour: formatDate,
                    });
                  }}
                  mode="time"
                  value={formP.startHour}
                />
              </FadeInView>
            ) : null}

            <Button
              style={{marginTop: 40}}
              disabled={validate()}
              isLoading={loading}
              onPress={post}>
              {str(`noticeFormScreen.${edit ? 'editNotice' : 'sendNotice'}`)}
            </Button>
          </CustomView>
          <FilePicker
            onValue={(file: any) => {
              functionSaveFile(file);
            }}
            visible={fileModal}
            onBack={(value: boolean) => {
              setVisibleModal(value);
            }}
          />
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
              setModalFile(false);
            }}
            canDelete
            onDelete={() => {
              setModalFile(false);
              onChange({...form, hasFile: false});
              setFileP({});
            }}
          />
        )}
        {!isEmpty(file) && (
          <FileModal
            typePDF={file?.type === 'application/pdf'}
            url={file?.uri ? file.uri : ''}
            visible={openFileModal}
            onBack={() => {
              setModalFile(false);
            }}
            canDelete
            onDelete={() => {
              setModalFile(false);
              setFile({});
            }}
          />
        )}

        <ModalSuccess
          successIcon={success ? true : false}
          alert
          visible={error || success}
          onBack={doneModal}
          height={success ? '300' : '220'}>
          <CustomView style={{padding: 16}}>
            <Text center style={{...FONTS.h3}}>
              {success
                ? str(
                    `noticeFormScreen.${
                      edit ? 'noticeEditModal' : 'noticeCreatedModal'
                    }.title`,
                  )
                : str('common.ups')}
            </Text>
            <Text center gray style={{marginTop: 8}}>
              {success
                ? str(
                    `noticeFormScreen.${
                      edit ? 'noticeEditModal' : 'noticeCreatedModal'
                    }.subtitle`,
                  )
                : {errorMessage}}
            </Text>
          </CustomView>
          <CustomView>
            <Button
              style={{marginTop: 10}}
              isLoading={loading}
              onPress={doneModal}>
              {str('loginScreen.loginButtonError')}
            </Button>
          </CustomView>
        </ModalSuccess>
        <SimpleBottomSheet
          height={300}
          visible={backModal !== null}
          onBack={() => {
            setModalBack(null);
          }}>
          <Row>
            <Text center style={{...FONTS.h3, lineHeight: 36}}>
              {str(`newsScreen.${edit ? 'editSure' : 'areuSure'}`)}
            </Text>
            <Caption gray center style={{lineHeight: 24}}>
              {str('requestDetail.changes')}
            </Caption>
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
      </FadeInView>
    </ContainerNoF>
  );
};

export default NewsFormScreen;
