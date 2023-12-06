import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import Trash_icon from '../../../assets/icons_svg/trash_icon';
import {
  FadeInView,
  Row,
  Button,
  ButtonArrow,
  RequestInfo,
  RequestType,
  FileModal,
  RequestModal,
  CollapsibleRequest,
} from '../../components';
import {BASE_URL_FILES} from '../../constants/.env';
import {str} from '../../locales/Locale';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getStatusAccountable} from '../../redux/requests/RequestAction';
import {requestsSelector} from '../../redux/requests/RequestSelector';
import {CustomMoment, validateHasTab, validateUser} from '../../utils';

const RequestDetail: FC = (params: any) => {
  const {route} = params;
  const {item, filters, index, statusCard} = route.params;

  const navigation: any = useNavigation();
  const [deleteModalF, setDeleteModalF] = useState<boolean>(false);
  const [itemSel, setSelected] = useState<any>({});
  const [openFileModal, setIsOpen] = useState(false);
  const [openStatus, setStatusModal] = useState(false);

  const [fileP] = useState(
    item.additional_info !== null ? item.additional_info.file_data : {},
  );
  const [token, setToken] = useState<string | null>(null);
  const {user} = useAppSelector(loginSelector);
  const {activeTab, statusRequests} = useAppSelector(requestsSelector);
  const {role} = user;
  const userRole = validateUser(role.name) ? false : true;
  const dispatch = useAppDispatch();
  const requestStatus = !userRole
    ? activeTab === 1
      ? item.status_of_accountable
      : item.idRequestStatus
    : item.idRequestStatus;
  const requestStatusGeneral = item.idRequestStatus;
  const showHideStatusRequest = () => {
    if (requestStatusGeneral === 4 && validateHasTab(role.name)) {
      return true;
    } else if (
      validateHasTab(role.name) &&
      statusCard.key !== 'pending' &&
      item.idRequestType === 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
    if (showHideStatusRequest()) {
      dispatch(getStatusAccountable(item.id));
    }
  }, []);

  return (
    <>
      <Row justify="space-between" style={{height: '100%', width: '100%'}}>
        <Row style={{flex: 1, width: '100%'}}>
          <FadeInView
            isScroll
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            style={{width: '100%'}}
            align="flex-start"
            justify="flex-start">
            <Row
              fdirection="row"
              justify="space-between"
              style={{marginTop: 16}}>
              <ButtonArrow onPress={navigation.goBack} />
              {item.status_of_accountable === 1 &&
                user?.id === item.idEmployee && (
                  <Trash_icon
                    size={24}
                    color="#061822"
                    onPress={(
                      value: boolean | ((prevState: boolean) => boolean),
                    ) => {
                      setDeleteModalF(value);
                      setSelected(item);
                    }}
                  />
                )}
            </Row>

            <RequestType
              idRequestType={item.idRequestType}
              statusCard={statusCard}
            />

            <RequestInfo
              style={{width: '100%'}}
              title={str('requestDetail.requester')}
              caption={
                item.employee.person.firstname +
                ' ' +
                item.employee.person.lastname
              }
            />

            {validateUser(role.name) ? (
              <RequestInfo
                title={str('requestDetail.createdDate')}
                caption={CustomMoment(item.created)}
              />
            ) : null}

            {item.idRequestType !== 3 && (
              <>
                <Row fdirection="row" align="center" style={{width: '100%'}}>
                  <RequestInfo
                    title={str('requestDetail.startDate')}
                    style={{width: '50%'}}
                    caption={CustomMoment(item.additional_info?.startdate)}
                  />
                  <RequestInfo
                    title={str('requestDetail.endDate')}
                    style={{width: '50%'}}
                    caption={CustomMoment(item.additional_info?.enddate)}
                  />
                </Row>
                <Row fdirection="row">
                  <RequestInfo
                    row
                    title={str('requestDetail.daysRequested') + ': '}
                    style={{width: item.idRequestType === 1 ? '50%' : '100%'}}
                    captionStyle={{alignSelf: 'center'}}
                    caption={item.additional_info?.days}
                  />
                  {item.idRequestType === 1 && (
                    <RequestInfo
                      row
                      title={str('requestDetail.daysRemaining') + ': '}
                      style={{width: '50%'}}
                      captionStyle={{alignSelf: 'center'}}
                      caption={
                        item.employee
                          ? item.employee.totalholidays -
                            item.employee.usedholidays
                          : ''
                      }
                    />
                  )}
                </Row>
              </>
            )}

            <RequestInfo
              title={str('requestDetail.comments') + ':'}
              caption={item.comments}
            />
            {requestStatus === 3 && (
              <RequestInfo
                title={str('requestDetail.rejectedcomm') + ':'}
                captionArr={item.rejected_comments}
              />
            )}
            {requestStatus === 5 && (
              <RequestInfo
                title={str('requestDetail.comments') + ':'}
                captionArr={item.attended_comments}
              />
            )}
            {item.idRequestType !== 1 && (
              <Button onPress={() => setIsOpen(true)} link>
                {str('pharafrases.seeFile')}
              </Button>
            )}
            {user?.id === item.idEmployee &&
              requestStatus === 1 &&
              requestStatusGeneral !== 4 && (
                <Button
                  onPress={() =>
                    navigation.navigate('EditRequest', {item, index})
                  }>
                  {str('requestDetail.requestDetailButton')}
                </Button>
              )}
          </FadeInView>
        </Row>
        <Row style={{width: '100%'}}>
          {showHideStatusRequest() && (
            <CollapsibleRequest
              visible={openStatus}
              statusRequests={statusRequests}
              onBack={() => {
                setStatusModal(false);
              }}
            />
          )}
        </Row>
      </Row>
      <RequestModal
        item={itemSel}
        deleteModalF={deleteModalF}
        onBack={() => {
          setDeleteModalF(false);
          navigation.pop(1);
        }}
      />
      <FileModal
        typePDF={fileP?.type === 'application/pdf'}
        url={
          fileP?.url ? `${BASE_URL_FILES}files/${fileP.id}?token=${token}` : ''
        }
        visible={openFileModal}
        onBack={() => {
          setIsOpen(false);
        }}
        onDelete={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};
export default RequestDetail;
