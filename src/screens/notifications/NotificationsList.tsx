import React, {FC, useEffect, useRef, useState} from 'react';
import {
  CardNotifications,
  CustomView,
  FadeInView,
  Hr,
  Row,
  Title,
} from '../../components';
import {FONTS} from '../../constants/colors';
import {str} from '../../locales/Locale';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getUnreadNotifications} from '../../redux/notifications/NotificationsAction';
import {notificationsSelector} from '../../redux/notifications/NotificationsSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Animated, Platform, RefreshControl, ScrollView} from 'react-native';
import {ContainerFluid, ContainerNoF} from '../../navigation/options';

const NotificationsList: FC = (props: any) => {
  const {loading, data} = useAppSelector(notificationsSelector);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [loadingMore, setLoadingMore] = useState(false);
  const offset = useRef(new Animated.Value(0)).current;
  // console.log('datos', data);

  useEffect(() => {
    if (!loading) {
      setLoadingMore(false);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getUnreadNotifications());
    const getToken = async () => {
      const resultToken = await AsyncStorage.getItem('token');
      setToken(resultToken);
    };
    getToken();
  }, []);
  return (
    <ContainerNoF>
      <FadeInView style={{marginTop: 40}} align="flex-start">
        <Row
          style={{marginVertical: 12}}
          align="flex-start"
          justify="flex-start">
          <Title style={{...FONTS.h3}}>{str('notificationsList.title')}</Title>
        </Row>
        <ScrollView
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            paddingBottom: 75,
          }}
          refreshControl={
            <RefreshControl
              refreshing={loadingMore}
              onRefresh={() => {
                setLoadingMore(true);
                dispatch(getUnreadNotifications());
              }}
            />
          }
          showsVerticalScrollIndicator={false}>
          {data.map((item: any, index: number) => (
            <CardNotifications item={item} />
          ))}
        </ScrollView>
      </FadeInView>
    </ContainerNoF>
  );
};

export default NotificationsList;
