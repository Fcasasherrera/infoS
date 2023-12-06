import React, {useState, FC, useEffect} from 'react';
import {str} from '../../locales/Locale';
import {Button} from '../../components/Button';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FadeInView} from '../../components/FadeInView';

import {
  CustomInput,
  CustomView,
  Row,
  Title,
  FilePicker,
  Caption,
  DatePicker,
  ModalComponent,
  Text,
  SimpleBottomSheet,
} from '../../components';
import {
  getListCommuniquesAPI,
  HideAlert,
} from '../../redux/communiques/CommuniquesAction';
import {communiquesSelector} from '../../redux/communiques/CommuniquesSelector';
import {NewUserData} from '../../types/news';
import {ContainerNoF} from '../../navigation/options';
import moment from 'moment';
import {EditProfile} from '../../redux/auth/profile/EditProfileAction';
import {FONTS} from '../../constants/colors';
import {TouchableOpacity} from 'react-native';

const ProfileForm: FC = (params: any, props: any) => {
  const {navigation} = props;
  const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
  const dispacth = useAppDispatch();
  const {loading, error, errorMessage} = useAppSelector(communiquesSelector);
  // const {user} = useAppSelector(loginSelector);

  const {route} = params;
  const {user} = route.params;

  const [enabled, setIsEnabled] = useState(false);
  const [requestAccessModal, setRequestAccess] = useState(false);
  const [fileModal, setVisibleModal] = useState(false);
  const [file, setFile] = useState(null);
  const [form, onChange] = useState({
    residence: '',
    phone: '',
  });
  const [formP, onChangeP] = useState({
    startDate: '',
    startHour: '',
    endDate: formatYmd(new Date()),
  });

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  const post = async () => {
    let data: NewUserData = {
      ...form,
    };
    if (enabled) {
      data = {
        ...data,
        // ...formP,
      };
    }
    // if (file) {
    //   data = {
    //     ...data,
    //     idFile: 1,
    //     idThumbnail: 1,
    //   };
    // }
    // console.log(data);
    const result = await dispacth(EditProfile(data));
    if (result.payload) {
      dispacth(getListCommuniquesAPI());
      navigation.pop();
    }
  };

  return (
    <ContainerNoF>
      <FadeInView
        isScroll
        contentContainerStyle={{paddingHorizontal: 18}}
        align="flex-start">
        <CustomView style={{marginTop: 8}}>
          <Row align="flex-start">
            <Title>{str('profileScreen.editProfile')}</Title>
            <Caption>{str('profileScreen.descEdit')}</Caption>
          </Row>
          <CustomView style={{marginTop: 50, marginBottom: 12}}>
            <CustomInput
              marginBottom={'40'}
              label={str('profileScreen.residence')}
              placeholder={'Ciudad de México, México'}
              value={form.residence}
              onChange={(text: string) => {
                onChange({...form, residence: text});
              }}
              isLoading={loading}
            />
            <CustomInput
              marginBottom={'40'}
              label={str('profileScreen.phone')}
              placeholder={user.employee.phone}
              value={form.phone}
              onChange={(text: string) => {
                onChange({...form, phone: text});
              }}
              isLoading={loading}
            />
            <TouchableOpacity
              onPress={() => {
                setRequestAccess(true);
              }}>
              <CustomInput
                marginBottom={'40'}
                label={str('profileScreen.name')}
                placeholder={'Name Lastname'}
                disabled={true}
                value={`${user.person.firstname} ${user.person.lastname}`}
                // onChange={(text: string) => {
                //   onChange({...form, residence: text});
                // }}
                isLoading={loading}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestAccess(true);
              }}>
              <CustomInput
                marginBottom={'40'}
                label={str('profileScreen.position')}
                placeholder={'Worker'}
                value={user.role.name}
                disabled={true}
                // onChange={(text: string) => {
                //   onChange({...form, residence: text});
                // }}
                isLoading={loading}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestAccess(true);
              }}>
              <CustomInput
                marginBottom={'40'}
                label={str('profileScreen.email')}
                placeholder={'example@gmail.com'}
                disabled={true}
                value={user.username}
                // onChange={(text: string) => {
                //   onChange({...form, residence: text});
                // }}
                isLoading={loading}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestAccess(true);
              }}>
              <DatePicker
                containerStyle={{paddingRight: 8}}
                label={str('profileScreen.bornDate', {date: 'nacimiento'})}
                placeholder={'06/12/1990'}
                disabled={true}
                onChange={(date: string) => {
                  onChangeP({
                    ...formP,
                    startDate: date,
                  });
                }}
                value={
                  user.person.birthday
                    ? moment(user.person.birthday).format('DD/MM/YYYY')
                    : '10/10/2020'
                }
                marginBottom={'40'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestAccess(true);
              }}>
              <DatePicker
                containerStyle={{paddingRight: 8}}
                label={str('profileScreen.createdDate', {date: 'admission'})}
                disabled={true}
                placeholder={'06/12/1990'}
                onChange={(date: string) => {
                  onChangeP({
                    ...formP,
                    startDate: date,
                  });
                }}
                value={moment(user.employee.admissiondate).format('DD/MM/YYYY')}
                marginBottom={'40'}
              />
            </TouchableOpacity>

            <Button style={{marginTop: 40}} isLoading={loading} onPress={post}>
              Guardar cambios
            </Button>
          </CustomView>
          <FilePicker
            onValue={(file: any) => {
              setVisibleModal(false);
              setFile(file);
            }}
            visible={fileModal}
            onBack={(value: boolean) => {
              setVisibleModal(value);
            }}
          />
        </CustomView>
        <ModalComponent
          alert
          visible={error}
          onBack={() => {
            dispacth(HideAlert());
          }}
          height={'220'}>
          <CustomView style={{padding: 16}}>
            <Title size="medium">{str('common.ups')}</Title>
            <Text style={{marginTop: 8}}>{errorMessage}</Text>
          </CustomView>
          <CustomView>
            <Button
              style={{marginTop: 10}}
              isLoading={loading}
              onPress={() => {
                dispacth(HideAlert());
              }}>
              {str('loginScreen.loginButtonError')}
            </Button>
          </CustomView>
        </ModalComponent>
        <SimpleBottomSheet
          visible={requestAccessModal}
          height={300}
          onBack={() => {
            setRequestAccess(false);
          }}>
          <Row justify="center" align="center" style={{marginBottom: 8}}>
            <Text center style={{...FONTS.h3, lineHeight: 36}}>
              {str('requestAccess.title')}
            </Text>
            <Caption gray center style={{lineHeight: 24}}>
              {str('requestAccess.caption')}
            </Caption>
          </Row>
          <Button
            onPress={() => {
              setRequestAccess(false);
            }}
            style={{marginTop: 30}}>
            {str('confirm')}
          </Button>
          <Button
            outline
            secondary
            onPress={() => {
              setRequestAccess(false);
            }}>
            {str('cancel')}
          </Button>
        </SimpleBottomSheet>
      </FadeInView>
    </ContainerNoF>
  );
};

export default ProfileForm;
