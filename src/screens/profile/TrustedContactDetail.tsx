import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Row,
  Text,
  TrustedContactsCard,
  TrustedContactsContainer,
  ButtonSmall,
  FadeInView,
  CustomView,
  ProfileContainer,
  ProfilePadding,
  ProfileImage,
  Title,
  Caption,
  Subtitle,
  Hr,
} from '../../components';
import {FONTS, themeLight} from '../../constants/colors';
import {useAppDispatch} from '../../redux/hooks';
import {
  deleteContact,
  getContact,
} from '../../redux/trustedContacts/TrustedActions';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MarkerIcon from '../../../assets/icons_svg/marker_icon';
import CopyIcon from '../../../assets/icons_svg/copy_icon';

const TrustedContactDetail: FC = (params: any) => {
  const {route, navigation} = params;
  const {id, img, name, position, address, phone, email, kinship} =
    route.params;
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteContact(id));
    dispatch(getContact());
    navigation.pop();
  };
  // console.log(item);
  const callContact = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <FadeInView>
      <CustomView style={styles.main}>
        <Row style={styles.personContainer}>
          {img !== '' && (
            <ProfileContainer disabled>
              <ProfileImage source={{uri: img}} />
            </ProfileContainer>
          )}

          <Row style={{marginTop: 12, paddingHorizontal: 18}}>
            <Subtitle style={{...FONTS.h3}}>{name}</Subtitle>

            <Caption style={{marginTop: 8, marginBottom: 12}} size="medium">
              {position ? position : kinship}
            </Caption>
          </Row>
        </Row>
        <Row style={{width: '100%', marginTop: 16}}>
          {address !== '' ? (
            <TouchableOpacity style={styles.item}>
              <MarkerIcon color="black" size={24} />
              <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 14}}>
                <Text size="medium" bold style={{textAlign: 'left'}}>
                  {address}
                </Text>
              </View>
              <View />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => callContact(`tel:${phone}`)}
            style={styles.item}>
            <Feather name={'phone'} size={24} color={'#000'} />
            <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 14}}>
              <Text
                size="medium"
                bold
                style={{
                  textAlign: 'left',
                  color: '#3B82EE',
                  borderBottomWidth: 1,
                  borderColor: '#3B82EE',
                }}>
                {phone}
              </Text>
            </View>
            <CopyIcon color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => callContact(`mailto:${email}`)}
            style={styles.item}>
            <Ionicons name={'ios-mail-outline'} size={24} color={'#000'} />
            <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 14}}>
              <Text
                size="medium"
                bold
                style={{
                  textAlign: 'left',
                  color: '#3B82EE',
                  borderBottomWidth: 1,
                  borderColor: '#3B82EE',
                }}>
                {email}
              </Text>
            </View>
            <CopyIcon color="black" size={24} />
          </TouchableOpacity>
        </Row>
      </CustomView>
    </FadeInView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  personContainer: {
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderColor: '#959AA8',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 18,
  },
});

export default TrustedContactDetail;
