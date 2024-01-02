import React, {useEffect, useState, FC} from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Text,
  Row,
  Caption,
  Title,
  FadeInView,
  CustomView,
  Subtitle,
  ProfileContainer,
  ProfileImage,
  BadgeVacations,
  FilePicker,
  IconButton,
  SimpleBottomSheet,
  TabsView,
  shadow,
  ProfilePadding,
} from '../../components';
import {invertedGradients, themeLight} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FIcon from 'react-native-vector-icons/AntDesign';
import {LogoutAction} from '../../redux/auth/login/LoginAction';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ContainerNoF} from '../../navigation/options';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import moment from 'moment';
import {str} from '../../locales/Locale';
import {CommonActions} from '@react-navigation/native';
import {BASE_URL_FILES} from '../../constants/.env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendFileAction} from '../../redux/files/SendFileAction';
import {isEmpty} from '../../utils';

const ProfileScreen: FC = (props: any) => {
  const {navigation} = props;
  const [fileModal, setVisibleModal] = useState(false);
  const [preventLogin, setPreventLogin] = useState(false);
  const {user, loading} = useAppSelector(loginSelector);
  const [token, setToken] = useState<string | null>(null);
  const [imgUser, setImgUser] = useState<any>();
  const [file, setFile] = useState<any>(null);
  const dispatch = useAppDispatch();
  console.log(user, 'user aqui');

  useEffect(() => {
    const checkToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    checkToken();
  }, [dispatch]);

  const resetAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );
    dispatch(LogoutAction());
  };

  const functionSaveFile = async (data: any) => {
    setImgUser(data.uri);
    setFile(data.uri);
    if (isEmpty(file)) {
      console.log('error al enviar vacio');
    } else {
      sendFile();
    }
  };

  const sendFile = async () => {
    const resp = await dispatch(sendFileAction(file));
    console.log(resp);
  };

  const FirstRoute = () => {
    return (
      <CustomView style={styles.bottomCard}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingBottom: 75,
            width: '100%',
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                console.log('holiodaydlaksjdf');
              }}
            />
          }
          showsVerticalScrollIndicator={false}>
          <Row fdirection="row" justify="space-between">
            <Title>{str('profileScreen.myProfile')}</Title>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', {user: user})}>
              <Caption style={{color: statusColor.blue}}>
                {str('newsScreen.editOption')}
              </Caption>
            </TouchableOpacity> */}
          </Row>
          <Row align="flex-start" style={{marginVertical: 16}}>
            <Subtitle>{str('profileScreen.user')}</Subtitle>
            <Caption>{user?.username}</Caption>
          </Row>
          <Row align="flex-start" style={{marginBottom: 16}}>
            <Subtitle>{str('profileScreen.bornDate')}</Subtitle>
            <Caption>
              {user?.person?.birthday
                ? user?.person?.birthday
                : str('profileScreen.noEntry')}
            </Caption>
          </Row>
          <Row align="flex-start" style={{marginBottom: 16}}>
            <Subtitle>{str('profileScreen.phone')}</Subtitle>
            <Caption>3313269214</Caption>
          </Row>
          <Row align="flex-start" style={{marginBottom: 16}}>
            <Subtitle>{str('profileScreen.residence')}</Subtitle>
            <Caption>
              {user?.person?.residence
                ? user?.person?.residence
                : str('profileScreen.noEntry')}
            </Caption>
          </Row>
          <Row align="flex-start" style={{marginBottom: 32}}>
            <Subtitle>{str('profileScreen.createdDate')}</Subtitle>
            <Caption>
              {moment(user.created, 'DD/MM/YYYY').format('DD/MM/YYYY')}
            </Caption>
          </Row>
        </ScrollView>
      </CustomView>
    );
  };
  return (
    <ContainerNoF>
      <FadeInView fluid={true}>
        <CustomView colors={invertedGradients} style={styles.main}>
          <IconButton
            onPress={() => navigation.goBack()}
            rounded
            style={{
              top: Platform.OS === 'android' ? 42 : 8,
              left: 16,
              alignItems: 'flex-end',
              position: 'absolute',
              zIndex: 99,
              backgroundColor: 'white',
            }}>
            <FIcon name="arrowleft" size={24} color={themeLight.black} />
          </IconButton>
          <IconButton
            onPress={() => setPreventLogin(true)}
            rounded
            style={{
              top: Platform.OS === 'android' ? 42 : 8,
              right: 16,
              alignItems: 'flex-end',
              position: 'absolute',
              zIndex: 99,
              backgroundColor: 'white',
            }}>
            <Feather name="log-out" size={24} color="#000" />
          </IconButton>
          <Row fdirection="row" style={{marginTop: 24, padding: 18}}>
            <ProfileContainer
              onPress={() => {
                setVisibleModal(true);
              }}
              disabled>
              <ProfilePadding>
                <ProfileImage
                  source={
                    imgUser
                      ? `${BASE_URL_FILES}files/${user.person.idFile}?token=${token}`
                      : require('../../../assets/images/profile-default.jpg')
                  }
                />
              </ProfilePadding>

              {/* Test image Picker */}

              {/* <TouchableOpacity
                onPress={() => setVisibleModal(true)}
                style={styles.btnimage}>
                <FontAwesome
                  name="camera"
                  color={themeLight.primaryLigth}
                  size={12}
                />
              </TouchableOpacity> */}

              {/* end test */}
            </ProfileContainer>
            <Row align="flex-start" style={{width: '65%', paddingLeft: 12}}>
              <Title>{`${user?.person?.name}`}</Title>
              <Caption size="medium">{user?.role?.name}</Caption>
              <Caption>
                {str('profileScreen.employeeNumber')}: {user?.id}
              </Caption>
              <BadgeVacations>
                <Text>
                  {str('profileScreen.daysOfHolidays')}:{' '}
                  {user?.employee
                    ? user?.employee.totalholidays - user?.employee.usedholidays
                    : ''}
                </Text>
              </BadgeVacations>
            </Row>
          </Row>
          <TabsView
            tabs={[
              {key: '1', title: 'Mis datos'},
              {key: '2', title: 'Documentos'},
            ]}
            firstRoute={FirstRoute}
          />
        </CustomView>
        <FilePicker
          onlyImage
          onValue={(file: any) => {
            functionSaveFile(file);
          }}
          visible={fileModal}
          onBack={(value: boolean) => {
            setVisibleModal(value);
          }}
        />
        <Caption style={{position: 'absolute', bottom: 0}} size="medium">
          Version 1.1.0
        </Caption>
      </FadeInView>
      <SimpleBottomSheet
        height={200}
        visible={preventLogin}
        onBack={() => {
          setPreventLogin(false);
        }}>
        <Row>
          <Text>{str('loginScreen.areuSure')}</Text>
        </Row>
        <Button
          onPress={() => resetAction()}
          style={{marginBottom: 8, marginTop: 16}}>
          {str('confirm')}
        </Button>
        <Button
          link
          onPress={() => {
            setPreventLogin(false);
          }}>
          {str('cancel')}
        </Button>
      </SimpleBottomSheet>
    </ContainerNoF>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8FB',
  },
  bottomCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 24,
    ...shadow,
  },
  btnimage: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 8,
    right: 8,
    backgroundColor: themeLight.whiteTransparent,
    width: 34,
    height: 34,
    borderRadius: 50,
  },
});
export default ProfileScreen;
